import random
import os
import random
import string
from json import JSONEncoder
import  json
from datetime import datetime

import numpy
import pandas as pd
from django.conf import settings
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.core.files.storage import FileSystemStorage
from django.http import FileResponse
from django.shortcuts import render, redirect
from ppa_model.datasheets.file_handler import save_file

from .models import Session, Assumptions, Upload_Doc
from .utilities import cashflow_estimation, data_checks, eligibility_test_and_grouping
# Create your views here.
from .utilities.monthly_results import MonthlyResults


# from .serializers import upload_doc_Serializer
# class DashboardView(TemplateView):
#     # add permission to check if user is authenticated
#     permission_classes = [permissions.IsAuthenticated]
#     template_name = 'ppa/dashboard.html'

class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, numpy.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)

@login_required(login_url='/login/')
def dashboard(request):
    return render(request, 'ppa/dashboard.html', {})

@login_required(login_url='/login/')
def add_assumptions(request):
    if request.method == "POST":
        datasheet = request.FILES['datasheet']
        discount_rate = request.POST['discount_rate']
        measurement_date = request.POST['measurement_date']
        risk_adjustment = request.POST['risk_adjustment']
        loss_ratio = request.POST['loss_ratio']

        session_name = ""
        if request.POST['session__name']:
            session_name = request.POST['session__name']
        else:
            letters = string.ascii_uppercase
            result_str = ''.join(random.choice(letters) for i in range(10))
            session_name = result_str

        datasheet_path = 'ppa_model/datasheets/files/' + datetime.now().strftime("%Y%m%d%I%M%S%p") + datasheet.name
        user_id = request.user.id
        save_file(datasheet, datasheet_path)

        session = Session(None, session_name, user_id, datasheet_path, discount_rate, measurement_date, risk_adjustment,
                          loss_ratio)
        session.save()
        request.session['session_selected'] = False

        return redirect('/paa/results')

    return render(request, 'ppa/add_assumptions.html', {})

# Sessions Menu
# All sessions
@login_required(login_url='/login/')
def user_sessions(request):

    current_user = request.user
    current_user_id = current_user.id
    documents = Session.objects.filter(session_user_id=current_user_id).order_by('-updated_at').all()
    context = serializers.serialize('json', documents)
    return render(request, 'ppa/sessions/sessions.html', {"context": context})

@login_required(login_url='/login/')
def download_datasheet(request):
    id = request.GET['i']
    session = Session.objects.get(id=id)

    session_datasheet = session.session_datasheet

    try:
        filepath = os.path.join(settings.BASE_DIR, session_datasheet)
        print("file path", filepath)
        return FileResponse(open(filepath, 'rb'), content_type='application/vnd. ms-excel')

    except FileNotFoundError:
        print("File not found")

    return redirect('/paa/sessions')


@login_required(login_url='/login/')
def calculation_results(request):
    return render(request, 'ppa/results.html', {})

@login_required(login_url='/login/')
def get_session(request):
    session_id = request.GET['i']
    request.session['selected_session'] = session_id
    request.session['session_selected'] = True

    return redirect('/paa/results')

@login_required(login_url='/login/')
def get_estimated_cashflow(request):
    session = None
    if request.session.get('session_selected', True):
        session_id = request.session['selected_session']
        session = Session.objects.get(id=session_id)
    else:
        session = Session.objects.latest('updated_at')

    print("session: ", session.session_name)
    xls = pd.ExcelFile(session.session_datasheet)
    source_data_df = pd.read_excel(xls, 'SourceData')
    combined_ratio_df = pd.read_excel(xls, 'CombinedRatios')
    class_of_business_df = pd.read_excel(xls, 'ClassOfBusiness')

    # Source Data Checks
    floats = ['Premium Installment', 'Total Premium']
    ints = ['Payment Frequency']

    required_source_data_columns = ['Class of Business', 'Name of Policyholder',
                                    'Surname', 'Policy Number', 'Start Date',
                                    'Ending Date', 'Expected Date of Premium Payment',
                                    'Date of Premium Payment', 'Premium Installment',
                                    'Payment Frequency', 'Total Premium']

    source_data_checks = data_checks.DataChecks(source_data_df, required_source_data_columns, 'SourceData', floats,
                                                ints)
    source_data_checks.data_check_report(request)

    # Combined Ratio Data Checks
    floats = ['Claims Ratio', 'Expense Ratio', 'Acquisistion costs (Commissions)']
    ints = []

    required_combined_ratio_columns = ['Class of Business', 'Claims Ratio', 'Expense Ratio',
                                       'Acquisition costs (Commissions)']

    combined_ratio_checks = data_checks.DataChecks(combined_ratio_df, required_combined_ratio_columns, 'SourceData',
                                                   floats,
                                                   ints)
    combined_ratio_checks.data_check_report(request)

    # Class of Business Data Checks
    floats = []
    ints = ['Portfolio ID']

    required_class_of_business_columns = ['Class of Business', 'Portfolio ID']

    class_of_business_checks = data_checks.DataChecks(class_of_business_df, required_class_of_business_columns,
                                                      'SourceData',
                                                      floats, ints)
    class_of_business_checks.data_check_report(request)

    cashflow_estimation_df = cashflow_estimation.CashFlowEstimation(source_data_checks.df,
                                                                    session.session_discount_rate,
                                                                    combined_ratio_checks.df,
                                                                    class_of_business_checks.df,
                                                                    session.session_risk_adjustment)

    cashflow_estimation_df.estimate_cashflows()
    cashflow_estimation_df.df['Start Date'] = cashflow_estimation_df.df['Start Date'].dt.strftime('%m/%d/%Y')
    cashflow_estimation_df.df['Ending Date'] = cashflow_estimation_df.df['Ending Date'].dt.strftime('%m/%d/%Y')
    cashflow_estimation_df.df['Expected Date of Premium Payment'] = cashflow_estimation_df.df['Expected Date of Premium Payment'].dt.strftime('%m/%d/%Y')
    cashflow_estimation_df.df['Date of Premium Payment'] = cashflow_estimation_df.df['Date of Premium Payment'].dt.strftime('%m/%d/%Y')
    import json
    d = cashflow_estimation_df.df.to_json(orient='records')
    j = json.dumps(d)
    print(j)
    return render(request, 'ppa/cashflow_estimations.html', {"context": j})

@login_required(login_url='/login/')
def get_groupings(request):
    session = None
    if request.session.get('session_selected'):
        session_id = request.session['selected_session']
        session = Session.objects.get(id=session_id)
    else:
        session = Session.objects.latest('updated_at')

    print("session: ", session.session_name)
    xls = pd.ExcelFile(session.session_datasheet)
    source_data_df = pd.read_excel(xls, 'SourceData')
    combined_ratio_df = pd.read_excel(xls, 'CombinedRatios')
    class_of_business_df = pd.read_excel(xls, 'ClassOfBusiness')

    # Source Data Checks
    floats = ['Premium Installment', 'Total Premium']
    ints = ['Payment Frequency']

    required_source_data_columns = ['Class of Business', 'Name of Policyholder',
                                    'Surname', 'Policy Number', 'Start Date',
                                    'Ending Date', 'Expected Date of Premium Payment',
                                    'Date of Premium Payment', 'Premium Installment',
                                    'Payment Frequency', 'Total Premium']

    source_data_checks = data_checks.DataChecks(source_data_df, required_source_data_columns, 'SourceData', floats,
                                                ints)
    source_data_checks.data_check_report(request)

    # Combined Ratio Data Checks
    floats = ['Claims Ratio', 'Expense Ratio', 'Acquisistion costs (Commissions)']
    ints = []

    required_combined_ratio_columns = ['Class of Business', 'Claims Ratio', 'Expense Ratio',
                                       'Acquisition costs (Commissions)']

    combined_ratio_checks = data_checks.DataChecks(combined_ratio_df, required_combined_ratio_columns, 'SourceData',
                                                   floats,
                                                   ints)
    combined_ratio_checks.data_check_report(request)

    # Class of Business Data Checks
    floats = []
    ints = ['Portfolio ID']

    required_class_of_business_columns = ['Class of Business', 'Portfolio ID']

    class_of_business_checks = data_checks.DataChecks(class_of_business_df, required_class_of_business_columns,
                                                      'SourceData',
                                                      floats, ints)
    class_of_business_checks.data_check_report(request)

    cashflow_estimation_df = cashflow_estimation.CashFlowEstimation(source_data_checks.df,
                                                                    session.session_discount_rate,
                                                                    combined_ratio_checks.df,
                                                                    class_of_business_checks.df,
                                                                    session.session_risk_adjustment)

    cashflow_estimation_df.estimate_cashflows()
    loss_ratio_threshold = float(session.session_loss_ratio)

    etag = eligibility_test_and_grouping.PAAEligibilityTestingAndGrouping(cashflow_estimation_df.data,
                                                                          loss_ratio_threshold)
    # etag - eligibility test and grouping object
    etag.test_and_group()

    etag.analyze_groups()

    # Cashflow Estimation
    # print(cashflow_estimation_df.data)

    # Grouped Data
    # print(etag.auto_paa) # Groupings

    # Summary of groupings
    # print(etag.groups_stats) # Summarized Groups

    # Contracts per group
    print(etag.groups)

    etag2 = etag.auto_paa
    etag2['Start Date'] = etag2['Start Date'].dt.strftime('%m/%d/%Y')
    etag2['Ending Date'] = etag2['Ending Date'].dt.strftime('%m/%d/%Y')
    etag2['Expected Date of Premium Payment'] = etag2['Expected Date of Premium Payment'].dt.strftime('%m/%d/%Y')
    etag2['Date of Premium Payment'] = etag2['Date of Premium Payment'].dt.strftime('%m/%d/%Y')

    import json
    de = etag2.to_json(orient='records')
    je = json.dumps(de)

    return render(request, 'ppa/grouping.html', {"context": je})

@login_required(login_url='/login/')
def get_group_summary(request):
    
    session = None
    if request.session.get('session_selected'):
        session_id = request.session['selected_session']
        session = Session.objects.get(id=session_id)
    else:
        session = Session.objects.latest('updated_at')

    print("session: ", session.session_name)
    xls = pd.ExcelFile(session.session_datasheet)
    source_data_df = pd.read_excel(xls, 'SourceData')
    combined_ratio_df = pd.read_excel(xls, 'CombinedRatios')
    class_of_business_df = pd.read_excel(xls, 'ClassOfBusiness')

    # Source Data Checks
    floats = ['Premium Installment', 'Total Premium']
    ints = ['Payment Frequency']

    required_source_data_columns = ['Class of Business', 'Name of Policyholder',
                                    'Surname', 'Policy Number', 'Start Date',
                                    'Ending Date', 'Expected Date of Premium Payment',
                                    'Date of Premium Payment', 'Premium Installment',
                                    'Payment Frequency', 'Total Premium']

    source_data_checks = data_checks.DataChecks(source_data_df, required_source_data_columns, 'SourceData', floats,
                                                ints)
    source_data_checks.data_check_report(request)

    # Combined Ratio Data Checks
    floats = ['Claims Ratio', 'Expense Ratio', 'Acquisistion costs (Commissions)']
    ints = []

    required_combined_ratio_columns = ['Class of Business', 'Claims Ratio', 'Expense Ratio',
                                       'Acquisition costs (Commissions)']

    combined_ratio_checks = data_checks.DataChecks(combined_ratio_df, required_combined_ratio_columns, 'SourceData',
                                                   floats,
                                                   ints)
    combined_ratio_checks.data_check_report(request)

    # Class of Business Data Checks
    floats = []
    ints = ['Portfolio ID']

    required_class_of_business_columns = ['Class of Business', 'Portfolio ID']

    class_of_business_checks = data_checks.DataChecks(class_of_business_df, required_class_of_business_columns,
                                                      'SourceData',
                                                      floats, ints)
    class_of_business_checks.data_check_report(request)

    cashflow_estimation_df = cashflow_estimation.CashFlowEstimation(source_data_checks.df,
                                                                    session.session_discount_rate,
                                                                    combined_ratio_checks.df,
                                                                    class_of_business_checks.df,
                                                                    session.session_risk_adjustment)

    cashflow_estimation_df.estimate_cashflows()
    loss_ratio_threshold = float(session.session_loss_ratio)

    etag = eligibility_test_and_grouping.PAAEligibilityTestingAndGrouping(cashflow_estimation_df.data,
                                                                          loss_ratio_threshold)
    # etag - eligibility test and grouping object
    etag.test_and_group()

    etag.analyze_groups()

    # Cashflow Estimation
    # print(cashflow_estimation_df.data)

    # Grouped Data
    # print(etag.auto_paa) # Groupings

    # Summary of groupings
    print(etag.groups_stats)  # Summarized Groups

    # Contracts per group
    # print(etag.groups)

    summary_of_groups_df = etag.groups_stats
    summary_of_groups_df['Start Date'] = summary_of_groups_df['Start Date'].dt.strftime('%m/%d/%Y')
    summary_of_groups_df['Ending Date'] = summary_of_groups_df['Ending Date'].dt.strftime('%m/%d/%Y')
    
    import json
    de = summary_of_groups_df.to_json(orient='records')
    print(de)
    je = json.dumps(de)

    return render(request, 'ppa/group_summary.html', {"context": je})


@login_required(login_url='/login/')
def aggregated_results(request):

    session = None
    print("session data: ", request.session.get('session_selected'))
    if request.session.get('session_selected'):
        session_id = request.session['selected_session']
        session = Session.objects.get(id=session_id)
    else:
        session = Session.objects.latest('updated_at')

    if request.method == "POST":
        selected_group = request.POST['selected_group']
    else:
        selected_group = 'all'

    print("session: ", session.session_name)
    xls = pd.ExcelFile(session.session_datasheet)
    source_data_df = pd.read_excel(xls, 'SourceData')
    combined_ratio_df = pd.read_excel(xls, 'CombinedRatios')
    class_of_business_df = pd.read_excel(xls, 'ClassOfBusiness')

    # Source Data Checks
    floats = ['Premium Installment', 'Total Premium']
    ints = ['Payment Frequency']

    required_source_data_columns = ['Class of Business', 'Name of Policyholder',
                                    'Surname', 'Policy Number', 'Start Date',
                                    'Ending Date', 'Expected Date of Premium Payment',
                                    'Date of Premium Payment', 'Premium Installment',
                                    'Payment Frequency', 'Total Premium']

    source_data_checks = data_checks.DataChecks(source_data_df, required_source_data_columns, 'SourceData', floats,
                                                ints)
    source_data_checks.data_check_report(request)

    # Combined Ratio Data Checks
    floats = ['Claims Ratio', 'Expense Ratio', 'Acquisistion costs (Commissions)']
    ints = []

    required_combined_ratio_columns = ['Class of Business', 'Claims Ratio', 'Expense Ratio',
                                       'Acquisition costs (Commissions)']

    combined_ratio_checks = data_checks.DataChecks(combined_ratio_df, required_combined_ratio_columns, 'SourceData',
                                                   floats,
                                                   ints)
    combined_ratio_checks.data_check_report(request)

    # Class of Business Data Checks
    floats = []
    ints = ['Portfolio ID']

    required_class_of_business_columns = ['Class of Business', 'Portfolio ID']

    class_of_business_checks = data_checks.DataChecks(class_of_business_df, required_class_of_business_columns,
                                                      'SourceData',
                                                      floats, ints)
    class_of_business_checks.data_check_report(request)

    cashflow_estimation_df = cashflow_estimation.CashFlowEstimation(source_data_checks.df,
                                                                    session.session_discount_rate,
                                                                    combined_ratio_checks.df,
                                                                    class_of_business_checks.df,
                                                                    session.session_risk_adjustment)

    cashflow_estimation_df.estimate_cashflows()
    loss_ratio_threshold = float(session.session_loss_ratio)
    etag = eligibility_test_and_grouping.PAAEligibilityTestingAndGrouping(cashflow_estimation_df.data,
                                                                          loss_ratio_threshold)
    # print(cashflow_estimation_df.data)
    etag.test_and_group()
    etag.analyze_groups()
    etag.groups.index.tolist()

    groups_df = etag.groups.to_frame()
    groups_index= groups_df.index

    measurement_date1 = session.session_measurement_date
    measurement_date = pd.Timestamp(measurement_date1)

    monthly_df = pd.DataFrame()
    if selected_group == "all":
        first_group = groups_index[0]
        monthly_df = MonthlyResults(etag.auto_paa, measurement_date).results(first_group)
        # for i in etag.groups.index.tolist():
        #     df = MonthlyResults(etag.auto_paa, measurement_date).results(i)
        #     monthly_df.add(df, axis='columns', level=None, fill_value=None)

    else:
        monthly_df = MonthlyResults(etag.auto_paa, measurement_date).results(selected_group)

    monthly_df.insert(loc=0, column='labels', value=monthly_df.index)

    monthly_columns = monthly_df.columns.values.tolist()
    import json
    d = monthly_df.to_json(orient='records')
    # e = monthly_columns.JSONEncoder(orient='records2')
    j = json.dumps(d)
    print(j)
    k = json.dumps(monthly_columns, cls=NumpyArrayEncoder)
    groups_json = json.dumps(groups_index.tolist(), cls=NumpyArrayEncoder)

    return render(
        request, 
        'ppa/aggregated_results.html', 
        {"context": j, 
        "columns": k, 
        "cols": monthly_columns,
        "groups": groups_index.tolist(), 
        "groups_json": groups_json
        })

@login_required(login_url='/login/')
def get_group_analysis(request):
    return render(request, 'ppa/analyse_groups.html')

@login_required(login_url='/login/')
def get_queries(request):
    return render(request, 'ppa/queries.html')

@login_required(login_url='/login/')
def get_eligibility_test(request):
    return render(request, 'ppa/eligibility_test.html')

@login_required(login_url='/login/')
def get_gmm_outputs(request):
    return render(request, 'ppa/gmm_output.html')

@login_required(login_url='/login/')
def get_measurement_calculations(request):
    return render(request, 'ppa/measurement_calculation.html')


@login_required(login_url='/login/')
def get_reinsurance(request):
    return render(request, 'ppa/reinsurance_contracts_held.html')


@login_required(login_url='/login/')
def get_estimated_financial_statements(request):
    return render(request, 'ppa/financial_statement.html')


@login_required(login_url='/login/')
def get_global_presentation(request):
    return render(request, 'ppa/global_presentation.html')


@login_required(login_url='/login/')
def get_disclosures(request):
    return render(request, 'ppa/disclosures.html')


@login_required(login_url='/login/')
def get_checks(request):
    return render(request, 'ppa/checks.html')


@login_required(login_url='/login/')
def get_analysis_movement(request):
    return render(request, 'ppa/analysis_of_movement.html')


def logout_view(request):
    logout(request)
    return render(request, 'registration/login.html')
    # Redirect to a success page.


def import_excel(request):
    print('s')
    # serializer = serializer.upload_doc_Serializer()
    try:
        if request.method == 'POST' and request.FILES['myfile']:

            myfile = request.FILES['myfile']
            fs = FileSystemStorage()
            filename = fs.save(myfile.name, myfile)
            uploaded_file_url = fs.url(filename)
            excel_file = uploaded_file_url
            print(excel_file)
            client_exceldata = pd.read_excel("." + excel_file, encoding='utf-8')
            print(type(client_exceldata))
            dbframe = client_exceldata
            for dbframe in dbframe.itertuples():
                obj = Upload_Doc.objects.create(name_of_upload=uploaded_file_url,
                                                class_of_business=dbframe.Class_of_business,
                                                name_of_policyholder=dbframe.Name_of_policyholder,
                                                surname=dbframe.Surname,
                                                policy_number=dbframe.Policy_number, start_date=dbframe.Start_date,
                                                ending_date=dbframe.Ending_date,
                                                expected_date_of_premium_payment=dbframe.Expected_date_of_premium_payment,
                                                date_of_premium_payment=dbframe.Date_of_premium_payment,
                                                premium_installment=dbframe.Premium_installment,
                                                payment_frequency=dbframe.Payment_frequency,
                                                total_premium=dbframe.Total_premium
                                                )
                print(type(obj))
                obj.save()

            return render(request, 'ppa/results.html', {
                'uploaded_file_url': uploaded_file_url
            })
    except Exception as identifier:
        print(identifier)

    return render(request, 'ppa/results.html', {})

@login_required(login_url='/login/')
def add_assumptions_copy(request):
    if request.method == "POST":

        class_fields = request.POST['classFields']
        datasheet = request.FILES['datasheet']

        session_name = ""
        if request.POST['session__name']:
            session_name = request.POST['session__name']
        else:
            letters = string.ascii_uppercase
            result_str = ''.join(random.choice(letters) for i in range(10))
            session_name = result_str

        datasheet_path = 'ppa_model/datasheets/files/' + datetime.now().strftime("%Y%m%d%I%M%S%p") + datasheet.name
        user_id = request.user.id
        save_file(datasheet, datasheet_path)

        session = Session(None, session_name, user_id, datasheet_path)
        session.save()
        session_id = session.id

        class_fields_list = class_fields.split(",")
        for field in class_fields_list:
            class_name = str(field).lower()
            discount_ratio = request.POST[class_name + '_discount_rate']
            expense_ratio = request.POST[class_name + '_expense_ratio']
            loss_ratio = request.POST[class_name + '_loss_ratio']
            risk_adjustment = request.POST[class_name + '_risk_adjustment']
            acquisition_costs = request.POST[class_name + '_acquisition_costs']

            assumption = Assumptions(
                None,
                session_id,
                class_name,  # class name
                discount_ratio,
                expense_ratio,
                loss_ratio,
                risk_adjustment,
                acquisition_costs,
                datetime.now().strftime("%Y%m%d%I%M%S%p")
            )

            assumption.save()

        return render(request, 'ppa/results.html', {})

    return render(request, 'ppa/add_assumptions.html', {})

from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.db.migrations import serializer
from django.shortcuts import render
from .models import Upload_Doc
import datetime as dt
import pandas as pd
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
# from .serializers import upload_doc_Serializer


# class DashboardView(TemplateView):
#     # add permission to check if user is authenticated
#     permission_classes = [permissions.IsAuthenticated]
#     template_name = 'ppa/dashboard.html'

# Create your views here.
def dashboard(request):
    return render(request, 'ppa/dashboard.html', {})


@login_required(login_url='/login/')
def add_assumptions(request):

    if request.method == "POST":
        print(request.POST)
        return render(request, 'ppa/results.html', {})

    return render(request, 'ppa/add_assumptions.html', {})


@login_required(login_url='/login/')
def aggregated_results(request):
    return render(request, 'ppa/aggregated_results.html', {})


@login_required(login_url='/login/')
def calculation_results(request):
    return render(request, 'ppa/results.html', {})


@login_required(login_url='/login/')
def get_estimated_cashflow(request):
    return render(request, 'ppa/cashflow_estimations.html')


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
def get_groupings(request):
    return render(request, 'ppa/grouping.html')


@login_required(login_url='/login/')
def get_group_analysis(request):
    return render(request, 'ppa/analyse_groups.html')


@login_required(login_url='/login/')
def get_group_summary(request):
    return render(request, 'ppa/group_summary.html')


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
                obj = Upload_Doc.objects.create(name_of_upload=uploaded_file_url, class_of_business=dbframe.Class_of_business,
                                                name_of_policyholder=dbframe.Name_of_policyholder, surname=dbframe.Surname,
                                                policy_number=dbframe.Policy_number, start_date=dbframe.Start_date, ending_date=dbframe.Ending_date,
                                                expected_date_of_premium_payment=dbframe.Expected_date_of_premium_payment,
                                                date_of_premium_payment=dbframe.Date_of_premium_payment, premium_installment=dbframe.Premium_installment,
                                                payment_frequency=dbframe.Payment_frequency, total_premium=dbframe.Total_premium
                                                )
                print(type(obj))
                obj.save()

            return render(request, 'ppa/results.html', {
                'uploaded_file_url': uploaded_file_url
            })
    except Exception as identifier:
        print(identifier)

    return render(request, 'ppa/results.html', {})

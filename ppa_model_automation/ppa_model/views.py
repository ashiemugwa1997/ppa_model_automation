from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render


# class DashboardView(TemplateView):
#     # add permission to check if user is authenticated
#     permission_classes = [permissions.IsAuthenticated]
#     template_name = 'ppa/dashboard.html'

# Create your views here.
def dashboard(request):
    return render(request, 'ppa/dashboard.html', {})


@login_required(login_url='/login/')
def add_assumptions(request):
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

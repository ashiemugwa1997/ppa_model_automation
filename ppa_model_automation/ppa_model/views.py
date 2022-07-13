from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def dashboard(request):
    return render(request, 'ppa/dashboard.html', {})

def add_assumptions(request):
    return render(request, 'ppa/add_assumptions.html', {})

def calculation_results(request):
    return render(request, 'ppa/results.html', {})

def get_estimated_cashflow(request):
    return render(request, 'ppa/cashflow_estimations.html')

def get_queries(request):
    return render(request, 'ppa/queries.html')

def get_eligibility_test(request):
    return render(request, 'ppa/eligibility_test.html')

def get_gmm_outputs(request):
    return render(request, 'ppa/gmm_output.html')

def get_groupings(request):
    return render(request, 'ppa/grouping.html')

def get_group_analysis(request):
    return render(request, 'ppa/analyse_groups.html')

def get_group_summary(request):
    return render(request, 'ppa/group_summary.html')

def get_measurement_calculations(request):
    return render(request, 'ppa/measurement_calculation.html')

def get_reinsurance(request):
    return render(request, 'ppa/reinsurance_contracts_held.html')

def get_estimated_financial_statements(request):
    return render(request, 'ppa/financial_statement.html')



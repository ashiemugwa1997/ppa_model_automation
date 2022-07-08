from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def dashboard(request):
    # files_template = loader.get_template('ppa/dashboard.html')
    # return HttpResponse(files_template.render({}, request))
    return render(request, 'ppa/dashboard.html', {})

def get_dataset(request):
    render(request, 'ppa_model_app/upload_dataset.html')

def get_results(request):
    render(request, 'ppa_model_app/ppa_results.html')

def get_assumptions(request):
    render(request, 'ppa_model_app/ppa_assumptions.html')

def get_estimated_cashflow(request):
    render(request, 'ppa_model_app/ppa_estimated_cashflow.html')

def get_eligibility_test(request):
    render(request, 'ppa_model_app/ppa_elibility_test.html')

def get_ggm_contracts(request):
    render(request, 'ppa_model_app/ppa_ggm_contracts.html')

def get_groupings(request):
    render(request, 'ppa_model_app/ppa_groupings.html')

def get_groupings_analysis(request):
    render(request, 'ppa_model_app/ppa_groupings_analysis.html')

def get_group_summary(request):
    render(request, 'ppa_model_app/ppa_group_summary.html')

def get_estimated_financial_statements(request):
    render(request, 'ppa_model_app/ppa_financial_statements')



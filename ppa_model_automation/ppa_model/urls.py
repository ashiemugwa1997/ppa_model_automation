from django.urls import path

from . import views

urlpatterns = [
    path('dashboard', views.dashboard, name='dashboard'),
    path('add_assumptions', views.add_assumptions, name='add_assumptions'),
    path('results', views.calculation_results, name='results'),
    path('cashflow', views.get_estimated_cashflow, name='cashflow'),
    path('queries', views.get_queries, name="queries"),
    path('eligibility', views.get_eligibility_test, name="eligibility"),
    path('gmm', views.get_gmm_outputs, name="gmm"),
    path('groupings', views.get_groupings, name="groupings"),
    path('analysed-groups', views.get_group_analysis, name="analysed-groups"),
    path('summarized-groups', views.get_group_summary, name="summarized-groups"),
    path('measurement-calculations', views.get_measurement_calculations, name="measurements"),
    path('reinsurance', views.get_reinsurance, name="reinsurance"),
    path('financial-statements', views.get_estimated_financial_statements, name="financial-statements"),
    
]
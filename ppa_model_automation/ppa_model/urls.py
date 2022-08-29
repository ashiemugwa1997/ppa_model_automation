from django.urls import path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('paa', views.dashboard, name='dashboard'),
    path('paa/dashboard', views.dashboard, name='dashboard'),
    path('paa/add_assumptions', views.add_assumptions, name='add_assumptions'),
    path('paa/sessions', views.user_sessions, name='user_sessions'),
    path('paa/sessions/session', views.get_session, name="get_session"),
    path('paa/sessions/datasheet', views.download_datasheet, name='download_datasheet'),
    path('paa/aggregated-results', views.aggregated_results, name='aggregated_results'),
    path('paa/results', views.calculation_results, name='results'),
    path('paa/cashflow', views.get_estimated_cashflow, name='cashflow'),
    path('paa/cashflow/export', views.export_estimated_cashflow, name='export_cashflow'),
    path('paa/groupings', views.get_groupings, name="groupings"),
    path('paa/groupings/export', views.export_groupings, name="export_groupings"),
    path('paa/summarized-groups', views.get_group_summary, name="summarized-groups"),
    path('paa/summarized-groups/export', views.export_group_summary, name="export-summarized-groups"),
    path('paa/queries', views.get_queries, name="queries"),
    path('paa/eligibility', views.get_eligibility_test, name="eligibility"),
    path('paa/gmm', views.get_gmm_outputs, name="gmm"),
    path('paa/analysed-groups', views.get_group_analysis, name="analysed-groups"),
    path('paa/summarized-groups', views.get_group_summary, name="summarized-groups"),
    path('paa/measurement-calculations', views.get_measurement_calculations, name="measurements"),
    path('paa/reinsurance', views.get_reinsurance, name="reinsurance"),
    path('paa/financial-statements', views.get_estimated_financial_statements, name="financial-statements"),
    path('paa/global-presentations', views.get_global_presentation, name="global-presentation"),
    path('paa/disclosures', views.get_disclosures, name="disclosures"),
    path('paa/checks', views.get_checks, name="checks"),
    path('paa/analysis-movement', views.get_analysis_movement, name="analysis-movement"),
    path('paa/Import_excel', views.import_excel, name="Import_excel"),

]

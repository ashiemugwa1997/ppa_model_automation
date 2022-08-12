from typing import Type, List, Union, Any

from django import forms

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div, Submit, Row, Column, Field

from .models import Upload_Doc, assumptions


class upload_policy_docs(forms.ModelForm):
    class Meta:
        model = Upload_Doc
        fields = ['name_of_upload', 'class_of_business', 'name_of_policyholder',
                  'surname', 'policy_number', 'start_date', 'ending_date', 'expected_date_of_premium_payment',
                  'date_of_premium_payment', 'premium_installment', 'payment_frequency', 'total_premium'
                  ]

        # def __init__(self, model: Type[Upload_Doc], fields: List[Union[str, Any]]):
        #     self.model: Type[Upload_Doc] = model
        #     self.fields: List[Union[str, Any]] = fields

class add_assumptions(forms.ModelForm):
    class Meta:
        model = assumptions
        fields = ['name_of_assumption', 'updated', 'user', 'class_of_business', 'discount_rate', 'expense_ratio',
                  'loss_ratio', 'risk_adjustment', 'acquisition_costs'
                  ]

        # def __init__(self, model: Type[Upload_Doc], fields: List[Union[str, Any]]):
        #     self.model: Type[Upload_Doc] = model
        #     self.fields: List[Union[str, Any]] = fields

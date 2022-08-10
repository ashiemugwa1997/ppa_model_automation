from typing import Type, List, Union, Any

from django import forms

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div, Submit, Row, Column, Field

from .models import Upload_Doc


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

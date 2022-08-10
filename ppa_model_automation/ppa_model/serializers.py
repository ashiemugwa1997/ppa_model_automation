from django.core import serializers
from .models import Upload_Doc

#
# class upload_doc_Serializer(serializers):
#     class Meta:
#         model = Upload_Doc
#         fields = [
#             'name_of_upload','class_of_business', 'name_of_policyholder',
#             'surname', 'policy_number', 'start_date', 'ending_date', 'expected_date_of_premium_payment',
#             'date_of_premium_payment', 'premium_installment', 'payment_frequency', 'total_premium'
#         ]

from django.db import models
from .utilities import data_checks, cashflow_estimation

class Session(models.Model):
    session_name = models.CharField(max_length=200)
    session_user_id = models.CharField(max_length=200)
    session_datasheet = models.CharField(max_length=400)
    session_discount_rate = models.CharField(max_length=100)
    session_measurement_date = models.CharField(max_length=100)
    session_risk_adjustment = models.CharField(max_length=100)
    session_loss_ratio = models.CharField(max_length=100)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    class Meta:
        get_latest_by = 'updated_at'


class Upload_Doc(models.Model):
    file = models.FileField(upload_to='ppa_model/uploads/')
    name_of_upload = models.CharField(max_length=300)
    class_of_business = models.CharField(max_length=300)
    name_of_policyholder = models.CharField(max_length=300)
    surname = models.CharField(max_length=300)
    policy_number = models.CharField(max_length=300)
    start_date = models.DateField()
    ending_date = models.DateField()
    expected_date_of_premium_payment = models.DateField()
    date_of_premium_payment = models.DateField()
    premium_installment = models.FloatField()
    payment_frequency = models.IntegerField()
    total_premium = models.FloatField()
    updated = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.name_of_upload

    objects = models.Manager()


class Assumptions(models.Model):
    session_id = models.CharField(max_length=300)
    class_of_business = models.CharField(max_length=100)
    discount_rate = models.CharField(max_length=100)
    expense_ratio = models.CharField(max_length=100)
    loss_ratio = models.CharField(max_length=100)
    risk_adjustment = models.CharField(max_length=100)
    acquisition_costs = models.CharField(max_length=100)
    updated = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.session_id

    # objects = models.Manager()

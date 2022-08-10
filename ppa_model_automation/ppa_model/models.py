from django.db import models


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


class assumptions(models.Model):
    name_of_assumption = models.CharField(max_length=300)
    updated = models.DateTimeField(auto_now=True, blank=True)
    user = models.CharField(max_length=100)
    class_of_business = models.CharField(max_length=100)
    discount_rate = models.FloatField()
    expense_ratio = models.FloatField()
    loss_ratio = models.FloatField()
    risk_adjustment = models.FloatField()
    acquisition_costs = models.FloatField()
    id = models.AutoField(primary_key=True)
    objects = models.Manager()

    def __str__(self):
        return self.name_of_assumption

    objects = models.Manager()

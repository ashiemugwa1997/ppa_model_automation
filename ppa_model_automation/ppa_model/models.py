from django.db import models


class Upload_Doc(models.Model):
    name_of_file = models.CharField(max_length=400)
    name_of_assumption_and_datasheet = models.CharField(max_length=300)
    updated = models.DateTimeField(auto_now=True, blank=True)
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name_of_upload

    objects = models.Manager()


class assumptions(models.Model):
    name_of_assumption_and_datasheet = models.CharField(max_length=300)
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

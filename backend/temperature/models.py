from django.db import models

# Create your models here.


class Temp(models.Model):

    time = models.TimeField(auto_now_add=True)
    value = models.FloatField(verbose_name='温度')

    class Meta:
        db_table = 'temp'


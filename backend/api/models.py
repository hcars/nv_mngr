from django.db import models
from django.contrib.auth.models import User


class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    quantity = models.IntegerField()
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE)


    def __str__(self) -> str:
        return  self.name 

from django.db import models
import uuid

class CustomUser(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=1000)
    verification_code = models.CharField(max_length=100,default='')
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username
    
    def db_table(self):
        return 'CustomUser'
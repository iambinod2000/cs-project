# Generated by Django 4.1 on 2023-04-04 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_customuser_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='verification_code',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='customuser',
            name='verified',
            field=models.BooleanField(default=False),
        ),
    ]
# Generated by Django 5.1.4 on 2024-12-05 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='maker',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='maker',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]

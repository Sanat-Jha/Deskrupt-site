# Generated by Django 5.1.4 on 2024-12-10 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_deck_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='deck',
            name='shortcuts',
            field=models.JSONField(blank=True, default=list),
        ),
    ]

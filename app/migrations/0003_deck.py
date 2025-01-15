# Generated by Django 5.1.4 on 2024-12-06 13:40

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_maker_is_active_maker_is_staff'),
    ]

    operations = [
        migrations.CreateModel(
            name='Deck',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('background_image', models.ImageField(default='deck_backgrounds/default_background.png', upload_to='deck_backgrounds/')),
                ('background_animation', models.CharField(default='none', max_length=255)),
                ('widgets', models.JSONField(default=list)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('maker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

# Generated by Django 4.0.6 on 2022-08-12 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ppa_model', '0003_assumptions_alter_upload_doc_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_name', models.CharField(max_length=200)),
                ('session_user_id', models.CharField(max_length=200)),
                ('session_datasheet', models.CharField(max_length=400)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.RenameField(
            model_name='assumptions',
            old_name='name_of_assumption',
            new_name='session_id',
        ),
        migrations.RemoveField(
            model_name='assumptions',
            name='user',
        ),
        migrations.AlterField(
            model_name='assumptions',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]

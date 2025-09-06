from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ("issues", "0002_issue_category"),
    ]

    operations = [
        migrations.AddField(
            model_name="issue",
            name="latitude",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="issue",
            name="longitude",
            field=models.FloatField(blank=True, null=True),
        ),
    ]

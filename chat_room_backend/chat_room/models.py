from django.db import models

# Create your models here.
class Message(models.Model):

    message_id = models.AutoField(primary_key=True)
    client_id = models.IntegerField()
    client_name = models.CharField(max_length = 100)
    content = models.TextField()
    date_created = models.DateTimeField()



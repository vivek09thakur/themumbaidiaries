from django.db import models
from django.contrib.auth.models import User

class SessionToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def __str__(self):
        return f"{self.user.username}'s session token"


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts/')
    caption = models.TextField()
    content = models.TextField(null=True, blank=True)  # Modified to allow null values
    postId = models.CharField(max_length=48, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    @property
    def get_content(self):
        return self.content if self.content else self.caption

from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils import timezone 

# Customizing Django's Inbuilt Auth User Model:
class UserManager(BaseUserManager):
    
    def create_user(self, email, username, password, **extra_fields):
        if not email:
            raise ValueError(('email can\'t be empty'))
        if not username:
            raise ValueError(('username can\'t be empty'))
        if not password:
            raise ValueError(('password can\'t be empty'))
        email = self.normalize_email(email)
        user = self.model(email=email,username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('is_staff must be True for SuperUser')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('is_superuser must be True for SuperUser')
        return self.create_user(email,username, password, **extra_fields)

class User(AbstractUser):
    username = models.CharField(max_length=200,unique=True)
    name = models.CharField(max_length=200,blank=True, null=True)
    email = models.CharField(max_length=200, unique=True)
    bio = models.TextField(blank=True ,default="")
    avatar = models.ImageField(default='avatar.jpg', upload_to='avatars')

    objects = UserManager()

    USERNAME_FIELD = email
    REQUIRED_FIELDS = ['username']

    class Meta:
        ordering = ['-date_joined']
        verbose_name_plural="Custom Users"

    def __str__(self):
        return f'{self.username}'


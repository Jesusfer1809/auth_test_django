from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

# class UserAccountManager(BaseUserManager):
    
#     def create_user(self, email, name, password=None):
#         if not email:
#             raise ValueError('You must provide an email address')
        
#         email = self.normalize_email(email)

#         user = self.model(email=email, name=name)
#         user.set_password(password)
#         user.save(using=self._db)

#         return user

    
#     # def create_superuser(self, email=None, password=None, **extra_fields):
#     #     extra_fields.setdefault('is_staff', True)
#     #     extra_fields.setdefault('is_superuser', True)
#     #     return self._create_user(email, password, **extra_fields)
    

# class UserAccount(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(max_length=255, blank=True, default='', unique=True)
#     name = models.CharField(max_length=255, blank=True, default='')

#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     objects = UserAccountManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name']

#     def get_full_name(self):
#         return self.name

#     def get_short_name(self):
#         return self.name
    
#     def __str__(self):
#         return self.email



class Note(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE, null=True)
    body = models.TextField()
from django.contrib.auth.models import AbstractUser
from django.db import models

# class User(AbstractUser):
#     """
#     Custom user model extending Django's AbstractUser.
    
#     We extend AbstractUser rather than AbstractBaseUser because it provides
#     many useful fields and features out of the box, while still allowing
#     customization.
#     """
#     # AbstractUser already includes username, email, first_name, last_name
    
#     # Additional fields for our user model
#     bio = models.TextField(
#         max_length=500, 
#         blank=True,
#         help_text="A brief description about the user"
#     )
    
#     birth_date = models.DateField(
#         null=True, 
#         blank=True,
#         help_text="User's birth date"
#     )
    
#     profile_picture = models.ImageField(
#         upload_to='profile_pictures/',
#         null=True,
#         blank=True,
#         help_text="User's profile picture"
#     )
    
#     # Add timestamps for when the user was created and last modified
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         """String representation of the user"""
#         return f"{self.username} ({self.email})"

#     class Meta:
#         ordering = ['-created_at']  # Order users by newest first
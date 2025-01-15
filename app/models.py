from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from PIL import Image, UnidentifiedImageError
import io
from django.core.exceptions import ValidationError


# Custom Manager
class MakerManager(BaseUserManager):
    def create_user(self, username, password=None, desks=[]):
        if not username:
            raise ValueError("The Username must be set")
        maker = self.model(username=username, desks=desks or [])
        maker.set_password(password)
        maker.save(using=self._db)
        return maker

    def create_superuser(self, username, password=None):
        maker = self.create_user(username, password)
        maker.is_staff = True
        maker.is_superuser = True
        maker.save(using=self._db)
        return maker


# Custom User Model named Maker
class Maker(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    decks = models.JSONField(default=list)  # List of strings stored as JSON

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = MakerManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username


class Deck(models.Model):
    title = models.CharField(max_length=255)
    background_image = models.ImageField(upload_to='deck_backgrounds/', default='deck_backgrounds/default_background.png')
    maker = models.ForeignKey(Maker, on_delete=models.CASCADE)
    background_animation = models.CharField(max_length=255, default='none')
    widgets = models.JSONField(default=list, blank=True)
    shortcuts = models.JSONField(default=dict, blank=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Ensure the image file is valid
        if self.background_image:
            try:
                # Check if the image file is empty
                if self.background_image.size == 0:
                    raise ValidationError("The uploaded image is empty.")

                # Open the image using Pillow
                img = Image.open(self.background_image)

                # Check if the image format is PNG, if not convert it to PNG
                if img.format != 'PNG':
                    img = img.convert("RGBA")  # Convert to RGBA (handles other formats like JPG)
                    img_io = io.BytesIO()
                    img.save(img_io, format='PNG')
                    img_io.seek(0)

                    # Update the image field with the new PNG image
                    self.background_image.save(self.background_image.name, img_io, save=False)

            except UnidentifiedImageError:
                raise ValidationError("Uploaded file is not a valid image.")
            except Exception as e:
                raise ValidationError(f"Error processing image: {str(e)}")

        # Call the parent class save method
        super(Deck, self).save(*args, **kwargs)

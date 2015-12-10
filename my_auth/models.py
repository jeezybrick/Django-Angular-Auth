# -*- coding: utf-8 -*-
import os
from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.core.files.storage import FileSystemStorage
from core.models import TimeStampedModel


# Class for override exists images
class OverwriteStorage(FileSystemStorage):

    def get_available_name(self, name):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name


# Extend User model
class MyUser(AbstractUser, TimeStampedModel):

    avatar = models.ImageField(_('avatar'), upload_to='avatars/', blank=True, storage=OverwriteStorage())

    USERNAME_FIELD = 'username'

    def __unicode__(self):
        return self.username

    class Meta(object):
        unique_together = ('email', )

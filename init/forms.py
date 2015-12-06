# -*- coding: utf-8 -*-

from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django import forms
from django.utils.translation import ugettext_lazy as _
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Layout, Field


class MyLoginForm(AuthenticationForm):

    username = forms.CharField(label=_('username'))
    password = forms.CharField(label=_('password'), widget=forms.PasswordInput)

    def __init__(self, *args, **kwargs):
        super(MyLoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.form_action = '#'
        self.helper.form_class = 'form-horizontal'
        self.helper.label_class = 'col-md-2'
        self.helper.field_class = 'col-md-7'

        self.helper.add_input(Submit('submit', 'Login',
                                     css_class='btn btn-default btn-md col-md-offset-5'))

        self.helper.layout = Layout(
            Field(
                'username', placeholder='Input your login'
            ),
            Field(
                'password', placeholder='Input your password'
            )
        )


from django.conf.urls import url
from api import views


urlpatterns = [
    url(r'^api/test/$', views.ExampleView.as_view(), name='test_api'),
]

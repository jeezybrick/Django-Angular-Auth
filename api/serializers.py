from rest_framework import serializers
from my_auth.models import MyUser


class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'created_at', 'avatar', )
        read_only_fields = ('created_at', )

from rest_framework import serializers
from .models import TodoList, TodoItem


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        # fields = ('id', 'created', 'text', 'done', 'ordering')

class TodoListSerializer(serializers.ModelSerializer):
    items = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = TodoList
        # fields = ('id', 'created', 'title', 'ordering')

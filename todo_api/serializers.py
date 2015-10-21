from rest_framework import serializers
from .models import TodoList, TodoItem


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        # fields = ('id', 'created', 'text', 'done', 'order', 'todo_list')


class TodoListSerializer(serializers.ModelSerializer):
    items = TodoItemSerializer(many=True, read_only=True)
    class Meta:
        model = TodoList
        # fields = ('id', 'created', 'title', 'order')

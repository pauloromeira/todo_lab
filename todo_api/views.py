from rest_framework import viewsets
from rest_framework.response import Response
from .models import TodoItem, TodoList
from .serializers import TodoItemSerializer, TodoListSerializer
from django.shortcuts import get_object_or_404


class TodoItemViewSet(viewsets.ViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

    def list(self, request, todo_list_pk=None):
        queryset = TodoItem.objects.filter(todo_list=todo_list_pk)
        serializer = TodoItemSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, todo_list_pk=None):
        queryset = TodoItem.objects.filter(pk=pk, todo_list=todo_list_pk)
        item = get_object_or_404(queryset, pk=pk)
        serializer = TodoItemSerializer(item)
        return Response(serializer.data)


class TodoListViewSet(viewsets.ModelViewSet):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer

from django.db import models


class TodoList(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255, default='')
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class TodoItem(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField(default='')
    done = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    todo_list = models.ForeignKey(TodoList, related_name='items')

    def __str__(self):
        return self.text

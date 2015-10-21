from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'todo_items', views.TodoItemViewSet)
router.register(r'todo_lists', views.TodoListViewSet)

urlpatterns = router.urls

from django.conf.urls import include, url
from rest_framework_nested import routers
from . import views

router = routers.SimpleRouter()
router.register(r'todo_lists', views.TodoListViewSet)
lists_router = routers.NestedSimpleRouter(router, r'todo_lists', lookup='todo_list')
lists_router.register(r'items', views.TodoItemViewSet)

urlpatterns = [
        url(r'^', include(router.urls)),
        url(r'^', include(lists_router.urls)),
]

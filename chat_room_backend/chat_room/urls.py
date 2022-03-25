
from django.urls import path,include
from .views import UserViewSet,MessageViewSet,login, get_messages
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('users',UserViewSet,basename='users')
router.register('message',MessageViewSet,basename='message')

urlpatterns = [
    path('api/',include(router.urls)),
    path('messages/', get_messages),
    path('login/',login)

]

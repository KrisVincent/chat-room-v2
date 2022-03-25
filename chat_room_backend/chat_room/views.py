from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from django.contrib.auth.models import User
from rest_framework.response import Response

from .models import Message
from .serializer import UserSerializer, MessageSerializer


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class MessageViewSet(viewsets.ModelViewSet):

    queryset = Message.objects.all()
    serializer_class = MessageSerializer

@api_view(['POST'])
def get_messages(request):

    if request.method == "POST":

        try :

            id = request.data["id"]



            messages = Message.objects.filter(client_id = id)

            serializer = MessageSerializer(messages, many=True)


            return Response(serializer.data,status=status.HTTP_200_OK)



        except Exception:
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def login(request):


    if request.method =="POST":

        try :

            username = request.data["username"]
            password = request.data["password"]


            user = User.objects.get(username = username)


            if username == user.username and user.password == password:
                return Response(user.id,status=status.HTTP_200_OK)



        except Exception:
            return Response(status=status.HTTP_404_NOT_FOUND)

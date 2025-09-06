
from rest_framework import status, permissions, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes

User = get_user_model()

class SignupView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		username = request.data.get('username')
		password = request.data.get('password')
		email = request.data.get('email')
		role = request.data.get('role', 'citizen')
		if not username or not password:
			return Response({'error': 'Username and password required.'}, status=400)
		if User.objects.filter(username=username).exists():
			return Response({'error': 'Username already exists.'}, status=400)
		user = User.objects.create_user(username=username, password=password, email=email, role=role)
		refresh = RefreshToken.for_user(user)
		return Response({
			'user': {
				'id': user.id,
				'username': user.username,
				'email': user.email,
				'role': user.role,
			},
			'refresh': str(refresh),
			'access': str(refresh.access_token),
		}, status=201)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
	@classmethod
	def get_token(cls, user):
		token = super().get_token(user)
		token['role'] = user.role
		return token

	def validate(self, attrs):
		# Require role in login
		username = attrs.get('username')
		password = attrs.get('password')
		role = self.context['request'].data.get('role')
		if not username or not password or not role:
			raise serializers.ValidationError('Username, password, and role are required.')
		user = authenticate(username=username, password=password)
		if user is None or str(user.role) != str(role):
			raise serializers.ValidationError('Invalid credentials or role.')
		data = super().validate(attrs)
		# Ensure access and refresh tokens are always present
		data = {
			'refresh': str(self.validated_data.get('refresh', '')),
			'access': str(self.validated_data.get('access', '')),
			'user': {
				'id': self.user.id,
				'username': self.user.username,
				'email': self.user.email,
				'role': self.user.role,
			}
		}
		return data

class LoginView(TokenObtainPairView):
	serializer_class = CustomTokenObtainPairSerializer

class LogoutView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
		try:
			refresh_token = request.data["refresh"]
			token = RefreshToken(refresh_token)
			token.blacklist()
			return Response(status=status.HTTP_205_RESET_CONTENT)
		except Exception as e:
			return Response(status=status.HTTP_400_BAD_REQUEST)

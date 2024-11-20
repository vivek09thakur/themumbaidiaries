import string
import random
import json
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Post, SessionToken
from datetime import datetime, timedelta
def index(request):
    return JsonResponse({"response": "Server running fine!"})

@csrf_exempt
def login(request):
    if request.method == 'POST':
        sessionToken = ''.join(random.choices(string.ascii_letters + string.digits, k=48))
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                # Set expiration to 24 hours from now
                expires_at = datetime.now() + timedelta(days=15)
                SessionToken.objects.create(
                    user=user, 
                    token=sessionToken,
                    expires_at=expires_at
                )
                return JsonResponse({
                    'status': 'success',
                    'message': 'Login successful',
                    'sessionToken': sessionToken
                })
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid credentials'
            })
        except User.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'User does not exist'
            })
    return JsonResponse({
        'status': 'error',
        'message': 'Method not allowed'
    })

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            
            if User.objects.filter(username=username).exists():
                return JsonResponse({'status': 'error', 'message': 'Username already exists'})
            
            if User.objects.filter(email=email).exists():
                return JsonResponse({'status': 'error', 'message': 'Email already exists'})
            
            user = User.objects.create_user(username=username, email=email, password=password)
            return JsonResponse({'status': 'success', 'message': 'User created successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def get_user_profile(request, username, sessionToken):
    try:
        if request.method == 'GET':
            if not sessionToken:
                return JsonResponse({'status': 'error', 'message': 'Session token is required'})
            if not username:
                return JsonResponse({'status': 'error', 'message': 'Username is required'})
            
            session = SessionToken.objects.get(token=sessionToken)
            user = User.objects.get(username=username)

            return JsonResponse({
                'status': 'success',
                'data': {
                    'username': user.username,
                    'email': user.email,
                    'date_joined': user.date_joined,
                    'last_login': user.last_login
                }
            })
            
    except (SessionToken.DoesNotExist, User.DoesNotExist):
        return JsonResponse({
            'status': 'error',
            'message': 'Invalid session or user not found'
        })

@csrf_exempt
def create_post(request, username, sessionToken):
    if request.method == 'POST':
        try:
            caption = request.POST.get('caption')
            image = request.FILES.get('image')
            content = request.POST.get('content')
            title = request.POST.get('title')  # Add title field

            if not sessionToken:
                return JsonResponse({'status': 'error', 'message': 'Session token is required'}, status=400)
            if not username:
                return JsonResponse({'status': 'error', 'message': 'Username is required'}, status=400)
            if not caption:
                return JsonResponse({'status': 'error', 'message': 'Caption is required'}, status=400)
            if not image:
                return JsonResponse({'status': 'error', 'message': 'Image is required'}, status=400)
            
            if not content:
                return JsonResponse({'status': 'error', 'message': 'Content is required'}, status=400)

            session = SessionToken.objects.get(token=sessionToken)
            if session.user.username != username:
                return JsonResponse({'status': 'error', 'message': 'Invalid session for the given username'}, status=400)

            post_id = ''.join(random.choices(string.ascii_letters + string.digits + string.punctuation, k=48))
            post = Post.objects.create(
                user=session.user,
                image=image,
                caption=caption,
                content=content,  # Save the content
                postId=post_id
            )
            return JsonResponse({'status': 'success', 'message': 'Post created successfully', 'data': {'postId': post.postId}})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def get_all_posts(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        data = []
        for post in posts:
            data.append({
                'postId': post.postId,
                'caption': post.caption,
                'image': post.image.url,
                'user': post.user.username,
                'content': post.content,
            })
        return JsonResponse({'status': 'success', 'data': data})
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)


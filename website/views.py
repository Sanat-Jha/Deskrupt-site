from django.http import FileResponse, Http404
import os
from django.conf import settings
import json
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from app.models import Maker,Deck  # Updated model name

# Create your views here.
def home(request):
    if request.user.is_authenticated:
        return render(request, 'home.html', {'user': request.user})
    return render(request, 'home.html',{'user': "lund"})


def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        if password1 != password2:
            return render(request, 'register.html', {'error': "Passwords do not match!"})

        if Maker.objects.filter(username=username).exists():  # Updated model name
            return render(request, 'register.html', {'error': "Username already exists!"})

        # Create the Maker user
        maker = Maker.objects.create(  # Updated model name
            username=username,
            password=make_password(password1),

        )
        login(request, maker)  # Updated model name
        return redirect('home')

    return render(request, 'register.html')


def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        username = username.replace(" ", "")

        maker = authenticate(request, username=username, password=password)  # Updated model name

        if maker is not None:
            login(request, maker)  # Updated model name
            return redirect('home')
        else:
            return render(request, 'login.html', {'error': "Invalid username or password!"})

    return render(request, 'login.html')


def user_logout(request):
    # Log the user out
    logout(request)
    
    # Redirect to the home page (or wherever you want after logout)
    return redirect('home')


def dashboard(request):
    if request.user.is_authenticated:
        decks = Deck.objects.filter(maker=request.user)
        return render(request, 'dashboard.html', {'user': request.user, 'decks': decks})
    return redirect('login')

def edit(request, title):
    if request.user.is_authenticated:
        deck = Deck.objects.get(title=title)
        return render(request, 'edit.html', {'deck': deck})
    return redirect('login')

def createnewdeck(request):
    newdeck = Deck.objects.create(title="NewDeck", maker=request.user)
    maker = request.user
    maker.decks.append(newdeck.title)
    maker.save()
    return redirect('edit', title="NewDeck")

def saveedits(request):
    username = request.POST.get('username')
    title = request.POST.get('title')
    oldtitle = request.POST.get('oldtitle')
    background_image = request.FILES.get('image')
    background_animation = request.POST.get('animation')
    isBgImageChanged = request.POST.get('isBgImageChanged')
    shortcuts = request.POST.get('shortcuts')
    widgets = request.POST.get('widgets')
    title = title.replace(" ", "")
    if request.user.username != username:
        return redirect('login')
    if Deck.objects.filter(title=title,maker=request.user).exists() and oldtitle != title:
        return JsonResponse({'status':'error','message':'Deck with this title already exists'})
    deck = Deck.objects.get(title=oldtitle)
    deck.title = title
    if isBgImageChanged == "true":
        deck.background_image = background_image
    deck.background_animation = background_animation
    deck.shortcuts = json.loads(shortcuts)
    deck.widgets = json.loads(widgets)
    deck.save()
    return JsonResponse({'status':'success','message':'Changes saved successfully'})

def deletedeck(request):
    # Ensure the request method is POST
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Parse the JSON payload
            deckcode = data.get('deck')  # Get the 'deck' key from the parsed data
            
            if deckcode:
                user, title = deckcode.split('/')  # Split the deck into user and title
                deck = Deck.objects.get(title=title,maker=Maker.objects.get(username=user))
                deck.delete()
                # Add your code to delete the deck here, e.g. using the maker and title
                
                return JsonResponse({'status': 'success', 'message': 'Deck deleted successfully'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Deck data missing'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON payload'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def downloadapp(request):
    file_path = os.path.join(settings.BASE_DIR, 'website', 'installers', 'deskrupt_app.exe')
    
    if os.path.exists(file_path):
        return FileResponse(open(file_path, 'rb'), as_attachment=True, filename='deskrupt_app.exe')
    else:
        raise Http404("Installer not found")




def fonts_gallery(request):
    fonts_file_path = os.path.join(settings.STATIC_ROOT, 'fontslist.txt')
    with open(fonts_file_path, 'r') as f:
        fonts = [line.strip() for line in f.readlines() if line.strip()]
    return render(request, 'fonts.html', {'fonts': fonts})

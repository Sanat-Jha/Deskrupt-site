import json
from django.shortcuts import render
from .models import Maker,Deck
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


@csrf_exempt
def deck(request):
    if request.headers.get('token') == 'from windows app':
        try:
            # Parse the JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            deckcode = data.get('deck')
            
            # Check if deckcode exists
            if not deckcode:
                return JsonResponse({'error': 'No deck code provided!'}, status=400)
            
            user, title = deckcode.split('/')
            maker = Maker.objects.get(username=user)
            deck = Deck.objects.get(title=title, maker=maker)
            
            response_data = {
                'title': deck.title,
                'bgimageurl': request.build_absolute_uri(deck.background_image.url),
                'animation': deck.background_animation,
                "shortcuts": deck.shortcuts,
                "widgets": deck.widgets,
            }
            return JsonResponse(response_data)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format!'}, status=400)
        except Maker.DoesNotExist:
            return JsonResponse({'error': 'Maker not found!'}, status=404)
        except Deck.DoesNotExist:
            return JsonResponse({'error': 'Deck not found!'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid token!'}, status=403)

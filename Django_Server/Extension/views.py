from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import spacy
import requests

@csrf_exempt
def getTweet(request):
    tweet = request.POST.get('tweet')
    print(request.POST.get('tweet'))
    print(tweet)
    
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(tweet)
    keywords = []
    for ent in doc.ents:
        keywords.append(str(ent))

    api_key = '7f4ed22aa44b4226ab27a1cb363acf85'
    url = 'https://newsapi.org/v2/everything?'

    print(keywords)
    print(' AND '.join(keywords))

    parameters = {
        'q': ' AND '.join(keywords),
        'pageSize': 3,
        'apiKey': api_key,
        'language': 'en', 
    }

    response = requests.get(url, params = parameters)
    r = response.json()
    for title in r.title:
        print(title)

    #print(type())

# Create your views here.
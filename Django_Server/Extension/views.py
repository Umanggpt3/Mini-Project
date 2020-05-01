from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from nltk import ne_chunk
from nltk.tree import Tree
from django.http import JsonResponse

@csrf_exempt
def getTweet(request):
    #Getting post
    tweet = request.POST.get('tweet')
    print(tweet)

    #Using NLTK here -
    doc = nltk.word_tokenize(tweet)
    doc = nltk.pos_tag(doc)
    print(doc)
    chunked = nltk.ne_chunk(doc)
    print(type(chunked))

    #Converting Tree to List
    continuous_chunk = []
    current_chunk = []
    for i in chunked:
        if type(i) == Tree:
            current_chunk.append(" ".join([token for token, pos in i.leaves()]))
        elif current_chunk:
            named_entity = " ".join(current_chunk)
            if named_entity not in continuous_chunk:
                continuous_chunk.append(named_entity)
                current_chunk = []
        else:
            continue 

    print(continuous_chunk)
    
    #News API calls
    api_key = '7f4ed22aa44b4226ab27a1cb363acf85'
    url = 'https://newsapi.org/v2/everything?'

    parameters = {
        'q': ' OR '.join(continuous_chunk),
        'pageSize': 5,
        'apiKey': api_key,
        'language': 'en', 
        'from': '2020-04-01',
        'to': '2020-05-01',
        'sortBy': 'publishedAt',
    }

    #Getting response 
    response = requests.get(url, params = parameters)
    r = response.json()
    result = r['articles']
    #print(result)
    print(type(result))
    for i in result:
        print(i['title'])
    
    return JsonResponse(r, safe=True)
    #print(type())

# Create your views here.
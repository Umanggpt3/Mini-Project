from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from nltk import ne_chunk
from nltk.tree import Tree
from django.http import JsonResponse
from datetime import date, timedelta

@csrf_exempt
def getTweet(request):
    #Getting post
    tweet = request.POST.get('tweet')
    print(tweet)

    #Using NLTK here -
    doc = nltk.word_tokenize(tweet)
    doc = nltk.pos_tag(doc)
    print(doc)
    
    nnpkeywords = []
    for i in doc:
        duo = i
        if(len(duo[1]) > 1):
            if (duo[1]) == 'NNP':
                nnpkeywords.append(duo[0])
    
    print(nnpkeywords)
    
    #chunked = nltk.ne_chunk(doc, binary=True)
    #print(chunked)
    #Converting Tree to List
    # continuous_chunk = []
    # current_chunk = []
    # for i in chunked:
    #     if type(i) == Tree:
    #         current_chunk.append(" ".join([token for token, pos in i.leaves()]))
    #     elif current_chunk:
    #         named_entity = " ".join(current_chunk)
    #         if named_entity not in continuous_chunk:
    #             continuous_chunk.append(named_entity)
    #             current_chunk = []
    #     else:
    #         continue 
    #print(continuous_chunk)
    
    #News API calls
    api_key = '7f4ed22aa44b4226ab27a1cb363acf85'
    url = 'https://newsapi.org/v2/everything?'

    parameters = {
        'q': ' AND '.join(nnpkeywords),
        'pageSize': 6,
        'apiKey': api_key,
        'language': 'en', 
        'from': date.today() - timedelta(30),
        'to': date.today(),
        'sortBy': 'publishedAt',
    }

    #Getting response 
    response = requests.get(url, params = parameters)
    r = response.json()

    if r['status'] != 'error':
        if r['totalResults'] > 0:
            return JsonResponse(r, safe=True)
        else:
            return HttpResponseNotFound('0')
    else:
        return HttpResponseNotFound('0')
    #print(type())

# Create your views here.
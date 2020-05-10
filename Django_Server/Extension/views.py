from django.shortcuts import render
from django.http import HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
import requests
import nltk
import json
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from nltk.tree import Tree
from django.http import JsonResponse
from datetime import date, timedelta
from gensim.models.doc2vec import TaggedDocument, Doc2Vec

@csrf_exempt
def getTweet(request):
    #Getting post
    tweet = request.POST.get('tweet')
    sortParam = request.POST.get('sortBy')
    taggeddocs = []
    print(tweet)
    print(sortParam)

    stopwords_en = stopwords.words("english")

    #Using NLTK here -
    doc = nltk.word_tokenize(tweet)
    tweet_text = preprocessing(doc, stopwords_en)
    doc = nltk.pos_tag(doc)
    print(doc)
    print(tweet_text)
    doc1 = TaggedDocument(words=tweet_text, tags=[u'NEWS_1'])
    taggeddocs.append(doc1)

    nnpkeywords = []
    nnskeywords = []
    nnkeywords = []
    for i in doc:
        duo = i
        if(len(duo[1]) > 1):
            if (duo[1]) == 'NNP':
                nnpkeywords.append(duo[0])
            if (duo[1]) == 'NNS':
                nnskeywords.append(duo[0])
            if (duo[1]) == 'NN':
                nnkeywords.append(duo[0])
    
    pos = len(nnpkeywords)
    if len(nnpkeywords) <= 2:
        for i in range(len(nnskeywords)): 
            nnpkeywords.insert(i + pos, nnskeywords[i])

    pos = len(nnpkeywords)
    if len(nnpkeywords) <= 2:
        for i in range(len(nnkeywords)): 
            nnpkeywords.insert(i + pos, nnkeywords[i])

    #News API calls
    api_key = '7f4ed22aa44b4226ab27a1cb363acf85'
    url = 'https://newsapi.org/v2/everything?'

    while True:
        print(nnpkeywords)
        parameters = {
            'q': ' AND '.join(nnpkeywords),
            'pageSize': 6,
            'apiKey': api_key,
            'language': 'en', 
            'from': date.today() - timedelta(30),
            'to': date.today(),
            'sortBy': sortParam,
        }

        #Getting response 
        response = requests.get(url, params = parameters)
        r = response.json()
        if r['status'] != 'error':
            if(r['totalResults'] > 0):
                break
        
        if len(nnpkeywords) == 0:
            break
            
        nnpkeywords.pop()

    if r['status'] != 'error':
        #print(r)
        result = r['articles']
        #print(result)
        #print(result[0])
        if r['totalResults'] > 0:

            similar = []
            for i in range(6):
                wordlist = nltk.word_tokenize(result[i]['title'] + result[i]['description'])
                text = preprocessing(wordlist, stopwords_en)
                print(text)
                doc2 = TaggedDocument(words=text, tags=[u'NEWS_2'])
                taggeddocs.append(doc2)

                #Build Model
                model = Doc2Vec(taggeddocs, dm=0, alpha=0.025, vector_size=20, min_alpha=0.025, min_count=0)

                #Train Model
                for e in range(80):
                    model.train(taggeddocs, total_examples=model.corpus_count, epochs=model.iter)
                    model.alpha -= 0.002
                    model.min_alpha = model.alpha

                similarity = model.n_similarity(tweet_text, text)
                print("Similarity Index: {:4.2f} %".format(similarity*100))

                similar.append(format(similarity*100, '.0f'))
                print(similar)

            r['similarity'] = similar

            return JsonResponse(r, safe=True)
        else:
            return HttpResponseNotFound('0')
    else:
        return HttpResponseNotFound('0')


# Create your views here.

@csrf_exempt
def preprocessing(wordlist, stopwords):
    text = [w.lower() for w in wordlist if w not in stopwords]
    return text
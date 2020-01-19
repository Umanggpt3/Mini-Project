from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def getTweet(request):
    tweet = request.POST.get('tweet')
    print(request.POST.get('tweet'))
    print(tweet)
    html_code = "<head><title>News Articles</title></head><body><p> {} </p></body>".format(tweet)
    print(html_code)
    return HttpResponse(html_code)
    #print(type())

# Create your views here.
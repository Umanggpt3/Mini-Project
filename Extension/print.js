//console.log(localStorage.sharedData);
newsData = JSON.parse(localStorage.sharedData);

let newsArticles = newsData.articles;

document.addEventListener("DOMContentLoaded", function(event) { 
    let newsArticle = newsArticles[0];
    let newsTitle = newsArticle.title;
    let newsDesc = newsArticle.description;
    let newsThumb = newsArticle.urlToImage;
    let newsAuthor = newsArticle.author;
    let newsSource =  newsArticle.source.name;
    let newsTime = newsArticle.publishedAt;
    let newsDay = getDay(newsTime);
    let newsMonth = getMonth(newsTime);

    document.getElementById('title-1').innerText = newsTitle;
    document.getElementById('author-1').innerText = newsAuthor;
    document.getElementById('source-1').innerText = newsSource;
    document.getElementById('img-1').src = newsThumb;
    document.getElementById('desc-1').innerText = newsDesc;
    document.getElementById('day-1').innerText = newsDay;
    document.getElementById('month-1').innerText = newsMonth;
    
    $('.post-module').hover(function() {
        $(this).find('.description').stop().animate({
            height: "toggle",
            opacity: "toggle"
        }, 300);
    });
});

function getDay(newsTime) {
    return newsTime[8]+newsTime[9];
}

function getMonth(newsTime) {
    let number = newsTime[5]+newsTime[6];
    switch(number) {
        case "01":
            return "January";
        case "02":
            return "February";
        case "03":
            return "March";
        case "04":
            return "April";
        case "05":
            return "May";
        case "06":
            return "June";
        case "07":
            return "July";
        case "08":
            return "August";
        case "09":
            return "September";
        case "10":
            return "October";
        case "11":
            return "November";
        case "12":
            return "December";
        default:
            return "Null";    
    }
}

delete localStorage.sharedData;
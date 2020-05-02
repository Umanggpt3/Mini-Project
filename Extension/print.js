//console.log(localStorage.sharedData);
newsData = JSON.parse(localStorage.sharedData);
console.log(newsData);

let newsArticles = newsData.articles;
let noOfArticles = newsData.articles.length;

document.addEventListener("DOMContentLoaded", function(event) { 
    $('.post-module').hover(function() {
        $(this).find('.description').stop().animate({
            height: "toggle",
            opacity: "toggle"
        }, 300);
    });
    
    for(let i = 0; i < noOfArticles; i++) {

        let newsArticle = newsArticles[i];
        let newsTitle = newsArticle.title;
        let newsDesc = newsArticle.description;
        let newsThumb = newsArticle.urlToImage;
        let newsAuthor = newsArticle.author;
        let newsSource =  newsArticle.source.name;
        let newsTime = newsArticle.publishedAt;
        let newsDay = getDay(newsTime);
        let newsMonth = getMonth(newsTime);
        let newsUrl = newsArticle.url;

        let news = "<div class='column' id='column-" + (i+1) + "'>\
            <div class='post-module' id='post-module-" + (i+1) + "'>\
                <!-- Post Thumbnail-->\
                <div class='thumbnail' id='thumbnail-" + (i+1) + "'>\
                    <div class='date'>\
                        <div class='day' id='day-" + (i+1) + "'>27</div>\
                        <div class='month' id='month-" + (i+1) + "'>Mar</div>\
                    </div>\
                    <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg' id='img-" + (i+1) + "' />\
                </div>\
                <!-- Post Content-->\
                <div class='post-content' id='post-content-" + (i+1) + "'>\
                    <a href='#' id='url-" + (i+1) + "' target='_blank'>\
                    <div class='category' id='source-" + (i+1) + "'>Open</div>\
                    </a>\
                    <h1 class='title' id='title-" + (i+1) + "'>City Lights in New York</h1>\
                    <h2 class='sub_title' id='author-" + (i+1) + "'>The city that never sleeps.</h2>\
                    <p class='description' id='desc-" + (i+1) + "'>New York, the largest city in the U.S., is an architectural marvel with plenty of\
                        historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>\
                </div>\
            </div>\
        </div>";

        document.getElementById('container-1').innerHTML += news;

        document.getElementById('title-'+(i+1)).innerText = newsTitle;
        document.getElementById('author-'+(i+1)).innerText = newsAuthor;
        document.getElementById('source-'+(i+1)).innerText = newsSource;
        document.getElementById('img-'+(i+1)).src = newsThumb;
        document.getElementById('desc-'+(i+1)).innerText = newsDesc;
        document.getElementById('day-'+(i+1)).innerText = newsDay;
        document.getElementById('month-'+(i+1)).innerText = newsMonth;
        document.getElementById('url-'+(i+1)).href = newsUrl;

    }
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

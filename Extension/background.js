chrome.contextMenus.create({
    id: "select",
    title: "THINCK",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "select") {
        let tweet = info.selectionText;
        let tweet_string = "tweet="+tweet;
        let xhr = new XMLHttpRequest();
        let theUrl = "http://127.0.0.1:8000/Extension_data/";
        xhr.open("POST", theUrl, true);
        let r, res;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && this.status == 200){
                r = this.responseText;
                console.log(r);
                localStorage.sharedData = r;
                r = JSON.parse(r);
                if(r) {
                    res = r['articles'];
                    console.log(res);
                }
                let newTabURL = chrome.extension.getURL('print.html');
                chrome.tabs.create({url: newTabURL, active: true});
            }
            else{
                //alert("Not Entered");
            }
        };

        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
        xhr.send(tweet_string);
    }
});
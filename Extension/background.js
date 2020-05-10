let index;

chrome.contextMenus.create({
    id: "select",
    title: "Select",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "select") {
        let tweet = info.selectionText;
        let tweet_string = "tweet=" + tweet + "&sortBy=" + index;
        let xhr = new XMLHttpRequest();
        let theUrl = "http://127.0.0.1:8000/Extension_data/";
        xhr.open("POST", theUrl, true);
        let r, res;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
        xhr.send(tweet_string);

        xhr.onload = function() {
            r = this.responseText;
            if(r == '0') {
                alert("No Articles Found!");
                this.abort();
            } else {
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
        };

        xhr.onerror = function() {
            alert("Can't find relevant Articles.");
        }

        xhr.onabort = function() {
            alert("Aborted!");
        }
    }
});

chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
    index = response;
    alert(index);
});
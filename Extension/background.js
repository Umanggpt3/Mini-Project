chrome.contextMenus.create({
    id: "select",
    title: "THINCK",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "select") {
        //alert(info.selectionText);
        let tweet = info.selectionText;
        let tweet_string = "tweet="+tweet;
        let xhr = new XMLHttpRequest();
        let theUrl = "http://127.0.0.1:8000/Extension_data/";
        xhr.open("POST", theUrl, true);
        let r;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && this.status == 200){
                r = this.responseText;
                console.log(r);
            }
            else{
                alert("Not Entered");
            }
        };
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
        xhr.send(tweet_string);
    }
});
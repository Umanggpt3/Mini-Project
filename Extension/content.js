$('document').ready(function() {

  console.log("Yeah It works !!!");

  let html_doc = "<html>" + document.documentElement.innerHTML + "</html>";

  let tweet_class = "css-1dbjc4n r-18u37iz r-1wtj0ep r-156q2ks r-1mdbhws";
  let tweet_classes;
  //tweet_classes = document.getElementsByClassName(tweet_class);

  const btn = document.createElement("button");
  const btn_text = document.createTextNode("Click Me");
  btn.appendChild(btn_text);

  let timerId = setInterval(function() {
    tweet_classes = document.getElementsByClassName(tweet_class);
    console.log(tweet_classes);
    console.log(tweet_classes.length)
    
    //removeInterval();
    if(tweet_classes) {
      addButtons();
      clearInterval(timerId);
    }
  }, 5000);

  function addButtons() {
    for (i=0; i<tweet_classes.length; i++) {
      console.log("added " + i);
      tweet_classes[i].appendChild(btn);
    }
  }

});
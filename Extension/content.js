$('document').ready(function() {

  console.log("Yeah It works !!!");

  chrome.runtime.onMessage.addListener(function(response,sender,sendResponse)
     {console.log(response,"msg received");
    });

});
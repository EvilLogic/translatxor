//cyberChefId = null
//chrome.tabs.query({title:"CyberChef"}, function(tabs){ alert(JSON.stringify(tabs[0])); cyberChefId = tabs[0].id;})
senderTab = null

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    //alert(JSON.stringify(request.greeting))
    
    //Send text to CyberChef
    senderTab = sender.id;
    chrome.tabs.query({title:"CyberChef"}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: request.greeting}, function(response) {
            alert("back2 " + JSON.stringify(response.farewell))
          sendResponse({farewell: response.farewell})
        });
      });
      //sendResponse({})
      //return true;
    });
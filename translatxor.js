function hexxor(text, hex){
    out = ''
    for(var i = 0; i < text.length; i++) {
        out += String.fromCharCode(text[i].charCodeAt(0) ^ hex)
    }
    return out
}

function decimalxor(text, dec){
    out = ''
    for(var i = 0; i < text.length; i++) {
        out += String.fromCharCode(text[i].charCodeAt(0) ^ dec)
    }
    return out
}

function eb64(data){
    return btoa(data);
}

function db64(data){
    return atob(data);
}

// CYBER CHEF CODE

if (document.location.href.startsWith("https://gchq.github.io/CyberChef/")){
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            var chefInput = document.getElementById("input-text");
            var chefOutput = document.getElementById("output-text");

            chefInput.innerHTML = request.greeting
        if (request.greeting != "")
            sendResponse({farewell: chefOutput.innerHTML});
        });


} else {


    var div = null;
    function drawBorderAroundSelection(selectedText) {
        var selection = window.getSelection(), // get the selection then
          range = selection.getRangeAt(0), // the range at first selection group
          rect = range.getBoundingClientRect(); // and convert this to useful data
      
        if (rect.width > 0) {
          if (div) {
            div.parentNode.removeChild(div);
          }
          div = document.createElement('p'); // make box
          div.class = 'rect';
          div.textContent = selectedText
          //div.style.border = '2px solid black'; // with outline
          div.style.position = 'fixed'; // fixed positioning = easy mode
          div.style.top = rect.top + 'px'; // set coordinates
          div.style.left = rect.left + 'px';
          div.style.height = rect.height + 'px'; // and size
          div.style.width = rect.width + 'px';
          document.body.appendChild(div); // finally append
        }
      }
    
    var t = '';
    function gText(e) {
        //cyberChefId = chrome.tabs.query({title:"CyberChef"}, function(tabs){ return tabs[0].id;})
        //console.log(cyberChefId)

        t = (document.all) ? document.selection.createRange().text : document.getSelection();

        r = ''
        chrome.runtime.sendMessage({greeting: t}, function(response) {
            console.log("content " + JSON.stringify(response.farewell));
            r = response.farewell;
            if(t != ''){
                drawBorderAroundSelection(r);
            }
          });
    }
    
    document.onmouseup = gText;
    if (!document.all) document.captureEvents(Event.MOUSEUP);
}
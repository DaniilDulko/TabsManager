chrome.runtime.onMessage.addListener(function(request, sender, sendRespomse){
    if(request.type === "getTabs"){
        chrome.tabs.query({}, function(tabs){
        sendRespomse(tabs);
        });

        }
        return true;
})
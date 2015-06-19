chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
   if (changeInfo.status == 'complete') {
    	if(localStorage.state) {
    		//alert(localStorage.state);
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {action: localStorage.state}, function(response) {});
			});
    	} else {
    		      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {action: 'None'}, function(response) {});
              });
    	}


      // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      //    chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt"}, function(response) {});
      // });
   }
});

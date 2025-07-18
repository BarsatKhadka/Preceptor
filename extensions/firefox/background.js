function sendTabInfo(tabId) {
    browser.tabs.get(tabId).then((tab) => {
        if(!tab || !tab.url || !tab.title) return;

        const tabInfo = {
            title: tab.title,
            url: tab.url
        }

        fetch("http://localhost:8000/tabInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tabInfo)
        }).catch(err => console.log("Error fetchng data"))
    })
}

function pingBackend() {
    fetch("http://localhost:8000/extension-alive", { method: "POST" });
}

// Ping on startup
pingBackend();
// Ping every 30 seconds
setInterval(pingBackend, 3000);

browser.tabs.onActivated.addListener((activeInfo) => {
    sendTabInfo(activeInfo.tabId);
})

browser.tabs.onUpdated.addListener((tabId, changeInfo) =>{
    if(changeInfo.status == "complete"){
        sendTabInfo(tabId)
    }
})

browser.windows.onFocusChanged.addListener((windowId) =>{
    if(windowId == browser.windows.WINDOW_ID_NONE) return;
    browser.tabs.query({ active: true, windowId: windowId }).then((tabs) => {
    if (tabs.length > 0) {
      sendTabInfo(tabs[0].id);
    }
  });
})
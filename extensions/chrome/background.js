function sendTabInfo(tabId) {
    chrome.tabs.get(tabId, (tab) => {
        if(!tab || !tab.url || !tab.title) return;

        const tabInfo = {
            title: tab.title,
            url: tab.url
        };

        fetch("http://localhost:8000/tabInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tabInfo)
        }).catch(err => console.log("Error fetching data"));
    });
}

function pingBackend() {
    fetch("http://localhost:8000/extension-alive", { method: "POST" });
}

// Ping on startup
pingBackend();
// Ping every 10 seconds
setInterval(pingBackend, 1000);

chrome.tabs.onActivated.addListener((activeInfo) => {
    sendTabInfo(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status === "complete"){
        sendTabInfo(tabId);
    }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
    if(windowId === chrome.windows.WINDOW_ID_NONE) return;
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
        if (tabs.length > 0) {
            sendTabInfo(tabs[0].id);
        }
    });
}); 
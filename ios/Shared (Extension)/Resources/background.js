browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
});

browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.error(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.fetchToken) {
            getToken().then(res => sendResponse(res))
        }
    }
);

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: "https://www.google.com" });
});

chrome.runtime.onInstalled.addListener(function(details) {
    // This will open Google when the extension is installed
    chrome.tabs.create({ url: "https://www.google.com" });
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.tabs.sendMessage(tab.id, {
            action: "displayButton",
            status: "success",
        }, function (response) {
        });
    })
});

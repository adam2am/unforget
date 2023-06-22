chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, { file: "content.js" });
    chrome.tabs.insertCSS(tab.id, { file: "styles.css" });
  });
  
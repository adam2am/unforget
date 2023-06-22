function injectContext(message, context, before = true) {
    if (before) {
      return context + " " + message;
    } else {
      return message + " " + context;
    }
  }
  
  function handleMessage(event) {
    const message = event.data.message;
  
    chrome.storage.sync.get({
      context: "",
      position: "before"
    }, function(items) {
      const context = items.context;
      const position = items.position;
  
      // Modify the message with injected context
      const modifiedMessage = injectContext(message, context, position === "before");
  
      // Send the modified message back to the page
      window.postMessage({ message: modifiedMessage }, "*");
    });
  }
  
  // Listen for messages from the page
  window.addEventListener("message", handleMessage);
  
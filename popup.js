document.addEventListener("DOMContentLoaded", function() {
    var saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", saveOptions);
  
    restoreOptions();
  });
  
  function saveOptions() {
    var contextInput = document.getElementById("context");
    var positionSelect = document.getElementById("position");
  
    var context = contextInput.value;
    var position = positionSelect.value;
  
    chrome.storage.sync.set({
      context: context,
      position: position
    }, function() {
      // Close the popup after saving options
      window.close();
    });
  }
  
  function restoreOptions() {
    chrome.storage.sync.get({
      context: "",
      position: "before"
    }, function(items) {
      var contextInput = document.getElementById("context");
      var positionSelect = document.getElementById("position");
  
      contextInput.value = items.context;
      positionSelect.value = items.position;
    });
  }
  
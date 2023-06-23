function createPromptTemplatesContainer() {
    const container = document.createElement('div');
    container.id = 'prompt-templates-container';
    container.style.cssText = `
      width: 300px;
      height: 100%;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 100000;
    `;
    return container;
  }
  
  function addCustomElements(container) {
    const textarea = document.createElement('textarea');
    textarea.style.cssText = `
      width: 100%;
      height: 100px;
      margin-bottom: 10px;
    `;
    textarea.placeholder = 'Enter your context...';
    container.appendChild(textarea);
  
    const selectPosition = document.createElement('select');
    selectPosition.innerHTML = `
      <option value="before">Before</option>
      <option value="after">After</option>
    `;
    container.appendChild(selectPosition);
  
    const insertButton = document.createElement('button');
    insertButton.innerText = 'Insert Text';
    insertButton.onclick = function () {
      const selectedPosition = selectPosition.value === 'before';
      insertInputIntoChatbox(textarea.value, selectedPosition);
    };
    container.appendChild(insertButton);
  
    const chooseInputButton = document.createElement('button');
    chooseInputButton.innerText = 'Choose Input Field';
    chooseInputButton.onclick = function () {
      chooseInputField(textarea.value, selectPosition.value === 'before');
    };
    container.appendChild(chooseInputButton);
  }
  
  function chooseInputField(text, beforeInput) {
    const inputFields = document.querySelectorAll('textarea');
    let selectedInputField = null;
  
    inputFields.forEach((input) => {
      input.classList.remove('selected');
      input.addEventListener('click', selectField);
    });
  
    function selectField() {
      selectedInputField = this;
      inputFields.forEach((otherInput) => {
        if (otherInput !== selectedInputField) {
          otherInput.classList.remove('selected');
        }
      });
      selectedInputField.classList.add('selected');
      selectedInputField.removeEventListener('click', selectField);
    }
  
    if (!selectedInputField) {
      console.error('No input field is selected');
    } else {
      const value = beforeInput ? text + '\n' + selectedInputField.value : selectedInputField.value + '\n' + text;
      selectedInputField.value = value;
    }
  }
  
  function insertInputIntoChatbox(text, beforeInput) {
    const chatInput = document.querySelector('[data-testid="ChatInputBox"] textarea');
    if (chatInput) {
      const value = beforeInput ? text + '\n' + chatInput.value : chatInput.value + '\n' + text;
      chatInput.value = value;
    } else {
      console.error('Chat input element not found');
    }
  }
  
  function createToggleButton() {
    const button = document.createElement('button');
    button.id = 'toggle-extension';
    button.style.cssText = `
      width: 30px;
      height: 30px;
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 100001;
      background-color: #000;
      color: #FFF;
      border-radius: 50%;
      border: none;
      cursor: pointer;
    `;
    button.innerText = '-';
    return button;
  }
  
  function injectToggleButton() {
    const toggleButton = createToggleButton();
    document.body.appendChild(toggleButton);
  
    toggleButton.addEventListener('click', () => {
      const container = document.getElementById('prompt-templates-container');
      container.style.display = container.style.display === 'none' ? 'block' : 'none';
      toggleButton.innerHTML = container.style.display === 'none' ? '+' : '-';
    });
  }
  
  if (window.location.href.includes('chat.openai.com')) {
    const container = createPromptTemplatesContainer();
    document.body.appendChild(container);
    addCustomElements(container);
    injectToggleButton();
  }
  
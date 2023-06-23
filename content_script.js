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
  
    const chooseInputButton = document.createElement('button');
    chooseInputButton.innerText = 'Choose Input Field';
    chooseInputButton.onclick = function () {
      enableFieldSelection(textarea.value, selectPosition.value === 'before');
    };
    container.appendChild(chooseInputButton);
  }
  
  function enableFieldSelection(text, beforeInput) {
    const inputFields = document.querySelectorAll('textarea');
    inputFields.forEach((input) => {
      input.addEventListener('click', selectField);
      input.style.cursor = 'pointer';
      input.style.border = '2px solid transparent';
    });
  
    function selectField() {
      inputFields.forEach((input) => {
        input.removeEventListener('click', selectField);
        input.style.cursor = 'auto';
        input.style.border = '2px solid transparent';
      });
  
      const selectedInputField = this;
      selectedInputField.style.border = '2px solid red';
  
      selectedInputField.addEventListener('keydown', handleKeyDown);
  
      function handleKeyDown(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
  
          const value = beforeInput
            ? text + '\n' + selectedInputField.value
            : selectedInputField.value + '\n' + text;
          selectedInputField.value = value;
  
          selectedInputField.removeEventListener('keydown', handleKeyDown);
          selectedInputField.style.border = '2px solid transparent';
        }
      }
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
    addCustomElements(container);
    document.body.appendChild(container);
    injectToggleButton();
  }
  
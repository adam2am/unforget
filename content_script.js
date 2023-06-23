function createPromptTemplatesContainer() {
    const container = document.createElement('div');
    container.id = 'prompt-templates-container';
    container.style.width = '300px';
    container.style.height = '100%';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.right = '0';
    container.style.zIndex = '100000';
    return container;
  }
  
  function injectPromptTemplatesContainer() {
    const container = createPromptTemplatesContainer();
    document.body.appendChild(container);
  
    const localPrompts = getLocalPrompts();
    if (localPrompts) {
      updatePromptsHTML(localPrompts);
    } else {
      setLocalPrompts();
    }
  }
  
  function setLocalPrompts() {
    // Set the default prompt templates here
    const defaultPrompts = [
      {
        id: 1,
        title: 'Prompt 1',
        content: 'Example content 1',
      },
      {
        id: 2,
        title: 'Prompt 2',
        content: 'Example content 2',
      },
    ];
  
    localStorage.setItem('prompts', JSON.stringify(defaultPrompts));
    updatePromptsHTML(defaultPrompts);
  }
  
  function getLocalPrompts() {
    const localPrompts = localStorage.getItem('prompts');
    return localPrompts ? JSON.parse(localPrompts) : null;
  }
  
  function updatePromptsHTML(prompts) {
    const container = document.getElementById('prompt-templates-container');
    container.innerHTML = '';
  
    prompts.forEach((prompt) => {
      const promptElement = document.createElement('div');
      promptElement.className = 'prompt-template';
  
      const title = document.createElement('h3');
      title.textContent = prompt.title;
      promptElement.appendChild(title);
  
      const content = document.createElement('p');
      content.textContent = prompt.content;
      promptElement.appendChild(content);
  
      container.appendChild(promptElement);
    });
  }
  
  if (window.location.href.includes('chat.openai.com')) {
    injectPromptTemplatesContainer();
  }
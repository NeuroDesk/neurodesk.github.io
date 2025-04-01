---
title: "NeuroDesk Copilot using Local LLMs"
linkTitle: "Local LLMs"
weight: 2
description: >
  NeuroDesk Copilot: How to use LLMs for code autocompletion, chat support in NeuroDesk ecosystem
---

##  Neurodesk Copilot: Using Locally hosted LLMs inside Neurodesk Environment

### Configuring LLM Provider and models


NeuroDesk Copilot allows you to harness the capabilities of **local** Large Language Models (LLMs) for code autocompletion and chat-based assistance, directly within your NeuroDesk environment. This guide demonstrates how to configure **Ollama** as your local LLM provider and get started with chat and inline code completion. You can configure the model provider and model options using the Notebook Intelligence Settings dialog. You can access this dialog from JupyterLab Settings menu -> Notebook Intelligence Settings, using `/settings` command in Copilot Chat or by using the command palette. 

### Step 1: Choose Ollama and Neurodesk copilot: type /settings in chat interface and choose Ollama and neurodesk model and save settings
![Choose Jupyter-AI settings](/static/developers/LLM_support/jupyter-ai.png)

###  Step 2: Use chat interface

1. Open the Chat feature in NeuroDesk and type your query or command. Examples:
   - **“Explain how to import MRI dataset in python.”**
   - **“Help me debug my data-loading function.”**  
2. Press Enter. NeuroDesk Copilot will respond with explanations, tips, or suggested code.

![Chat feature](/static/developers/LLM_support/chat-demo.png)

###  Step 3: Code completion

1. Begin typing your code within a cell in NeuroDesk. As you type, Copilot provides inline suggestions. You can accept suggestions by pressing **Tab** key. 
2. If the suggestion isn’t relevant, continue typing or press **Escape** to dismiss it.  

![Code completion](/static/developers/LLM_support/completion.png)

Feel free to update the settings to disable auto completer to manual invocation in Settings -> Settings Editor -> Inline Completer

---
title: "NeuroDesk Copilot using Github Copilot"
linkTitle: "Github Copilot"
weight: 2
description: >
  NeuroDesk Copilot: How to use LLMs for code autocompletion, chat support in NeuroDesk ecosystem
---

##  Neurodesk Copilot: Using Github Copilot inside NeuroDesk Environment


### Step 1: Install Jupyter AI and Jupyter lab

```bash
conda create -n jupyter-ai-intelligence python=3.12
conda activate jupyter-ai-intelligence
pip install jupyterlab gitpython
pip install notebook_intelligence
```

Start Jupyter lab 
```bash
jupyter lab 
```

###  Step 2: Login with Github and follow the Instruction below:
![Login with Github](/static/developers/LLM_support/login-github.png)

###  Step 3: Use chat interface
![Chat feature](/static/developers/LLM_support/chat-demo.png)

###  Step 4: Code completion
![Code completion](/static/developers/LLM_support/completion.png)

###  Step 5: Generate code 
![Generate Code](/static/developers/LLM_support/generate-code.gif)

### Configuring LLM Provider and models

You can configure the model provider and model options using the Notebook Intelligence Settings dialog. You can access this dialog from JupyterLab Settings menu -> Notebook Intelligence Settings, using `/settings` command in Copilot Chat or by using the command palette.
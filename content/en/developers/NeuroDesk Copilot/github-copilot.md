---
title: "NeuroDesk Copilot using Github Copilot"
linkTitle: "Github Copilot"
weight: 2
description: >
  NeuroDesk Copilot: How to use LLMs for code autocompletion, chat support in NeuroDesk ecosystem
---

##  Neurodesk Copilot: Using Github Copilot inside NeuroDesk Environment

This guide provides detailed instructions on how to set up and use GitHub Copilot in the NeuroDesk environment, enabling code autocompletion, real-time chat assistance, and code generation.

###  Step 1: Login with Github and follow the Instruction below:
1. Make sure you have a GitHub account with a valid GitHub Copilot subscription or access. If you are an eligible student, teacher, or open-source maintainer, you can access GitHub Copilot Pro for free. [See Getting free access to Copilot Pro as a student, teacher, or maintainer.](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-your-github-copilot-pro-subscription/getting-free-access-to-copilot-pro-as-a-student-teacher-or-maintainer)
2. Log in to NeuroDesk app or Neurodesktop using the GitHub single sign-on (SSO) option.  
3. Grant permission to GitHub Copilot when prompted to ensure Copilot can operate within your NeuroDesk environment.  

![Login with Github](/static/developers/LLM_support/login-github.png)

###  Step 2: Use chat interface

1. Open the Chat feature in NeuroDesk and type your query or command. Examples:
   - **“Explain how to apply a Fourier Transform in NumPy.”**
   - **“Help me debug my data-loading function.”**  
2. Press Enter. NeuroDesk Copilot will respond with explanations, tips, or suggested code.

![Chat feature](/static/developers/LLM_support/chat-demo.png)

###  Step 3: Code completion

1. Begin typing your code within a cell in NeuroDesk. As you type, Copilot provides inline suggestions. You can accept suggestions by pressing **Tab** key. 
2. If the suggestion isn’t relevant, continue typing or press **Escape** to dismiss it.  

![Code completion](/static/developers/LLM_support/completion.png)

###  Step 4: Generate code 

1. When you need a larger block of code or a specific function, ask Copilot directly in the chat or as an inline comment. For example:
   - **“Generate a Python function that reads EEG data from a CSV, cleans noise, and plots the channels.”**  
2. Copilot will produce a snippet of code you can accept, edit, or reject entirely.

![Generate Code](/static/developers/LLM_support/generate-code.gif)

### Configuring LLM Provider and models

You can configure the model provider and model options using the Notebook Intelligence Settings dialog. You can access this dialog from JupyterLab Settings menu -> Notebook Intelligence Settings, using `/settings` command in Copilot Chat or by using the command palette.
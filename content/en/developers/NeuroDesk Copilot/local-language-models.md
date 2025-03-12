---
title: "NeuroDesk Copilot using Local LLMs"
linkTitle: "Local LLMs"
weight: 2
description: >
  NeuroDesk Copilot: How to use LLMs for code autocompletion, chat support in NeuroDesk ecosystem
---

##  Neurodesk Copilot: Using Locally hosted LLMs inside Neurodesk Environment

### Step 1: Install Jupyter AI and Jupyter lab

```bash
conda create -n jupyter-ai python=3.12
conda activate jupyter-ai
pip install jupyterlab gitpython
pip install 'jupyter-ai[all]'
```

### Step 2: Deploying Neurodesk Copilot model with Ollama for Linux (For Windows and Mac users: download Ollama from https://ollama.com/)
```bash
curl -fsSL https://ollama.com/install.sh | sh 
git clone https://github.com/jnikhilreddy/jupyter-ai-neurodesk.git
cd jupyter-ai-neurodesk/
wget https://huggingface.co/jnikhilreddy/neurodesk-gguf/resolve/main/neurodesk.gguf?download=true -O neurodesk.gguf
ollama create  neurodesk -f ./Modelfile  
#Optional: To make Neurodesk copilot faster (quantize the Neurodesk model): ollama create --quantize q4_K_M neurodesk -f ./Modelfile 
ollama run neurodesk
```


Start Jupyter lab with Neurodesk Copilot
```bash
jupyter lab 
```

### Step 3: Choose Neurodesk copilot in Jupyter AI: Press on settings and choose Ollama and neurodesk model and save settings
![Choose Jupyter-AI settings](/static/developers/LLM_support/jupyter-ai.png)
![Enable Neurodesk copilot in Jupyter-AI settings](/static/developers/LLM_support/jupyter-ai-settings.png)

Feel free to update the settings to disable auto completer to manual invocation in Settings -> Settings Editor -> Inline Completer




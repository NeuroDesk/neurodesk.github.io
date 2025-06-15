---
title: "NeuroContainer Copilot using OpenAI Codex agent"
linkTitle: "OpenAI Codex agent"
weight: 2
description: >
  NeuroContainer Copilot: How to use LLM agents to automate NeuroContainer recipe generation in NeuroDesk ecosystem.
---

While NeuroDesk significantly reduces the friction associated with portability and reproducibility, incorporating new neuroimaging tools remains challenging. Incorporating new neuroimaging tools into NeuroDesk is challenging due setting the correct environment variables, finding specific versions of the software dependencies, version requirements or specific build steps. However, writing accurate and efficient container recipes requires expertise in containerization technologies and knowledge of software dependencies. NeuroContainer Copilot can help identify these details from provided documentation (README or installation documentation) and code samples. The development involves the following steps: 1) We use existing neurocontainer recipes to generate the recipes for new tools using LLM agents. 2) We use OpenAI Codex agent to automate the process of generating NeuroContainer recipes. 3) We use the generated recipes to create pull requests in the NeuroContainers repository, which can be reviewed and merged by the NeuroContainers team or user can use it to test the recipe locally.

In this example, we use OpenAI Codex agent, to automate NeuroContainer recipe generation in NeuroDesk ecosystem.

##  NeuroContainer Copilot: Using OpenAI Codex for NeuroContainer Recipe Generation

On the left side, you can see Codex, click on it to access the OpenAI Codex agent.

![Login with OpenAI](/static/developers/recipe_generator/access_codex.png)

After logging in, you can see the Codex agent interface. You can create environment and use neurocontainers github repository as base repository and enable internet access to allow the agent to search for information online.

![Create Codex environment](/static/developers/recipe_generator/create-environment.png)

![Enable Internet access](/static/developers/recipe_generator/enable_internet_codex.png)

You can then start a new task, where you can provide the name of the tool you want to containerize, and the agent will generate a recipe for you. For example, if you want to containerize `hcp-asl`, you can provide following prompt: 

> I want you to act as NeuroDesk recipe generator, compile the dependency lists required for the Github repository and install them in the neurodocker container format. Please follow the notation in https://github.com/NeuroDesk/neurocontainers/blob/main/builder/README.md carefully. Now create a docker build.yaml for recipes/hcp-asl/build.yaml based on the hcp-asl https://github.com/physimals/hcp-asl/blob/master/README.md repository README.md file, use neurocontainers GitHub repository it contains examples such as recipes/dsistudio/build.yaml. Note than if there are conda and pip install use appropriately. Please follow the notation in https://github.com/NeuroDesk/neurocontainers/blob/main/builder/README.md properly. Run recipes/hcp-asl/build.yaml file and recursively modify the neurocontainers/recipes/hcp-asl/build.yaml file.


Create a new task by clicking on the "New Task" button, and provide the prompt in the text box. You can also provide the link to the repository, so that the agent can access the documentation and code samples. Click on code to start the task.

![Codex agent interface](/static/developers/recipe_generator/create-task.png)

Codex agent will then start generating the recipe for you. It will read the documentation and code samples, and generate the recipe in the neurodocker format. You can see the progress of the task as shown in the image below. The agent will also provide you with the output of the task, which you can use to create the recipe.

![Codex agent progress](/static/developers/recipe_generator/codex-progress.png)

After the task is completed, you can see the output of the task as follows. The Codex agent will also provide you with build.yaml for hcp-asl recipe, which you can use to directly raise pull request to the neurocontainers repository. This recipe can act as You can also modify the recipe as per your requirements and test accordingly.

![Codex agent output](/static/developers/recipe_generator/codex-build-yaml.png)
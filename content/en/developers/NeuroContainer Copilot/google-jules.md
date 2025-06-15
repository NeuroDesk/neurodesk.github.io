---
title: "NeuroContainer Copilot using Google Jules agent"
linkTitle: "Google Jules agent"
weight: 2
description: >
  NeuroContainer Copilot: How to use LLM agents to automate NeuroContainer recipe generation in NeuroDesk ecosystem.
---

While NeuroDesk significantly reduces the friction associated with portability and reproducibility, incorporating new neuroimaging tools remains challenging. Incorporating new neuroimaging tools into NeuroDesk is challenging due setting the correct environment variables, finding specific versions of the software dependencies, version requirements or specific build steps. However, writing accurate and efficient container recipes requires expertise in containerization technologies and knowledge of software dependencies. NeuroContainer Copilot can help identify these details from provided documentation (README or installation documentation) and code samples. The development involves the following steps: 1) We use existing neurocontainer recipes to generate the recipes for new tools using LLM agents. 2) We use Google Jules agent to automate the process of generating NeuroContainer recipes. 3) We use the generated recipes to create pull requests in the NeuroContainers repository, which can be reviewed and merged by the NeuroContainers team or user can use it to test the recipe locally.

In this example, we use Google Jules agent, to automate NeuroContainer recipe generation in NeuroDesk ecosystem.


After logging in wth google, you can access [Jules agent](https://jules.google) dashboard. You can create an environment and use the **neurocontainers GitHub repository** as the base. Make sure to enable internet access so that the agent can search for relevant information online to assist with building accurate container recipes.

You can then start a new task, where you can provide the name of the tool you want to containerize, and the agent will generate a recipe for you. For example, if you want to containerize `hcp-asl`, you can provide following prompt: 

> I want you to act as NeuroDesk recipe generator, compile the dependency lists required for the Github repository and install them in the neurodocker container format. Please follow the notation in https://github.com/NeuroDesk/neurocontainers/blob/main/builder/README.md carefully. Now create a docker build.yaml for recipes/hcp-asl/build.yaml based on the hcp-asl https://github.com/physimals/hcp-asl/blob/master/README.md repository README.md file, use neurocontainers GitHub repository it contains examples such as recipes/dsistudio/build.yaml. Note than if there are conda and pip install use appropriately. Please follow the notation in https://github.com/NeuroDesk/neurocontainers/blob/main/builder/README.md properly. Run recipes/hcp-asl/build.yaml file and recursively modify the neurocontainers/recipes/hcp-asl/build.yaml file.

![Create Jules environment](/static/developers/recipe_generator/start_jules.png)


Create a new task by clicking on the "Give me a plan" button, and provide the prompt in the text box. You can also provide the link to the repository, so that the agent can access the documentation and code samples. Click on "Give me a plan" to start the task.

![Approve the plan](/static/developers/recipe_generator/approve_plan.png)

Jules agent will then start generating the recipe for you. It will read the documentation and code samples, and generate the recipe in the neurodocker format. You can see the progress of the task as shown in the image below. The agent will also provide you with the output of the task, which you can use to create the recipe.

After the task is completed, you can see the output of the task as follows. The Jules agent will also provide you with build.yaml for hcp-asl recipe, which you can use to directly raise pull request to the neurocontainers repository. This recipe can act as You can also modify the recipe as per your requirements and test accordingly.

![Jules agent output](/static/developers/recipe_generator/final_output.png)
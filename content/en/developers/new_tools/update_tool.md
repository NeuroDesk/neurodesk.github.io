---
title: "Update tool in Neurodesk"
linkTitle: "Update tool"
weight: 3
description: >-
     Step-by-step instructions on how to update an existing NeuroDesk tool container.
---

Updating an existing container is quite easy with this new build system. Here is a step-by-step on how to procede. 

## 1. Access the Neurodesk Containers

Navigate to the [Neurocontainers repository](https://github.com/NeuroDesk/neurocontainers):

<img src="/static/developers/new_tools/update_tool/neurocontainers.png" width="650">

## 2. Fork the repository

You will then need to fork the Neurodesk repository to your own repositories. This allows you to make changes independently and propose updates. 

<img src="/static/developers/new_tools/update_tool/neurocontainers1.png" width="650">

### Naming your repository

You may decide to keep the same name for your new reposoitory, or you may rename it. 

<img src="/static/developers/new_tools/update_tool/neurocontainers-fork.png" width="450">

### Confirming you are on the forked version

In the top left corner, you can see that you are in your forked repository of the neurocontainers repository.

<img src="/static/developers/new_tools/update_tool/neurocontainers-forked.png" width="450">

### Keeping your forked repository up-to-date

If changes are commited to the Neurodesk/neurocontainers repository, you will see a banner saying you are N commits behind. You may decide to Sync fork, which will update your repository, allowing you to have the most up-to-date files. 

<img src="/static/developers/new_tools/update_tool/neurocontainers-commits-behind.png" width="450">

## 3. Create and Edit a Codespace

Once this is done, you will want to start a Codespace using by: 

- Clicking the **+ (Create new...)** button in the top right corner. _(it's a + sign button)_
- Selecting **Codespaces** > **New codespace**.

<img src="/static/developers/new_tools/update_tool/open-codespace.png" width="650">

Configure your Codespace. 
{{< alert color="info" >}}
**Resource recommendation**:  
Most neurocontainers run smoothly on a **2-core** machine. For containers with heavier computational demands, consider using a **4-core** machine.
{{< /alert >}}

<img src="/static/developers/new_tools/update_tool/configure-codespace.png" width="450">

This opens an editable environment directly in your browser.

<img src="/static/developers/new_tools/update_tool/codespace.png" width="650">
<br><br>

In the terminal, run the following lines to configure your codespace environment.
```shell
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```
This will install a series of packages to allow you to make changes to neurocontainers.

You will also need to download the YAML extension by navigating to the Extensions tab using icon on the left of your screen and searching for YAML. Click the install button.

<img src="/static/developers/new_tools/update_tool/install-yaml1.png" width="650">
<br><br>

There will be a security pop-up where you will need to click "Trust Publisher & Install"
<img src="/static/developers/new_tools/update_tool/install-yaml2.png" width="650">
<br><br>

There will be another pop-up asking whether you allow the developers to collect data. You may click "Agree" or "Deny"
<img src="/static/developers/new_tools/update_tool/install-yaml3.png" width="650">


## 4. Make Changes to Your Container
Navigate back to the Explorer tab using icon on the left of your screen.

Using either the terminal at the bottom of your codespace or the left panel, navigate to the build.yaml file of the tool you wish to update. 

{{< alert color="info" >}}
In this example, we are updating the **Connectome Workbench** tool.
{{< /alert >}}

In the Recipe folder, you will find a folder corresponding to each tool in Neurodesk and within each folder, you will find a corresponding build.yaml file. 

- Using the GUI, you can simply navigate to that file in the left panel of your screen. 
- Using the terminal, you can use:
```shell
cd recipes/connectomeworkbench/ #or whichever other neurocontainer you want to update
```
<img src="/static/developers/new_tools/update_tool/codespace-recipe.png" width="650">
<br><br>


our Neurodesk team will revise you changes, make sure they work and commit the changes to Neurodesk, allowing all users to benefit. 
---
More detailed documentation can be found here: https://github.com/NeuroDesk/neurocontainers/tree/main/builder

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

In the terminal, run the following lines to configure your codespace
```shell
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

## 4. Make Changes to Your Container

Using either the terminal or the left panel, navigate to the build.yaml file within the neurocontainer you wish to update. 

our Neurodesk team will revise you changes, make sure they work and commit the changes to Neurodesk, allowing all users to benefit. 
---
More detailed documentation can be found here: https://github.com/NeuroDesk/neurocontainers/tree/main/builder

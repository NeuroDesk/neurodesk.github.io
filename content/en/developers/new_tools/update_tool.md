---
title: "Update tool"
linkTitle: "Update tool"
weight: 3
description: >-
     How to update an existing Neurodesk container.
---

Updating an existing container is quite easy with this new build system. You will first want to access the https://github.com/NeuroDesk/neurocontainers page.

<img src="/static/developers/new_tools/update_tool/NeuroDesk-neurocontainers-main.png" width="650">

In the recipes repository, find the folder corresponding to the app you'd wish to update. You will be looking for the build.yaml file. 

<img src="/static/developers/new_tools/update_tool/neurocontainers-recipes-connectomeworkbench.png" width="650">

Clicking on the pen on the top right allows all external users to fork the repository and then send a pull request. After creating the fork, you can now make changes to the file. 

<img src="/static/developers/new_tools/update_tool/neurocontainers-recipes-connectomeworkbench-build.png" width="650">

In order to test the changes, we recommend lauching a Codespace 

---
More detailed documentation can be found here: https://github.com/NeuroDesk/neurocontainers/tree/main/builder

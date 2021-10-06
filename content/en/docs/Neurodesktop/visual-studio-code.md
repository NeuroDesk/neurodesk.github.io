---
title: "Visual Studio Code"
linkTitle: "Visual Studio Code"
weight: 4
description: >-
     Guide connecting your VS Code environment to Neurodesktop
---

Following guide is for connecting to a Neurodesktop using a VS Code installation running on your host machine.
> Additional instructions if your Neurodesktop is running remotely  (i.e. Cloud, HPC, VM)

## Pre-requisites
[Visual Studio Code](https://code.visualstudio.com) installed on your host. Standalone version should work fine
### Full installation
Install the following VS Code extensions:
1. [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
2. [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).

The Remote Development bundle includes the Remote SSH, Containers and WSL extensions.

### Minimal installation
Install the following VS Code extensions:
1. [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
2. [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. For remote Neurodesktops, also install [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

## Connecting to Neurodesktop

Click the green 'Open Remote Window' icon on the bottom right.

![open-remote](/vscode/open-remote.png 'open-remote')

Select 'Attach to Running Container' from the dropdown panel

Start typing in 'neurodesktop'. Select the neurodesktop container from the list

This should open a VS Code Window connected to the neurodesktop container


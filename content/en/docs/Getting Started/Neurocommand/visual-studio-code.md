---
title: "Visual Studio Code"
linkTitle: "Visual Studio Code"
weight: 4
aliases: 
- /docs/getting-started/neurodesktop/visual-studio-code/
description: >-
     Guide connecting your VS Code environment to Neurodesktop
---

The following guide is for connecting to Neurodesktop using a VS Code installation running on your host machine.
> Please see additional instructions below if Neurodesktop is running remotely  (i.e. Cloud, HPC, VM)

## Pre-requisites
Visual Studio Code _(https://code.visualstudio.com)_ installed on your host. Standalone version should work fine

Install the following VS Code extensions:
- [x] [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) (Required)
- [ ] [Remote development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack). Includes the following extensions
  - [x] [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) (Required)
  - [ ] [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) (For windows hosts)

## Connecting to Neurodesktop

Open VS Code and open a Folder (File > Open Folder)
> This can be any folder (e.g. home or project folder). VS Code runs into errors if no folder is opened.

Open the Command Palette (Ctrl+Shift+P). 

Select `Remote-Containers: Attach to Running Container` from the dropdown panel

Start typing in 'neurodesktop. Select `/neurodesktop` from the list

This should open a VS Code Window connected to the neurodesktop as a Dev Container. 

> This may take about a minute if it is the first time you are connecting, as VS code has to install the VS Code server onto the container. Repeat connections should be faster.

### First time connection
> The first time connection will default to using neurodesktop root user. We want the default connection to be as the normal user to avoid permission issues.
To check which user is being used, open the terminal in the neurodesktop VS Code instance and check if the user is `user` or `root`

Follow the following steps to configure your VS Code instance to connect to neurodesktop as normal user by default:

1. Open the Command Palette (Ctrl+Shift+P). 

2. Select `Remote-Containers: Open Container Configuration File` from the dropdown panel

3. This will open a `neurodesktop%3alatest.json` file. Overwrite the file with the following contents

```json
{
	"workspaceFolder": "/home/user",
	"remoteUser": "jovyan"
}
```

4. Close this VS Code window. Use steps in [previous section](https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/#connecting-to-neurodesktop) to connect normally

## Useful Additions
A plugin to view neuroimaging data inside VScode is also available:
![image](https://user-images.githubusercontent.com/4021595/163663250-4e8894c6-ea26-4224-b619-87f5485880c1.png)


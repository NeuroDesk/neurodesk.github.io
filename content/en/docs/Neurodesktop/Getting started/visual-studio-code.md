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
Visual Studio Code _(https://code.visualstudio.com)_ installed on your host. Standalone version should work fine

Install the following VS Code extensions:
- [x] [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) (Required)
- [ ] [Remote development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack). Includes the following extensions
  - [x] [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) (Required)
  - [ ] [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) (For remote servers)
  - [ ] [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) (For windows hosts)

## For Remote servers 

Open VS Code

Open the Command Palette (Ctrl+Shift+P)

Find `Remote-SSH: Connect to Host...` and select your remote host
> More information on remote hosts available at https://code.visualstudio.com/docs/remote/ssh

This will open a new VS Code instance connected to the remote host via SSH. You may close the previous VS Code instance.

Follow the steps in the next section using the new VS Code instance

## Connecting to Neurodesktop

Open VS Code and open a Folder (File > Open Folder)
> This can be any folder (e.g. home or project folder). VS Code runs into errors if no folder is opened.

Open the Command Palette (Ctrl+Shift+P). 

Select `Remote-Containers: Attach to Running Container` from the dropdown panel

Start typing in 'neurodesktop. Select `/neurodesktop` from the list

This should open a VS Code Window connected to the neurodesktop as a Dev Container. 

> First time connection will take about a minute, as VS code has to install the VS Code server onto the container. Repeat connections should be faster

### First time connection
> First time connection will default to using neurodesktop root user. We want to default connection to be as the normal user to avoid permission issues.
To check which user is being use, open the terminal in the neurodesktop VS Code and check if the user is `user` or `root`

Follow the following steps to configure your VS Code to connect to neurodesktop as normal user by default

Open the Command Palette (Ctrl+Shift+P). 

Select `Remote-Containers: Open Container Configuration File` from the dropdown panel

This will open a `neurodesktop%3alatest.json` file. Overwrite the file with the following contents

```json
{
	"workspaceFolder": "/home/user",
	"remoteUser": "user"
}
```

Close this VS Code window. Use steps in [previous section](https://www.neurodesk.org/docs/neurodesktop/visual-studio-code/#connecting-to-neurodesktop) to connect normally

## Useful Additions
A plugin to view neuroimaging data inside VScode is also available:
![image](https://user-images.githubusercontent.com/4021595/163663250-4e8894c6-ea26-4224-b619-87f5485880c1.png)


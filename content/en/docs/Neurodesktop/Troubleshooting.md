---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
weight: 9
description: >-
     Are you experiencing issues with neurodesktop?
---

Neurodesk is an open-source project that is always evolving. If you are experiencing an issue not listed here, please open a [new issue](https://github.com/NeuroDesk/neurodesk.github.io/issues), so that we can aim to solve it and update our help documentation. 

To ask questions or suggest new features, [join the discussion](https://github.com/NeuroDesk/neurodesk.github.io/discussions) on github. 

## Windows users: WSL not installed properly

The Docker engine relies on the Windows subsystem for Linux ([WSL]( https://docs.microsoft.com/en-us/windows/wsl/install-win10)) to run on a windows machine. 

{{< alert title="Note" >}}We recommend the _manual_ install instructions, as the simplified install requires an upgrade to a preview build of Windows that may be unstable.{{< /alert >}}

If WSL is properly installed, the _Resources_ tab of the Docker settings should look something like this:

![Docker_WSL_correct](/Troubleshooting/Docker_WSL_correct.png 'Docker_WSL_correct')

However, if WSL is missing or incorrectly configured, the _Resources_ tab of the Docker settings may look something like this:

![Docker_WSL_incorrect](/Troubleshooting/Docker_WSL_incorrect.png 'Docker_WSL_incorrect')

If this is the case, follow the manual install instructions to install [WSL 2]( https://docs.microsoft.com/en-us/windows/wsl/install-win10) (including installation of Ubuntu through Microsoft Store). 

## Not enough free space on the partition in Windows and WSL2
This could help: https://yjmantilla.github.io/tutorials/wsl2-move-vhdx.html

## Trouble installing neurodesk images
This may be a memory issue. First, ensure that there is enough free space on the disk. If there is, try resetting docker settings and data. To do this:

1. Open the docker engine
2. Navigate to "Troubleshooting" (the bug icon in the top right). 
3. Click "Reset to factory defaults" 

![Docker_troubleshooting](/Troubleshooting/Docker_troubleshooting.png 'Docker_troubleshooting')

If you are still experiencing issues after this, you may need to update docker to the latest version. This can be achieved through "settings" in the docker engine, or (on windows) by right clicking on the docker tray icon:

![Docker_update](/Troubleshooting/Docker_update.png 'Docker_update')
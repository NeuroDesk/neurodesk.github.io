---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
weight: 4
description: >-
     Are you experiencing issues with neurodesktop?
---

Neurodesk is an open-source project that is always evolving. If you are experiencing an issue not listed here, please open a [new issue](https://github.com/NeuroDesk/neurodesk.github.io/issues), so that we can aim to solve it and update our help documentation. 

To ask questions or suggest new features, [join the discussion](https://github.com/NeuroDesk/neurodesk.github.io/discussions) on github. 

## Windows users: WSL not installed properly

The Docker engine relies on the Windows subsystem for Linux ([WSL]( https://docs.microsoft.com/en-us/windows/wsl/install-win10)) to run on a windows machine. 

{{< alert title="Note" >}}We recommend the _manual_ install instructions, as the simplified install requires an upgrade to a preview build of Windows that may be unstable.{{< /alert >}}

If WSL is properly installed, the _Resources_ tab of the Docker settings should look something like this:

![Docker_WSL_correct](/Docker_WSL_correct.png 'Docker_WSL_correct')

However, if WSL is missing or incorrectly configured, the _Resources_ tab of the Docker settings may look something like this:

![Docker_WSL_incorrect](/Docker_WSL_incorrect.png 'Docker_WSL_incorrect')

If this is the case, follow the manual install instructions to install [WSL 2]( https://docs.microsoft.com/en-us/windows/wsl/install-win10) (including installation of Ubuntu through Microsoft Store). 

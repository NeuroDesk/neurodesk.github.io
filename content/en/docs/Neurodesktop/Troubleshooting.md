---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
weight: 9
description: >-
     Are you experiencing issues with neurodesktop?
---

Neurodesk is an open-source project that is always evolving. If you are experiencing an issue not listed here, please open a [new issue](https://github.com/NeuroDesk/neurodesk.github.io/issues), so that we can aim to solve it and update our help documentation. 

To ask questions or suggest new features, [join the discussion](https://github.com/NeuroDesk/neurodesk.github.io/discussions) on github. 

## The clipboard in Firefox is not working correctly
Copying something to the clipboard inside the virtual desktop and pasting it outside works, but you cannot paste clipboard content into the virtual desktop from the host computer. This is a "feature" of firefox and you can disable this "feature":

- goto about:config and "Accept the Risk and Continue"
- now search for clipboard and then set the following to "true":
     - dom.events.asyncClipboard.clipboardItem
     - dom.events.asyncClipboard.read 
     - dom.events.testing.asyncClipboard

Then close firefox and restart. Then the clipboard should work as one would expect.

## The clipboard doesn't work in chrome or edge
The browsers have a security feature to protect you from something stealing your clipboard content. Depending on your security settings you have to enable it explicitly - it's a little icon in the browser address bar that looks like a clipboard:

![image](https://user-images.githubusercontent.com/4021595/154870249-731f8fe3-474f-43ff-aac4-c460893e4246.png)


## docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?.
This is usually a docker-related error, not related to neurodesktop itself. To troubleshoot docker, we can try a simpler container first:
```
docker run hello-world
```
Try the following solutions (in this order, until the above command works)
1. Win/Mac: Open docker GUI and accept T&Cs. Check that the docker engine is running
2. Close and open the terminal and retry.
3. Log out and login again, or restart the machine (current user environment doesnt fully know docker is running)
4. Add your user to the OS docker group (current user doesnt have permission to run docker)
5. docker.sock permissions need to be changed (raise a github issue [here](https://github.com/NeuroDesk/neurodesktop/issues/new/choose))

## Windows users: WSL not installed properly

The Docker engine relies on the Windows subsystem for Linux ([WSL]( https://docs.microsoft.com/en-us/windows/wsl/install-win10)) to run on a windows machine. 

{{< alert title="Note" >}}We recommend the _manual_ install instructions, as the simplified install requires an upgrade to a preview build of Windows that may be unstable.{{< /alert >}}

If WSL is properly installed, the _Resources_ tab of the Docker settings should look something like this:

![Docker_WSL_correct](/Troubleshooting/Docker_WSL_correct.png 'Docker_WSL_correct')

However, if WSL is missing or incorrectly configured, the _Resources_ tab of the Docker settings may look something like this:

![Docker_WSL_incorrect](/Troubleshooting/Docker_WSL_incorrect.png 'Docker_WSL_incorrect')

If this is the case, follow the manual install instructions to install [WSL 2]( https://docs.microsoft.com/en-us/windows/wsl/install-win10) (including installation of Ubuntu through Microsoft Store). 

##  Windows users: Not enough free space on the partition in Windows and WSL2
This could help: https://yjmantilla.github.io/tutorials/wsl2-move-vhdx.html

##  Windows users: Failure to connect to Neurodesktop in Firefox
We recommend using Microsoft Edge or Google Chrome to access Neurodesktop. 

## Trouble installing neurodesk images
This may be a memory issue. First, ensure that there is enough free space on the disk. If there is, try resetting docker settings and data. To do this:

1. Open the docker engine
2. Navigate to "Troubleshooting" (the bug icon in the top right). 
3. Click "Reset to factory defaults" 

![Docker_troubleshooting](/Troubleshooting/Docker_troubleshooting.png 'Docker_troubleshooting')

If you are still experiencing issues after this, you may need to update docker to the latest version. This can be achieved through "settings" in the docker engine, or (on windows) by right clicking on the docker tray icon:

![Docker_update](/Troubleshooting/Docker_update.png 'Docker_update')

## I got an error message 'X killed'
This may be due to Docker not having access to enough RAM from your PC/system.

If you are using WSL2 backend in Docker, then this is managed by Windows settings. Try the following steps to check how much RAM Docker has access to and increase the amount if necessary.
1. Run Docker
2. Open a terminal (ie. Powershell) in the PC you want to use to run Neurodesktop (not in Neurodesktop itself) and type the following command:
```
docker info
```
This will generate information about your Docker installation (make sure Docker is running during this step)

3. Look for the line that says
```
Total Memory: **.**GiB
```
4. If this value is ~2GB, try increasing it*:
     - Create a .wslconfig file in your user directory (for more detail instructions see: https://docs.microsoft.com/en-us/windows/wsl/wsl-config)
     - In the .wslconfig file include the following lines:
     ```
     [wsl2]
     memory=32GB
     ```
     - Quit Docker (make sure it's not running in the background, ie. system tray, check task manager)
     - In the terminal, run the following command
     ```
     wsl --running --list
     ```
     This will list any running distributions. For the update to be successful, WSL needs to have comletely stopped running (ie. no distributions running)
     - Restart Docker and rerun steps 1-3 to confirm it was successful
If you are not using WSL2, you can check and manage your RAM allocation in the Docker desktop application.
1. Open the Docker application and navigate to settings > resources > advances
2. Scroll down to the Memory option and use the sliding bar to adjust the setting
3. Click apply and restart

*RAM requirements will vary based on the tools/data you are using. If the system you're using has limited RAM, test out a few different amounts by running the above steps and then your analyses in Neurodesktop. Version 20220208 onwards has a memory monitor in the taskbar - you can use this to check how much memory Neurodesktop has access to and how much is being used by the analyses being run.

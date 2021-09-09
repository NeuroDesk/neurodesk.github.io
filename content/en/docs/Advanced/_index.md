---
title: "Advanced"
linkTitle: "Advanced"
weight: 3
description: >
  Advanced usage
---

# Storage

## Mount volume using SSHFS
`sshfs -o allow_root USER@TARGET_HOST:TARGET_PATH SOURCE_PATH`

## Not enough free space
For Windows

https://yjmantilla.github.io/tutorials/wsl2-move-vhdx.html

# Display

## Start with custom screen resolution for VNC Viewer
Add the following parameter to the docker call:
```
-e RESOLUTION=1920x980
open in VNC viewer:  http://localhost:5900
```

## Change screen resolution in browser without restarting VNM
IMPORTANT NOTICE: All graphical and terminal applications running within the VNM will be terminated after the resize. If desired, terminal applications CAN be made to survive by executing the "screen" command before running the application. If "screen" is not installed on your VNM, please let us know by starting a discussion at https://github.com/NeuroDesk/neurodesk/discussions

1. Change the size of the browser window within which the VNM runs to the desired size
2. Click on the terminal icon in the task bar of the VNM (4th icon from the left). If the task bar is not visible, the terminal can be started by clicking on the vnm folder icon on the top-left corner of the VNM desktop, click on "Applications" on the left, click the "System Tools" icon, and then the "LXTerminal" icon.
3. Type the following command into the terminal and press ENTER:
```
curl localhost:6079/resize 
```
4. Wait until the desktop is replaced with a page that says "noVNC" in big letters (should take between a few seconds to half a minute)
5. Click the "Connect" button just below the "noVNC" and the new resized desktop size is ready to use (if clicking on "Connect" results in the message "Fails to connect to server" showing on the top, try to click again every few seconds, until the new resized desktop does come up).

# Run Neurodesk VNM for free on cloud providers
* [Oracle OCI](https://mri.sbollmann.net/index.php/2020/12/08/run-neurodesk-on-oracle-cloud-free-tier)
* [Microsoft Azure](https://henryjburg.medium.com/neurodesk-running-on-azure-3e38c590a152)


# Technical Details

Operating system within the docker: Linux Ubuntu 20.04 LTS

Desktop environemnt within the docker: LXDE/LxQT

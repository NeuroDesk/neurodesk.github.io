---
title: "What's next?"
linkTitle: "What's next?"
weight: 2
description: >-
     Congratulations! You've installed Neurodesktop. What happens next?
---

Now that you’ve installed and launched neurodesktop, you should see a virtual desktop environment in your browser, which might look something like this:

![desktop](/Desktop.png 'desktop')

In this linux desktop environment, you can access the menu, launch programs, write analysis code, use version control software (i.e. git) and develop analysis pipelines as though you were on your own computer.

## Release
Keep a note of the release number of the container image that you installed. Regardless of what operating system you installed neurodesktop into, the version number would have been at the end of the _docker run_ command: 

![version](/version.png 'version')

We regularly update neurodesktop to make sure it’s running well and has up-to-date software. You can check the [Release History](https://neurodesk.github.io/docs/neurodesktop/release-history/) page for details of previous releases. If you’d like to update your container at any time, simply switch out the release number for the version you would like. If you’ve finished working on an analysis pipeline and would like to share it with others, you can point them toward the stable release number that you worked in. That way anyone, on any computer around the world can replicate your analysis pipeline in the exact same computing environment that you developed it in. 

## Video tutorial
Click [here](https://www.youtube.com/watch?v=JLv_5fycugw) to watch a 2 minute tutorial video from OHBM 2021

## How to access files from your Host computer?
The `-v C:/neurodesktop:/neurodesktop` part of the docker command links the directory "neurodesktop" on the "C drive" of your Windows computer to the directory /neurodesktop inside the Desktop environment. Everything you store in there will be available inside neurodesktop and on the host computer. You can also mount additional directories by adding another -v parameter set (e.g. `-v D:/moredata:/data`) - this will mount the directory moredata from your D drive to /data inside neurodesktop. 

## How to launch/download applications
Click on the Launcher icon in bottom-left corner and navigate to the "Neurodesktop" menu, then select the application and version you wish to launch. If it is the first time you launch the application, it will be downloaded to your desktop environment. The application is ready to use when the "Singularity>" prompt appears in the terminal window that opens. If you chose in the menu the GUI of the application (e.g., fsleyesGUI 6.0.3), it will open automatically. If you chose that application itself (e.g., fsl 6.0.3), a terminal window will open, and you can use it to run any of the utilities packaged with the application, including the graphical utilities (e.g., typing "fsl" to run FSL's main menu).

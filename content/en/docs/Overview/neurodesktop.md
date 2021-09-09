---
title: "Neurodesktop"
linkTitle: "Neurodesktop"
weight: 1
description: >
  A compact Docker container with a browser-accessible environment for reproducible neuroimaging analysis. Only the required applications, already pre-installed, are downloaded from a public library (downloaded as containers).
---



For operating system specific instructions see Getting started
https://neurodesk.github.io/docs/getting-started/


## How to access files from your Host computer?
The `-v C:/neurodesktop:/neurodesktop` part of the docker command links the directory "neurodesktop" on the "C drive" of your Windows computer to the directory /neurodesktop inside the Desktop environment. Everything you store in there will be available inside VNM and on the host computer. You can also mount additional directories by adding another -v parameter set (e.g. `-v D:/moredata:/data`) - this will mount the directory moredata from your D drive to /data inside VNM. 

## How to launch/download applications
Click on the Launcher icon in bottom-left corner and navigate to the "Neurodesktop" menu, then select the application and version you wish to launch. If it is the first time you launch the application, it will be downloaded to your desktop environment. The application is ready to use when the "Singularity>" propmpt appears in the terminal window that opens. If you chose in the menu the GUI of the application (e.g., fsleyesGUI 6.0.3), it will open automatically. If you chose tha application itself (e.g., fsl 6.0.3), a terminal window will open, and you can use it to run any of the utilities packaged with the application, including the grphical utilities (e.g., typing "fsl" to run FSL's main menu).
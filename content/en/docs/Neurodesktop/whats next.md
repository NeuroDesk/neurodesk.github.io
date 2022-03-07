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
Keep a note of the release date of the container image that you installed. Regardless of what operating system you installed neurodesktop into, the release date would have been at the end of the _docker run_ command: 

![version](/version.png 'version')

We regularly update neurodesktop to make sure it’s running well and has up-to-date software. You can check the [Release History](https://neurodesk.github.io/docs/neurodesktop/release-history/) page for details of previous releases. If you’d like to update your container at any time, simply switch out the release number for the version you would like. If you’ve finished working on an analysis pipeline and would like to share it with others, you can point them toward the stable release number that you worked in. That way anyone, on any computer around the world can replicate your analysis pipeline in the exact same computing environment that you developed it in. 

## Video tutorial
Click [here](https://www.youtube.com/watch?v=JLv_5fycugw) to watch a 2 minute tutorial video from OHBM 2021

## How to access files from your Host computer
There are various ways of connecting your data to to Neurodesktop. For more information see our Storage section: [Storage](/docs/neurodesktop/storage)

## How to launch applications
Click on the Launcher icon in bottom-left corner, navigate to the "Neurodesk" menu and then to the relevant submenu (or "All Applications" for an alphabetical list of all applications). Navigate to the desired application, and then click on a menu entry. If it is the first time you launch an application, it may take a few seconds until it starts (please be patient!).

If you choose a menu entry with "GUI" at the end (e.g., fsleyesGUI 6.0.3), the main GUI interface of the application will open. 

If you choose a menu entry without "GUI" at the end (e.g., fsl 6.0.3), a terminal window will open, and you can use it to run any of the utilities packaged with the application, including the graphical utilities (e.g., typing "fsl" to run FSL's main menu).  Please be patient when running a utility for the first time; Neurodesk is using a clever system that only downloads the utilities that you are actually using, but this may incur a short delay on the order of seconds.
Also notice that the terminal that opens only allows to run utilities from the one application chosen in the menu. To be able to run utilities from multiple applications in the same terminal (or in the same script), please open a separate terminal by clicking on the terminal icon in the bottom toolbar of Neurodesktop. You will then be able to use the 'module' command in order to load the desired applications.

## How to keep your modifications in the container
We designed neurodesk with reproducibility as a main goal, so the desktop containers should not be modified if one aims for full reproducibility. However, there is one good option to keep your settings across different container versions: You can write a shell script that installs additional packages and modifies the environment so it's perfect for you. This script can then be re-executed in a new desktop version and will enable a reprudcible customization.

Another option is to "save" your docker container including all changes you made. This could be useful when your changes are too difficult to write a shell script or when you do not care about reproducibilty as much and you just want to get the job done. To do this you can commit (https://docs.docker.com/engine/reference/commandline/commit/) your container and by uploading the container to your own docker hub you could even share it. 

## How to force a complete container download to your system
To increase speed and reliability of Neurodesktop we mount the application containers from a CVMFS mount and download only the files required to run your current task. Although we aim to keep everything on there reproducible, there might be a reason that you want to fully download the containers to your system. You can force this behaviour by adding another parameter to the docker call: `-e CVMFS_DISABLE=true`

For windows an example would look like this:
```shell
docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -e CVMFS_DISABLE=true -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} vnmd/neurodesktop:{{< params/neurodesktop/version >}}
```

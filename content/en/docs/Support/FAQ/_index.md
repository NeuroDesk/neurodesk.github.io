---
title: "Neurodesk FAQ"
linkTitle: "FAQ"
weight: 2

description: >
  Frequently Asked Questions.
---

{{< toc >}}

## What is Neurodesk?
Neurodesk provides a containerised data analysis environment to facilitate reproducible analysis of neuroimaging data. Analysis pipelines for neuroimaging data typically rely on specific versions of packages and software, and are dependent on their native operating system. These dependencies mean that a working analysis pipeline may fail or produce different results on a new computer, or even on the same computer after a software update. Neurodesk provides a platform in which anyone, anywhere, using any computer can reproduce your original research findings given the original data and analysis code. 

More information: 
- [A Neurodesk Overview](/docs/overview)
- A 2 minute video explaining what Neurodesk is: [Neurodesk in 2 minutes](https://www.youtube.com/watch?v=JLv_5fycugw)
- An online interactive demo you can try RIGHT NOW in your browser: https://neurodesk.github.io/docs/getting-started/neurodesktop/play/

In-depth information:
- A 1 hour video showcasing Neurodesk live and explaining the background: [ReproNim Webinar](https://www.youtube.com/watch?v=HY-TqE6I2oo)
- A 30 minute video explaining Open Data processing in Neurodesk: [MRItogether data management](https://www.youtube.com/live/bbSDNSzLftI?feature=share&t=1159)
- A 15 minute video explaining what Neurodesk is: [Neurodesk in 15 minutes](https://youtu.be/2ATgTOsiGdY)
- A 35 minute video explaining the technical details of Neurodesk: [Neurodesk in 35 minutes - behind the scenes](https://youtu.be/V5gAA9NiX_s)

## What applications are included in Neurodesk?
You can check out the complete list of [these applications](/docs/overview/applications)

## How should I cite the tools I am using and Neurodesk itself?
[See here](/docs/overview/how-to-cite-us)

## Can I run Neurodesk on an HPC without Docker?
Yes, our project aims to run on the hardware you have access to. However, without docker support you cannot use our desktop interface [NeuroDesktop](/docs/getting-started/neurodesktop) but you can still use the command line interface [NeuroCommand on HPC](https://www.neurodesk.org/docs/getting-started/neurocommand/). This works well for batch processing on HPCs once you developed your pipeline in our desktop interface. If your HPC provides a desktop interface you can use all our graphical applications without any issues and the GUIs even work via SSH x-forwarding - it's not the most performant experience, but it works well enough.

## Is there reduced performance when using containers?
If you are running containers on Linux there is no performance penalty - on an HPC with a Lustre filesystem it can even be faster to run our containers than running natively on the filesystem (because meta data operations are shifted to the compute node - more information can be found here: Rioux, Pierre, Gregory Kiar, Alexandre Hutton, Alan C. Evans, and Shawn T. Brown. ‘Deploying Large Fixed File Datasets with SquashFS and Singularity’. ArXiv:2002.06129 [Cs], 14 February 2020. https://arxiv.org/abs/2002.06129). However, running Neurodesktop on Windows and Mac will have a performance penalty, because Linux runs in a Hypervisor on these systems.   

## How can I see how much resources Neurodesk containers need?
In Linux the containers run as normal processes and you can use htop and top to inspect the resource footprint. For Windows and Mac the information is not readily available and we wrote some information here: [Troubleshooting](https://www.neurodesk.org/docs/support/faq/#i-got-an-error-message-x-killed-or-not-enough-memory)

## Can I just use the plain containers?
Yes, there are multiple ways of using the containers directly and we provide an overview here: https://www.neurodesk.org/docs/getting-started/neurocontainers/

## How to keep your modifications in the container
We designed neurodesk with reproducibility as a main goal, so the desktop containers should not be modified if one aims for full reproducibility. However, there is one good option to keep your settings across different container versions: You can write a shell script that installs additional packages and modifies the environment so it's perfect for you. This script can then be re-executed in a new desktop version and will enable a reproducible customization.

Another option is to "save" your docker container including all changes you made. This could be useful when your changes are too difficult to write a shell script or when you do not care about reproducibility as much and you just want to get the job done. To do this you can commit (https://docs.docker.com/engine/reference/commandline/commit/) your container and by uploading the container to your own docker hub you could even share it. 

## How to force a complete container download to your system
To increase speed and reliability of Neurodesktop we mount the application containers from a CVMFS mount and download only the files required to run your current task. Although we aim to keep everything on there reproducible, there might be a reason that you want to fully download the containers to your system. You can force this behaviour by adding another parameter to the docker call: `-e CVMFS_DISABLE=true`

For windows an example would look like this:
```cmd
docker run --shm-size=1gb -it --privileged --user=root --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -e CVMFS_DISABLE=true -p 8888:8888 -h neurodesktop-{{< params/neurodesktop/version >}} vnmd/neurodesktop:{{< params/neurodesktop/version >}}
```

## Freeview 7.2.0 crashes when I open files
Freeview (and Freesurfer!) needs a valid license to work and we are not allowed to distribute a license with Neurodesk!

So here is how you can run freeview 7.2.0 and open your files:

1) apply for a license (https://surfer.nmr.mgh.harvard.edu/registration.html) and paste this license in ~/.license

then run
```
echo "export FS_LICENSE=~/.license" >> ~/.bashrc
then start freeview 7.2.0 and it should all work perfectly.
```
## Matlab asks me to reactivate after restarting the desktop
There is one workaround for this problem. Fix the mac address for your session by including this in your docker command:
```
--mac-address 02:42:ac:11:00:02 
```

## VScode

### Vscode is not starting up (or starts many many copies of itself ...)
This problem seems to be caused by a corrupted config directory. To fix this, run:
```
rm -rf ~/.config/Code
```

## Keyboard and Multi-Language support

### I am using a European keyboard layout and I cannot type symbols that require the ALT-GR key (like @ or \\)
This seems to be a bug in Guacamole and RDP in combination with certain browsers. There are a few workarounds you can try:
1) Use the connection option "Desktop Fixed-Resolution (VNC)" instead of Desktop Auto-Resolution (RDP)
2) connect to the desktop using an RDP client instead of the browser (https://www.neurodesk.org/docs/getting-started/neurodesktop/windows/#using-an-rdp-client)

## Copy-Paste and Clipboard issues

### How top copy and paste text
You can copy and paste text within Neurodesktop and between Neurodektop and your host computer using the regular keyboard shortcuts (CTRL+C, CTRL+X, and CTRL+V). Note however that some applications (e.g., command-line terminal) are using other keyboard shortcuts. You can usually find them in the "Edit" menu of the relevant application.

Note for Mac Users: You will need to use a combination of CTRL and Command shortcuts in order to copy and paste text between Neurodesktop and the host computer. For example, copy text from your Mac with Command+C and then paste it into Neurodesktop using CTRL+V. For the other way around, you'd use CTRL+C in Neurodesktop and then Command+V on the Mac.

### I cannot copy and paste text within Neurodesktop using keyboard shortcuts
If you're using Mac, you might be trying to use Mac keyboard shortcuts, but Neurodesktop is using Linux keyboard shortcuts (CTRL+C and CTRL+V)
If you use the terminal, please see "I fixed my internet browser clipboard, but copy or paste still do not work in the terminal" below.

### Copying text from my host computer and pasting it inside Neurodesktop doesn't work in Firefox
This is a "feature" of firefox and you can disable this "feature":

- navigate to [about:config](about:config) and "Accept the Risk and Continue" ("about:config" needs to be entered in the address bar of firefox and hit enter)
- now search for clipboard and then set the following to "true":
     - dom.events.asyncClipboard.clipboardItem
     - dom.events.asyncClipboard.read 
     - dom.events.testing.asyncClipboard

Then close firefox and restart. Then the clipboard should work as one would expect.

If the clipboard still does not work, check "I fixed my internet browser clipboard, but ..." sections below.

### Copy and paste between my host computer and Neurodesktop (or vice versa) doesn't work in Chrome or Edge
The browsers have a security feature to protect you from something stealing your clipboard content. Depending on your security settings you have to enable it explicitly - it's a little icon in the browser address bar that looks like a clipboard.

After pressing the icon, you should choose the option shown below in the dialog that opens. After pressing "Done", close the current browser tab and open a new one for the changes to take effect.

![image](https://user-images.githubusercontent.com/4021595/154870249-731f8fe3-474f-43ff-aac4-c460893e4246.png)

If the clipboard still does not work, check "I fixed my internet browser clipboard, but ..." sections below.

### I fixed my internet browser clipboard, but copy or paste still do not work in the terminal
The terminal is using special keyboard shortcuts, Shift+CTRL+C for copy, and Shift+CTRL+V for paste. Alternatively, you can copy and paste text by using the terminal's "Edit" menu.

### I fixed my internet browser clipboard, but copy or paste still do not work in the file browser
The copy and paste options in the "Edit" menu of the file browser are used to copy and paste files, not text. To copy and paste text from/into the file browser application (e.g., copy a path into the path field in the top), use the CTRL+C and CTRL+V keyboard shortcuts.

### I fixed my internet browser clipboard, but copy or paste still do not work in a specific/all applications
If you're using Mac, you might be trying to use Mac keyboard shortcuts, but Neurodesktop is using Linux keyboard shortcuts.
For more details, read the "Note for Mac users" [here](https://www.neurodesk.org/docs/support/faq/#how-top-copy-and-paste-text).

It is also possible that the text you are trying to copy includes special characters (e.g., non-English characters), which may cause Neurodesktop to not execute your paste command (including the non specials characters). Give special attention to the following characters:
- Dash: the en (short) dash is the normal one and copies ok, but the em (long) dash is considered a special character. When in doubt, replace all the dashes in the text you want to copy with en dashes.
- Quotation mark: a strictly vertical quotation mark is fine, but a slightly leaning quotation mark / an apostrophe are special characters. When in doubt, replace all quotation marks in the text you want to copy with vertical quotation marks.

If it still does not work, please report the problem and we will do our best to help you:

1. Copy some text from your host computer (CTRL+C, or Command+C)
2. Open the Mousepad text editor in Neurodesktop (Start button &rarr; "Accessories" &rarr; "Mousepad")
3. Try to paste the text using the menu option "Edit" &rarr; "Paste"
4. Try to paste the text again using CTRL+V
5. If you don't have one already, please create a Github account [here](https://github.com/signup)
6. Go to our discussion forum [here](https://github.com/orgs/NeuroDesk/discussions)
7. If you are not logged into Github, please log in (upper right corner)
8. Press "New Discussion" button
9. In the message that you write, please specify your operating system, your internet browser, the application in question, and if you can copy/paste to Mousepad and how?

## Docker, WSL, Memory

### docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?.
This is usually a docker-related error, not related to neurodesktop itself. To troubleshoot docker, we can try a simpler container first:
```bash
docker run hello-world
```
Try the following solutions (in this order, until the above command works)
1. Win/Mac: Open docker GUI and accept T&Cs. Check that the docker engine is running
2. Linux: Make sure you started the docker daemon (sudo systemctl start docker)
3. Add your user to the OS docker group (sudo usermod -aG docker $USER)
6. docker.sock permissions need to be changed (sudo chown root:docker /var/run/docker.sock)
4. Close and open the terminal and retry.
5. Log out and login again, or restart the machine (current user environment does not fully know docker is running)

### Windows users: WSL not installed properly

The Docker engine relies on the Windows subsystem for Linux ([WSL]( https://docs.microsoft.com/en-us/windows/wsl/install-win10)) to run on a windows machine. 

{{< alert title="Note" >}}We recommend the _manual_ install instructions, as the simplified install requires an upgrade to a preview build of Windows that may be unstable.{{< /alert >}}

If WSL is properly installed, the _Resources_ tab of the Docker settings should look something like this:

![Docker_WSL_correct](/Troubleshooting/Docker_WSL_correct.png 'Docker_WSL_correct')

However, if WSL is missing or incorrectly configured, the _Resources_ tab of the Docker settings may look something like this:

![Docker_WSL_incorrect](/Troubleshooting/Docker_WSL_incorrect.png 'Docker_WSL_incorrect')

If this is the case, follow the manual install instructions to install [WSL 2]( https://docs.microsoft.com/en-us/windows/wsl/install-win10) (including installation of Ubuntu through Microsoft Store). 

###  Windows users: Not enough free space on the partition in Windows and WSL2
This could help: https://yjmantilla.github.io/tutorials/wsl2-move-vhdx.html

###  Windows users: Failure to connect to Neurodesktop in Firefox
We recommend using Microsoft Edge or Google Chrome to access Neurodesktop. 

### Trouble installing neurodesk images
This may be a memory issue. First, ensure that there is enough free space on the disk. If there is, try resetting docker settings and data. To do this:

1. Open the docker engine
2. Navigate to "Troubleshooting" (the bug icon in the top right). 
3. Click "Reset to factory defaults" 

![Docker_troubleshooting](/Troubleshooting/Docker_troubleshooting.png 'Docker_troubleshooting')

If you are still experiencing issues after this, you may need to update docker to the latest version. This can be achieved through "settings" in the docker engine, or (on windows) by right clicking on the docker tray icon:

![Docker_update](/Troubleshooting/Docker_update.png 'Docker_update')

### I got an error message 'X killed' or not enough memory
This may be due to Docker not having access to enough RAM from your host computer.

#### If you are using Docker on MacOS 
1. The memory amount is managed via the Docker settings:
![image](https://user-images.githubusercontent.com/4021595/154880061-cff2dde0-632d-4d8c-b627-28df6b074f48.png)

#### If you are using Docker on Windows 10 with the WSL2 backend
then this is managed by Windows settings. Try the following steps to check how much RAM Docker has access to and increase the amount if necessary.
1. Run Docker
2. Open a terminal (ie. Powershell) in the PC you want to use to run Neurodesktop (not in Neurodesktop itself) and type the following command:
```cmd
docker info
```
This will generate information about your Docker installation (make sure Docker is running during this step)

3. Look for the line that says
```none
Total Memory: **.**GiB
```
4. If this value is ~2GB, try increasing it*:
     - Create a .wslconfig file in your user directory (for more detail instructions see: https://docs.microsoft.com/en-us/windows/wsl/wsl-config)
     - In the .wslconfig file include the following lines:
     ```none
     [wsl2]
     memory=32GB
     ```
     - Quit Docker (make sure it's not running in the background, ie. system tray, check task manager)
     - In the terminal, run the following command
     ```cmd
     wsl --running --list
     ```
     This will list any running distributions. For the update to be successful, WSL needs to have completely stopped running (ie. no distributions running)
     - Restart Docker and rerun steps 1-3 to confirm it was successful

#### If you are not using WSL2, you can check and manage your RAM allocation in the Docker desktop application.
1. Open the Docker application and navigate to settings > resources > advances
2. Scroll down to the Memory option and use the sliding bar to adjust the setting
3. Click apply and restart

*RAM requirements will vary based on the tools/data you are using. If the system you're using has limited RAM, test out a few different amounts by running the above steps and then your analyses in Neurodesktop. Version 20220208 onwards has a memory monitor in the taskbar - you can use this to check how much memory Neurodesktop has access to and how much is being used by the analyses being run.

### How to empty trash bin in Neurodesktop

If you have deleted files using the Neurodesktop GUI but your storage is not yet emptied, execute the following command in the terminal.

```bash
rm -rf ~/.local/share/Trash/
```

## How can I contribute new containers?
We are still working on making this easier, but here is the current workflow to [add new applications](/developers/new_tools).

## I couldn't find the information I was looking for. Where can I get additional assistance?
Neurodesk is an open-source project that is always evolving. If you are experiencing an issue not listed here, you can reach out to us on Github.
Post your question at https://github.com/orgs/NeuroDesk/discussions or open a [new issue](https://github.com/NeuroDesk/neurodesk.github.io/issues), so that we can aim to solve it and update our help documentation. 


## How do I get my files in there?
It depends where you are running Neurodesk and where your files are. We provide many different ways from drag-and-drop, to cloud storage to file mounts in [Storage in Neurodesk](/docs/getting-started/storage).

---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
weight: 9
description: >-
     Are you experiencing issues with neurodesktop?
---

Neurodesk is an open-source project that is always evolving. If you are experiencing an issue not listed here, please open a [new issue](https://github.com/NeuroDesk/neurodesk.github.io/issues), so that we can aim to solve it and update our help documentation. 

To ask questions or suggest new features, [join the discussion](https://github.com/orgs/NeuroDesk/discussions) on github. 

{{< toc >}}

## Keyboard and Multi-Language support

### I am using a European keyboard layout and I cannot type symbols that require the ALT-GR key (like @ or \\)
This seems to be a bug in Guacamole and RDP in combination with certain browsers. There are a few workarounds you can try:
1) Use the connection option "Desktop Fixed-Resolution (VNC)" instead of Desktop Auto-Resolution (RDP)
2) connect to the desktop using an RDP client instead of the browser (https://www.neurodesk.org/docs/neurodesktop/getting-started/windows/#using-an-rdp-client)

## Copy-Paste and Clipboard issues

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
For more details, read the "Note for Mac users" [here](https://www.neurodesk.org/docs/neurodesktop/whats-next/#how-top-copy-and-paste-text).

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

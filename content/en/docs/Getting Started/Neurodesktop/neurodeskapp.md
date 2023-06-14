---
title: "Neurodesk App"
linkTitle: "Neurodesk App"
weight: 1
description: >
  A cross-platform desktop application for Neurodesk: The easiest way to use Neurodesktop
---

<img style="float: right;" src="/getting-started/neurodeskapp/neurodesk-desktop.png" width="400">
<!-- ![Neurodesk App](/getting-started/neurodeskapp/neurodesk-desktop.png 'neurodeskapp') -->

### Minimum System Requirements
1. At least 5GB free space for neurodesktop base image
2. Docker requirements.


## Installing Docker

The Neurodesk App requires Docker to be installed on your computer. If you already have Docker installed, you can skip this step.

- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)
- [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
- [Docker Engine for Linux](https://docs.docker.com/engine/install/)

After installation, open a terminal (Linux/macOS) or command prompt (Windows) and run the following command to verify that Docker is working correctly:
```bash
docker --version
docker run hello-world
```

## Installing Neurodesk App

If you have an existing Neurodesk App installation, please first uninstall it by following the uninstall instructions [here](#uninstalling-neurodesk-app). Then, follow the installation instructions below:

- [Debian, Ubuntu Linux Installer](https://github.com/NeuroDesk/neurodesk-app/releases/latest/download/NeurodeskApp-Setup-Debian.deb )
- [Red Hat, Fedora, SUSE Linux Installer](https://github.com/NeuroDesk/neurodesk-app/releases/latest/download/NeurodeskApp-Setup-Fedora.rpm )
- [Arch-based package via AUR](https://aur.archlinux.org/packages/neurodeskapp-bin )
- [macOS Intel Installer](https://github.com/NeuroDesk/neurodesk-app/releases/latest/download/NeurodeskApp-Setup-macOS-x64.dmg ), [macOS Apple silicon Installer](https://github.com/neurodesk/neurodesk-app/releases/latest/download/NeurodeskApp-Setup-macOS-arm64.dmg )
- [Windows Installer](https://github.com/NeuroDesk/neurodesk-app/releases/latest/download/NeurodeskApp-Setup-Windows.exe )


## Launching Neurodesk App

The Neurodesk App can be launched directly from your operating system's application menu, or by running the `neurodeskapp` command in the command line.

> Note that the Neurodesk App will set the File Browser's root directory based on the launch method used. The default working directory is the user's home directory - this can be customized from the Settings dialog.

## Sessions and Projects

Sessions represent local project launches and connections to existing Neurodesk servers. Each Neurodesk UI window in the app is associated with a separate session and sessions can be restored with the same configuration later on.

### Session start options

You can start a new session by using the links at the Start section of the Welcome Page.

![Start](/getting-started/neurodeskapp/start-session.svg "Start session")

- `Open Local Neurodesk..` creates a new session in the default working directory.
- `Connect to remote Neurodesk server..` creates a session by connecting to a remote Neurodesk server.

Previously opened sessions are stored as part of application data and they are listed on the Welcome Page. Clicking an item in the `Recent sessions` list restores the selected session.


## Connecting to local Neurodesk

Neurodesk App creates new Neurodesk sessions by launching a locally running Neurodesk server and connecting to it. To open a local instance, click the `Open Local Neurodesk..` button in the Start section of the Welcome Page.

This will show a Jupyterlab interface. There are two options to interact with Neurodesk through this interface:

- By clicking the `NeurodeskApp` icon on the right. This will launch a new window to start a Neurodesk interface.
- By module loading containers on the left bar. You can interact with loaded modules through the command line interface.

![Local](/getting-started/neurodeskapp/connect-to-local.png "Connect to local")

## Connecting to a remote Neurodesk Server

 It can also connect to an existing Neurodesk server instance that is running remotely. In order to connect to a server, click the `Connect to remote Neurodesk server..` button in the Start section of the Welcome Page.

![Server](/getting-started/neurodeskapp/connect-to-server.png "Connect to server")


This will launch a dialog that automatically lists the remote Neurodesk server instances.

Select a server from the list or enter the URL of the Neurodesk application server. If the server requires a token for authentication, make sure to include it as a query parameter of the URL as well (`/lab?token=<token-value>`). After entering a URL hit `Enter` key to connect.

If the `Persist session data` option is checked, then the session information is stored and Neurodesk App will re-use this data on the next launch. If this option is not checked, the session data is automatically deleted at the next launch and servers requiring authentication will prompt for re-login.

You can delete the stored session data manually at any time by using the `Clear History` option in the Privacy tab of Settings dialog.

![Settings](/getting-started/neurodeskapp/settings-privacy.png "Clear History")

## Configuration and data files

Neurodesk App stores data in ~/neurodesktop-storage for Linux and Mac, or C:/neurodesktop-storage for Windows, as default.

## Add a Custom Data Directory

Neurodesk App stores its data in the following locations:

- By default, /home/jovyan/neurodesktop-storage in the app (which is bound with local directory ~/neurodesktop-storage in Unix or C:/neurodesktop-storage in Windows)

- By choice, in the settings window below, select `Additional Directory` on the left side bar, click `Change` button to select the local directory, then click `Apply & restart`. The next time you start the app, the data from the local directory can be found in /home/jovyan/data.

![Additional Directory](/getting-started/neurodeskapp/additional_dir.png "Add data")

## Uninstalling Neurodesk App

### Debian, Ubuntu Linux

```bash
sudo apt-get purge neurodeskapp # remove application
sudo rm /usr/bin/neurodeskapp # remove command symlink
rm -rf ~/.config/neurodeskapp # to remove application cache
```

### Red Hat, Fedora, SUSE Linux

```bash
sudo rpm -e neurodeskapp # remove application
sudo rm /usr/bin/neurodeskapp # remove command symlink
rm -rf ~/.config/neurodeskapp # to remove application cache
```

### Arch-based Linux distributions

```bash
sudo pacman -Rs neurodeskapp-bin
```

### macOS

Find the application installation `NeurodeskApp.app` in Finder (in /Applications or ~/Applications) and move to Trash by using `CMD + Delete`. Clean other application generated files using:

```bash
rm -rf ~/Library/neurodeskapp # to remove application cache
rm -rf ~/Library/Application\ Support/neurodeskapp # to remove user data
```

### Windows

On Windows, go to `Windows Apps & Features` dialog using `Start Menu` -> `Settings` -> `Apps` and uninstall Neurodesk App as shown below.

In order to remove application cache, delete `C:\Users\<username>\AppData\Roaming\neurodeskapp` directory.


---
title: "Neurodesk App"
linkTitle: "Neurodesk App"
description: >
  Neurodesk App is the cross-platform desktop application for Neurodesk
---


![Neurodesk Desktop](/neurodesk-desktop.png 'neurodesk-desktop')

### Minimum System Requirements
1. At least 5GB free space for neurodesktop base image
2. Docker requirements.

## Installing Docker

Neurodesk Desktop requires Docker to be installed on your computer. If you already have Docker installed, you can skip this step.

- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)
- [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
- [Docker Engine for Linux](https://docs.docker.com/engine/install/)

After installation, open a terminal (Linux/macOS) or command prompt (Windows) and run the following command to verify that Docker is working correctly:
`docker --version`

## Installing Neurodesk Desktop

If you have an existing Neurodesk Desktop installation, please uninstall it first by following the [uninstall instructions](#uninstalling-neurodesk-desktop).

- [Debian, Ubuntu Linux Installer](https://github.com/NeuroDesk/neurodesk-desktop/releases/latest/download/Neurodesk-Setup-Debian.deb)
- [Red Hat, Fedora, SUSE Linux Installer](https://github.com/NeuroDesk/neurodesk-desktop/releases/latest/download/Neurodesk-Setup-Fedora.rpm)
- [macOS Intel Installer](https://github.com/NeuroDesk/neurodesk-desktop/releases/latest/download/Neurodesk-Setup-macOS-x64.dmg), [macOS Apple silicon Installer](https://github.com/neurodesk/neurodesk-desktop/releases/latest/download/Neurodesk-Setup-macOS-arm64.dmg)
- [Windows Installer](https://github.com/NeuroDesk/neurodesk-desktop/releases/latest/download/Neurodesk-Setup-Windows.exe)

Additionally, Neurodesk Desktop can be installed on Windows via winget: `winget install neurodeskapp`.

## Launching Neurodesk Desktop

Neurodesk Desktop can be launched from the GUI of your operating system by clicking the application's icon or by using `neurodeskapp` command from the command line.

Neurodesk Desktop sets File Browser's root directory based on the launch method.

- If launched from the application icon on GUI or by using `neurodeskapp` command without any arguments, then the default working directory is set as the root directory. The default working directory is user home directory but it can be customized from the Settings dialog.

- If `neurodeskapp` command is used with a directory path as the argument or with the `--working-dir` argument the directory in the argument is set as the root directory.

## Sessions and Projects

Sessions represent local project launches and connections to existing Neurodesk servers. Each Neurodesk UI window in the app is associated with a separate session and sessions can be restored with the same configuration later on.

Each launch of Neurodesk in a different working directory is a separate project and projects can have their own configuration such as Python environment and UI layout.

### Session start options

You can start a new session by using the links at the Start section of the Welcome Page.

<img src="/start-session.svg" alt="Start session" width=300 />

- `Open Local Neurodesk..` creates a new session in the default working directory.
- `Connect to remote Neurodesk server..` creates a session by connecting to a remote Neurodesk server.

Previously opened sessions are stored as part of application data and they are listed on Welcome Page. Clicking an item in the `Recent sessions` list restores the selected session.


### neurodeskapp command-line launch examples

Run `neurodeskapp` in the terminal.

## Connecting to local Neurodesk

Neurodesk Desktop creates new Neurodesk sessions by launching a locally running Neurodesk server and connecting to it. To open a local instance, click the `Open Local Neurodesk..` button in the Start section of the Welcome Page.

It will show a Jupyterlab interface. There are two options to interact with Neurodesk:

- By clicking the `NeurodeskApp` icon on the right. It launches new window to start Neurodesk interface.
- By module loading containers on the left bar. You can interact with loaded modules in Terminal through command lines.

<img src="/connect-to-local.png" alt="Connect to local" width=650 />

## Connecting to a remote Neurodesk Server

 It can also connect to an existing Neurodesk server instance that is running remotely. In order to connect to a server, click the `Connect to remote Neurodesk server..` button in the Start section of the Welcome Page.

<img src="/connect-to-server.png" alt="Connect to server" width=520 />


This will launch a dialog that automatically lists the remote Neurodesk server instances.

Select a server from the list or enter the URL of the Neurodesk application server. If the server requires a token for authentication, make sure to include it as a query parameter of the URL as well (`/lab?token=<token-value>`). After entering a URL hit `Enter` key to connect.

If the `Persist session data` option is checked, then the session information is stored and Neurodesk Desktop will re-use this data on the next launch. If this option is not checked, the session data is automatically deleted at the next launch and servers requiring authentication will prompt for re-login.

You can delete the stored session data manually at any time by using the `Clear History` option in the Privacy tab of Settings dialog.

<img src="/settings-privacy.png" alt="Clear History" width=700 />

## Configuration and data files

Neurodesk Desktop stores data in ~/neurodesktop-storage as default.

## Uninstalling Neurodesk Desktop

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

### macOS

Find the application installation `NeurodeskApp.app` in Finder (in /Applications or ~/Applications) and move to Trash by using `CMD + Delete`. Clean other application generated files using:

```bash
rm -rf ~/Library/neurodeskapp # to remove application cache
rm -rf ~/Library/Application\ Support/neurodeskapp-desktop # to remove user data
```

### Windows

On Windows, go to `Windows Apps & Features` dialog using `Start Menu` -> `Settings` -> `Apps` and uninstall Neurodesk App as shown below.

In order to remove application cache, delete `C:\Users\<username>\AppData\Roaming\neurodeskapp` directory.


---
title: "Windows"
linkTitle: "Windows"
weight: 2
description: >
  Install neurocommand on Windows
---

## WSL (w/ Ubuntu + LXDE)
For more information on WSL: [https://docs.microsoft.com/en-us/windows/wsl](https://docs.microsoft.com/en-us/windows/wsl)

### Setting up
1. Setup WSL2 using the following instructions _(Ubuntu 18.04 recommended)_  
[https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
_Proceed until a Ubuntu bash shell is available from the Windows Host_  
_Run the remaining commands in the Bash shell_
2. `sudo apt-get install lxde` to install LXDE desktop in WSL
3. Reboot
4. `sudo apt-get install xrdp` to install XRDP in WSL
5. Open `/etc/xrdp/xrdp.ini`
Change `port=3389` to `port=3390` and save
6. Run `echo startlxde > ~/.xsession`

### Running
1. `sudo service xrdp start` to start xrdp server
2. Open Microsoft Remote Desktop Connection in Windows host
3. Connect to `localhost:3390`
4. In the next login page, leave Session as `Xorg`. Enter your WSL username and password and click `OK`
5. This should open an LXDE Linux Desktop environment. Follow [Linux guide](/docs/getting-started/neurocommand/linux) from here on

---
title: "Linux"
linkTitle: "Linux"
weight: 1
description: >
  Install neurocommand on Linux
---

## Requirements:
### Required
- python [https://docs.conda.io/en/latest/miniconda.html#linux-installers](https://docs.conda.io/en/latest/miniconda.html#linux-installers)
- singularity [https://sylabs.io/guides/3.5/user-guide/quick_start.html](https://sylabs.io/guides/3.5/user-guide/quick_start.html)

### Optional
- lmod [https://lmod.readthedocs.io/en/latest/](https://sylabs.io/guides/3.5/user-guide/quick_start.html)

## Inital install
### command line mode - For non-desktop experience (e.g. running on an HPC)  
If running on cli only ... 
- Load singularity and for best performance it should be 3.x e.g. `module load singularity/3.5.0` 
- Run `git clone https://github.com/NeuroDesk/neurodesk.git` to clone the repository - make sure to clone this to a directory with enough storage, write permissions and NOT a symbolic link (to be sure run cd \`pwd -P\`)!
- Run `cd neurodesk` to change into the directory
- Run `bash build.sh --cli` to install in cli mode  
- Run `bash containers.sh` for installing indiviual containers or `bash containers.sh --all` for installing all containers
- Run `module use $PWD/local/containers/modules/` to add the containers to your module search path. Add this to your .bashrc if working.
- Run `ml avail` to see the installed containers at the top of the list (neurodesk containers will take preference over system modules with the same name). If a container is not yet there run `ml --ignore_cache avail`

### For Lxde desktops
If running on an lxde desktop...
Run `bash build.sh --lxde --edit`

### For Mate desktops
Run `bash build.sh --init`  (or `bash build.sh --lxde --edit`)  
lxde/mate: Mate  
installdir: Where all the neurocommand files will be stored (Default: ./local)  
appmenu: The linux menu xml file.  (Usually /etc/xdg/menus/\*\*\*\*-applications.menu)  
appdir: Location for the .desktop files for this linux desktop (Usually /usr/share/applications)  
deskdir: Location for the .directory files for this linux desktop (Typically /usr/share/desktop-directories)  

### For desktop menus:  

`sudo bash install.sh` to install  
_Creates symlinks to menu files in installation dir_  
  
`sudo bash uninstall.sh` to uninstall  
_Removes symlinks_  

## To update

Run `git pull`  
Run `bash build.sh`  
_install.sh does not need to be run again_

### To download all containers
Run `bash containers.sh --all`

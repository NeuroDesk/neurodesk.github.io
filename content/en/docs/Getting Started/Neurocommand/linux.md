---
title: "Linux"
linkTitle: "Linux"
weight: 2
description: >
  Install neurocommand on Linux
---

## Ways of using Neurocommand in Linux:
1) You can use the module files for Neurocontainers directly via CVMFS: https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/
2) or you can install Neurocommand as described here: 

## Requirements:
### Required
- python 3.6+ [https://docs.conda.io/en/latest/miniconda.html#linux-installers](https://docs.conda.io/en/latest/miniconda.html#linux-installers)
- singularity [https://docs.sylabs.io/guides/3.5/user-guide/quick_start.html](https://docs.sylabs.io/guides/3.5/user-guide/quick_start.html)
- git

### Optional
- lmod [https://lmod.readthedocs.io/en/latest/](https://lmod.readthedocs.io/en/latest/)

### command line mode (e.g. running on an HPC or CVL)  
- Load singularity and for best performance it should be 3.x e.g. `module load singularity/3.5.0` 
- Load or install aria2 to optimize the download performance of our containers e.g. `module load aria2c`
- Run `git clone https://github.com/NeuroDesk/neurocommand.git` to clone the repository - make sure to clone this to a directory with enough storage, write permissions and NOT a symbolic link (to be sure run cd \`pwd -P\`)!
- Run `cd neurocommand` to change into the directory
- Run `pip3 install -r neurodesk/requirements.txt --user` to install pre-requisite python packages
- Run `bash build.sh --cli` to install in cli mode  
- Run `bash containers.sh` for installing individual containers or `bash containers.sh --all` for installing all containers
- Run `module use $PWD/local/containers/modules/` to add the containers to your module search path. Add this to your .bashrc if working. When adding to your .bashrc you will need to replace $PWD to point to the correct path, i.e. `module use ~/neurocommand/local/containers/modules/`.  
- Run `ml avail` to see the installed containers at the top of the list (neurodesk containers will take preference over system modules with the same name). - If a container is not yet there run `ml --ignore_cache avail`
- Every time you start a new shell you need to run `module use PathToYourContainers` or add this command to you .bashrc file. 

### GPU support
Some of our containers contain GPU-accelerated applications. Here is an example that runs the GPU accelerated program eddy in FSL:

```shell
module load fsl/6.0.5.1
export neurodesk_singularity_opts='--nv'
eddy_cuda9.1
```


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
Run `bash build.sh`  # this updates the neurocommand but not the modules
_install.sh does not need to be run again_
to update containers go into the neurodesktop directory and run `bash containers.sh` 
Choose the module you want to update for example you want to update mrtrix3/3.0.2 module with the eddy_cuda fix:
`~/neurocommand/local/fetch_containers.sh mrtrix3 3.0.2 20221108 mrview $@`

### To download all containers
Run `bash containers.sh --all`

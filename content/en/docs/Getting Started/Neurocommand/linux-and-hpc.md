---
title: "Linux and HPC"
linkTitle: "Linux and HPC"
weight: 2
aliases:
- /docs/getting-started/neurocommand/linux
- /docs/getting-started/neurocommand/hpc
- /docs/getting-started/neurodesktop/hpc
description: >
  Install neurocommand on Linux, HPC
---


## Ways of using Neurocommand in Linux and HPC:
1) You can use the module files for Neurocontainers directly via CVMFS: https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/
2) or you can install Neurocommand as described here: 

## Requirements:
- python 3.6+ [https://www.anaconda.com/docs/getting-started/miniconda/install#linux-terminal-installer](https://www.anaconda.com/docs/getting-started/miniconda/install#linux-terminal-installer)
- singularity [https://docs.sylabs.io/guides/3.5/user-guide/quick_start.html](https://docs.sylabs.io/guides/3.5/user-guide/quick_start.html)
- git
- lmod [https://lmod.readthedocs.io/en/latest/](https://lmod.readthedocs.io/en/latest/)

{{< alert color="info" >}}
**On HPC**, you will likely have lmod and Singularity already installed - check with your sysadmin
{{< /alert >}}

## Setup Instructions:
### **Install command line** (e.g. running on Linux or HPC)
1. Load singularity
For optimal performance, ensure you are using Singularity version 3.x:
```bash
module load singularity/3.5.0
``` 

2. Load aria2 (Optional)
To speed up container downloads, you can optionally install or load aria2c:
```bash
module load aria2c
```

3. Clone and Set Up the Repository
Clone the repository into a directory with enough storage and ensure you are not using a symbolic link (to be sure run cd \`pwd -P\`). It’s recommended to perform this setup within a Python virtual environment (venv) or a Conda environment:
```bash
git clone https://github.com/NeuroDesk/neurocommand.git 
cd neurocommand 
pip3 install -r neurodesk/requirements.txt --user 
bash build.sh --cli
bash containers.sh
export SINGULARITY_BINDPATH=`pwd -P`
# OR, depending on your installation:
export APPTAINER_BINDPATH=`pwd -P`
```

### **Install Containers**
- If these steps are successful, the help will be displayed
- Install all or only specific containers by following the instructions, e.g.:

1. Search and Install Specific Containers
To search for containers that have "itksnap" in the name:
```bash
bash containers.sh itksnap
```

2. Install a Specific Version
To install a specific version, (e.g., itksnap version 4.0.2 from 20240117):
```bash
./local/fetch_containers.sh itksnap 4.0.2 20240117
```

To install all containers with that name:
```bash
bash containers.sh --itksnap
```

To download all containers (be careful - there are a lot of containers!):
```bash
bash containers.sh --all
```

### **Add your containers to lmod**
- To add each container to the module search path, run the following: 
```bash
module use $PWD/local/containers/modules/
```
- It may be a good idea to add this to your .bashrc if it works. When adding to your .bashrc you will need to replace $PWD to point to the correct path, i.e.
 
```bash
module use ~/neurocommand/local/containers/modules/
```

- It is very important to also set the SINGULARITY_BINDPATH or the APPTAINER_BINDPATH variable in your .bashrc. This variable must contain a comma-separated list of directories you want to access with the Neurodesk tools. 

e.g.:
```bash
export SINGULARITY_BINDPATH=/scratch/,/data/
# OR, depending on your installation:
export APPTAINER_BINDPATH=/scratch/,/data/
#Note: User the correct line depending on your installation. Do not add a directory that does not exist, otherwise the containers will not start!
```

- Run `ml avail` to see the installed containers at the top of the list (neurodesk containers will take preference over system modules with the same name), run:
```bash
module --ignore_cache avail
```
- Every time you start a new shell you need to run `module use PathToYourContainers` or add this command to you .bashrc file. 


{{< alert color="info" >}} **GPU support**

Some of our containers contain GPU-accelerated applications. Here is an example that runs the GPU accelerated program eddy in FSL:

```shell
module load fsl/6.0.5.1
export neurodesk_singularity_opts='--nv'
eddy_cuda9.1
```
{{< /alert >}}


{{< alert color="info" >}} **For Lxde desktops**

`bash build.sh --lxde --edit`
{{< /alert >}}


{{< alert color="info" >}} **For Mate desktops**

Run `bash build.sh --init`  (or `bash build.sh --lxde --edit`)  
lxde/mate: Mate  
installdir: Where all the neurocommand files will be stored (Default: ./local)  
appmenu: The linux menu xml file.  (Usually /etc/xdg/menus/\*\*\*\*-applications.menu)  
appdir: Location for the .desktop files for this linux desktop (Usually /usr/share/applications)  
deskdir: Location for the .directory files for this linux desktop (Typically /usr/share/desktop-directories)  
{{< /alert >}}


{{< alert color="info" >}} **For desktop menus**

`sudo bash install.sh` to install  
_Creates symlinks to menu files in installation dir_  
  
`sudo bash uninstall.sh` to uninstall  
_Removes symlinks_  
{{< /alert >}}


{{< alert color="info" >}} **For user-specific desktop menus in a shared Linux environment**
```
mkdir -p $HOME/.config/menus
mkdir -p $HOME/.local/share/applications
mkdir -p $HOME/.local/share/desktop-directories
ln -sfn /PATH_TO_YOUR_INSTALLATION/neurocommand/local/xfce-applications.menu $HOME/.config/menus
ln -sfn /PATH_TO_YOUR_INSTALLATION/neurocommand/local/neurodesk-applications.menu $HOME/.config/menus
ln -sfn /PATH_TO_YOUR_INSTALLATION/neurocommand/local/applications $HOME/.local/share/applications/neurodesk
ln -sfn /PATH_TO_YOUR_INSTALLATION/neurocommand/local/desktop-directories $HOME/.local/share/desktop-directories/neurodesk
```
{{< /alert >}}


## To update
### 1. Update the Neurocommand Repository

First, ensure your local repository is up to date by pulling the latest changes:
```bash
git pull
```  

Next, rebuild Neurocommand by running:
```bash
bash build.sh
```

### 2. Update Containers

To update the containers, navigate to the neurodesktop directory and run: 
```bash
bash containers.sh
``` 

### 3. Update Specific Modules

Choose the module you want to update for example you want to update mrtrix3/3.0.2 module with the eddy_cuda fix:
```bash
~/neurocommand/local/fetch_containers.sh mrtrix3 3.0.2 20221108 mrview $@
```

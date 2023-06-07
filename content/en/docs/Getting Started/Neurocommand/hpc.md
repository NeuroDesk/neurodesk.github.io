---
title: "HPC"
linkTitle: "HPC"
weight: 4
aliases:
- /docs/getting-started/neurodesktop/hpc
description: >
  Run neurodesktop in a high performance computing environment
---

## Ways of using Neurocommand in Linux:
1) You can use Neurocontainers (i.e., download Singularity containers) directly via CVMFS: https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/
2) or you can install Neurocommand as described here: 

## Requirements:
### Required
- python 3.6+ [https://docs.conda.io/en/latest/miniconda.html#linux-installers](https://docs.conda.io/en/latest/miniconda.html#linux-installers)
- singularity [https://sylabs.io/guides/3.5/user-guide/quick_start.html](https://sylabs.io/guides/3.5/user-guide/quick_start.html)
- git

### Optional
- lmod [https://lmod.readthedocs.io/en/latest/](https://sylabs.io/guides/3.5/user-guide/quick_start.html)

### NB: Your HPC will likely have lmod and Singularity already installed - check with your sysadmin

### Command line mode (e.g. running on an HPC or CVL)  
- Load singularity and for best performance it should be 3.x e.g.
```bash
module load singularity/3.5.0
``` 
- Load or install aria2 to optimize the download performance of our containers (THIS IS OPTIONAL)
```bash
module load aria2c
```
- To install the repository, run the following (make sure to clone this to a directory with enough storage, write permissions and NOT a symbolic link (to be sure run cd \`pwd -P\`)!)
```bash
git clone https://github.com/NeuroDesk/neurocommand.git 
cd neurocommand 
pip3 install -r neurodesk/requirements.txt --user 
bash build.sh --cli
bash containers.sh
export SINGULARITY_BINDPATH=$PWD
export APPTAINER_BINDPATH=$PWD
```
### Containers
- If these steps were successful, all Neurodesk containers will be listed
- Copy and paste the line for your desired container(s)


### Adding your containers to lmod
- To add each container to module search path, run the following: 
```bash
module use $PWD/local/containers/modules/
```
- It may be a good idea to add this to your .bashrc if this is working. When adding to your .bashrc you will need to replace $PWD to point to the correct path, i.e.
 
 ```bash
 module use ~/neurocommand/local/containers/modules/
 ```

- It is very important to set the SINGULARITY_BINDPATH variable in your .bashrc as well. This variable needs to contain all directories you want to access with the Neurodesk tools:

e.g.:
```bash
export SINGULARITY_BINDPATH=/scratch/,/data/
```
 
- to see the installed containers at the top of the list (neurodesk containers will take preference over system modules with the same name), run:
```bash
module load --ignore_cache avail
```

### Starting a new shell
- Every time you start a new shell you will need to run `conda activate neurocommand`. Unless you added it to your .bashrc, you will also need to run `module use PathToYourContainers`. 


## To update
Run 
```bash
git pull
bash build.sh
```  
- this updates the neurocommand but not the modules
- _install.sh does not need to be run again_
to update containers go into the neurodesktop directory and run 
```bash
bash containers.sh
``` 
 Choose the module you want to update for example you want to update mrtrix3/3.0.2 module with the eddy_cuda fix:
```bash
~/neurocommand/local/fetch_containers.sh mrtrix3 3.0.2 20221108 mrview $@
```

### To download all containers
Run 
```bash
bash containers.sh --all
```

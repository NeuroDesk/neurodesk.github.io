---
title: "HPC"
linkTitle: "HPC"
weight: 4
aliases:
- /docs/getting-started/neurodesktop/hpc
description: >
  Run neurodesktop in a high-performance computing environment
---

## Ways of using Neurocommand in Linux:
1) You can use Neurocontainers (i.e., download Singularity containers) directly via CVMFS: https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/
2) or you can install Neurocommand as described here: 

## Requirements:
### Required for installation
- python 3.6+ [https://docs.conda.io/en/latest/miniconda.html#linux-installers](https://docs.conda.io/en/latest/miniconda.html#linux-installers)
- singularity [https://docs.sylabs.io/guides/3.5/user-guide/quick_start.html](https://docs.sylabs.io/guides/3.5/user-guide/quick_start.html)
- git

### Required for use
- singularity [https://docs.sylabs.io/guides/3.5/user-guide/quick_start.html](https://docs.sylabs.io/guides/3.5/user-guide/quick_start.html)

### Optional, but recommended
- lmod [https://lmod.readthedocs.io/en/latest/](https://docs.sylabs.io/guides/3.5/user-guide/quick_start.html)

### NB: Your HPC will likely have lmod and Singularity already installed - check with your sysadmin

### Command line mode (e.g. running on an HPC or CVL)  
- Load singularity and for best performance, it should be 3.x e.g.
```bash
module load singularity/3.5.0
# Note: Some HPCs install singularity/apptainer on the compute nodes directly (e.g. Bunya at UQ), so you don't need to do this step then.
``` 
- Load or install aria2 to optimize the download performance of our containers (THIS IS OPTIONAL)
```bash
module load aria2c
```
- To install the repository, run the following (make sure to clone this to a directory with enough storage, write permissions and NOT a symbolic link (to be sure run cd \`pwd -P\`)!). It is recommended to perform this setup in a Python venv or conda environment:
```bash
git clone https://github.com/NeuroDesk/neurocommand.git 
cd neurocommand 
pip3 install -r neurodesk/requirements.txt --user 
bash build.sh --cli
bash containers.sh
export SINGULARITY_BINDPATH=`pwd -P`
# OR
export APPTAINER_BINDPATH=`pwd -P`
```
### Install Containers
- If these steps are successful, the help will be displayed
- Install all or only specific containers by following the instructions, e.g.:

To search for containers that have "itksnap" in the name:
```bash
bash containers.sh itksnap
```

Then you can copy and paste the specific install command or you can install all containers with that name:
```bash
bash containers.sh --itksnap
```

By default, this will install all available versions of the container. To only install a single version, you can use:
```bash
./local/fetch_containers.sh itksnap 4.0.2 20240117
```

To download all containers (be careful - there are a lot of containers!):
```bash
bash containers.sh --all
```

### Adding your containers to lmod
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
export APPTAINER_BINDPATH=/scratch/,/data/
#Note: User the correct line depending on your installation. Do not add a directory that does not exist, otherwise the containers will not start!
```
 
- to see the installed containers at the top of the list (neurodesk containers will take preference over system modules with the same name), run:
```bash
module --ignore_cache avail
```

### Starting a new shell
- Every time you start a new shell you will need to run `conda activate neurocommand`. Unless you added it to your .bashrc, you will also need to run `module use PathToYourContainers`. 


## To update
Run 
```bash
git pull
bash build.sh --cli
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

or run this to update all containers
```
bash containers.sh --all
```

# Example clusters
## UQ Bunya
<!-- markdown-link-check-disable -->
Neurodesk is already installed at UQ's Bunya supercomputer. To access neurodesk tools you need to be in an interactive job (so either start a virtual desktop via Open On-Demand: https://bunya-ondemand.rcc.uq.edu.au/pun/sys/dashboard) or run:
```
salloc --nodes=1 --ntasks-per-node=1 --cpus-per-task=1 --mem=5G --job-name=TinyInteractive --time=01:00:00 --partition=debug --account=REPLACE_THIS_WITH_YOUR_AccountString srun --export=PATH,TERM,HOME,LANG --pty /bin/bash -l
```
<!-- markdown-link-check-enable -->

Then use the neurodesk modules:
```
module use /sw/local/rocky8/noarch/neuro/software/neurocommand/local/containers/modules/
export APPTAINER_BINDPATH=/scratch,/QRISdata
```

Now you can list all modules (Neurodesk modules are the first ones in the list):
```
ml av
```

Or you can module load any tool you need:
```
ml qsmxt/6.4.1
```

If you want to use GUI applications (fsleyes, afni, suma, ...) you need to overwrite the temporary directory to be /tmp (otherwise you get an error that it cannot connect to the DISPLAY):
```
export TMPDIR=/tmp 
```

If you are missing a new application please contact mail.neurodesk@gmail.com and ask for the neurodesk installation to be updated on Bunya!

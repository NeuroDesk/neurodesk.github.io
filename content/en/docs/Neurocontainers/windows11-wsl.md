---
title: "Windows 11 and Windows Subsystem for Linux"
linkTitle: "Windows 11 & WSL"
description: >
  Use Neurocontainers on Windows 11 with WSL and Wayland Display Server
---

## 1. Install WSL
Follow the instructions to enable Windows Subsystem for Linux 2 in Windows 11: https://docs.microsoft.com/en-us/windows/wsl/install

## 2. Configure CVMFS, Singularity and LMOD (only needs to be done once)

### Install build tools

```bash
sudo apt update
sudo apt install make gcc
```

### Install singularity

```bash
export SINGULARITY_VERSION=3.9.3 VERSION=1.17.2 OS=linux ARCH=amd64
wget -q https://dl.google.com/go/go$VERSION.$OS-$ARCH.tar.gz 
sudo tar -C /usr/local -xzvf go$VERSION.$OS-$ARCH.tar.gz 
rm go$VERSION.$OS-$ARCH.tar.gz 
export GOPATH=${HOME}/go 
export PATH=/usr/local/go/bin:${PATH}:${GOPATH}/bin 
mkdir -p $GOPATH/src/github.com/sylabs 
cd $GOPATH/src/github.com/sylabs 
wget -q https://github.com/sylabs/singularity/releases/download/v${SINGULARITY_VERSION}/singularity-ce-${SINGULARITY_VERSION}.tar.gz 
tar -xzvf singularity-ce-${SINGULARITY_VERSION}.tar.gz 
cd singularity-ce-${SINGULARITY_VERSION} 
./mconfig --prefix=/usr/local/singularity 
make -C builddir 
sudo make -C builddir install 
cd .. 
sudo rm -rf singularity-ce-${SINGULARITY_VERSION} 
sudo rm -rf /usr/local/go $GOPATH
```

### Setup Bindpaths for Singularity (e.g. in .bashrc)

```bash
export PATH="/usr/local/singularity/bin:${PATH}"
export SINGULARITY_BINDPATH='/cvmfs,/mnt,/home'
```

### CVMFS
Follow the instructions here: https://www.neurodesk.org/docs/neurocontainers/cvmfs/

### LMOD
```bash
sudo apt install lmod
```



## 3. Use Neurodesk containers
{{% alert %}}
When restarting WSL the cvmfs service has to be started manually:
```bash
sudo cvmfs_config wsl2_start
```
{{% /alert %}}  
Initialize the neurodesk modules:
```bash
module use /cvmfs/neurodesk.ardc.edu.au/neurodesk-modules/*
```

Example usage of fsleyes:
```bash
ml fsl
fsleyes
```

List the available programs:
```bash
ml av
```

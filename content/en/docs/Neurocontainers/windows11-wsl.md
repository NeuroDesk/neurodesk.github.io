---
title: "Windows 11 and Windows Subsystem for Linux"
linkTitle: "Windows 11 & WSL"
weight: 3
description: >
  Use Neurocontainers on Windows 11 with WSL and Wayland Display Server
---

# 1. Install WSL
Follow the instructions to enable Windows Subsystem for Linux 2 in Windows 11: https://docs.microsoft.com/en-us/windows/wsl/install

# 2. Configure CVFMS, Singularity and LMOD (only needs to be done once)

## Singularity
# Install singularity
<pre class="language-batch command-line" data-prompt=">">
<code>export SINGULARITY_VERSION=3.9.3 VERSION=1.17.2 OS=linux ARCH=amd64
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
make -C builddir install 
cd .. 
rm -rf singularity-ce-${SINGULARITY_VERSION} 
rm -rf /usr/local/go $GOPATH 
ln -s /usr/local/singularity/bin/singularity /bin/ 
</code>
</pre>

## CVMFS
Follow the instructions here: https://neurodesk.github.io/docs/neurocontainers/cvmfs/

## LMOD
<pre class="language-batch command-line" data-prompt=">">
<code>apt install lmod
</code>
</pre>



# 3. Use Neurodesk containers
<pre class="language-batch command-line" data-prompt=">">
<code>module use /cvmfs/neurodesk.ardc.edu.au/neurodesk-modules/*
ml av
ml fsl
fsleyes
</code>
</pre>
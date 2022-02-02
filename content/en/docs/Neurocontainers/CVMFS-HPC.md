---
title: "CVMFS-HPC"
linkTitle: "CVMFS-HPC"
weight: 4
description: >
  Neurodesk Singularity Containers via CVMFS on an HPC
---

Ideally the HPC admins would mount our CVMFS repositories for you, but if you just like to try it out there is a way of using it completely in user-space using Parrot (I tested this on a Centos 7 HPC):

# Install Parrot
Install Parrot in your homedirectory in for example ~/tools:

<pre class="language-batch command-line" data-prompt=">">
<code>cd ~
cd ~/tools
wget http://ccl.cse.nd.edu/software/files/cctools-7.4.2-x86_64-centos7.tar.gz
tar xvf cctools-7.4.2-x86_64-centos7.tar.gz
export PATH=~/tools/cctools-7.4.2-x86_64-centos7.tar.gz-dir/bin:$PATH
export PYTHONPATH=~/tools/cctools-7.4.2-x86_64-centos7.tar.gz-dir/lib/python3.6/site-packages:${PYTHONPATH}
export PARROT_ALLOW_SWITCHING_CVMFS_REPOSITORIES=yes
export HTTP_PROXY='DIRECT;'
export NEURODESK_S1="http://152.67.114.42/cvmfs"
export PARROT_CVMFS_REPO="<default-repositories> neurodesk.ardc.edu.au:url=${NEURODESK_S1}/neurodesk.ardc.edu.au,pubkey=~/tools/neurodesk.ardc.edu.au.pub"

echo "-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwUPEmxDp217SAtZxaBep
Bi2TQcLoh5AJ//HSIz68ypjOGFjwExGlHb95Frhu1SpcH5OASbV+jJ60oEBLi3sD
qA6rGYt9kVi90lWvEjQnhBkPb0uWcp1gNqQAUocybCzHvoiG3fUzAe259CrK09qR
pX8sZhgK3eHlfx4ycyMiIQeg66AHlgVCJ2fKa6fl1vnh6adJEPULmn6vZnevvUke
I6U1VcYTKm5dPMrOlY/fGimKlyWvivzVv1laa5TAR2Dt4CfdQncOz+rkXmWjLjkD
87WMiTgtKybsmMLb2yCGSgLSArlSWhbMA0MaZSzAwE9PJKCCMvTANo5644zc8jBe
NQIDAQAB
-----END PUBLIC KEY-----" | tee ~/tools/neurodesk.ardc.edu.au.pub

parrot_run bash
ls /cvmfs/neurodesk.ardc.edu.au</code>
</pre>

# Install Singularity in user space without suid (suid doesn't work in Parrot!)
you need make and this will depend on your HPC, but something along these lines could work:
<pre class="language-batch command-line" data-prompt=">">
<code>ml automake-1.16.1-gcc-7.3.0-6cdwe6j</code>
</pre>

<pre class="language-batch command-line" data-prompt=">">
<code>
export SINGULARITY_VERSION=3.9.3 VERSION=1.17.2 OS=linux ARCH=amd64
wget -q https://dl.google.com/go/go$VERSION.$OS-$ARCH.tar.gz 
tar -C ~/tools/ -xzvf go$VERSION.$OS-$ARCH.tar.gz 
rm go$VERSION.$OS-$ARCH.tar.gz 
export GOPATH=~/tools/go 
export PATH=~/tools/go/bin:${PATH}:${GOPATH}/bin 
mkdir -p $GOPATH/src/github.com/sylabs 
cd $GOPATH/src/github.com/sylabs 
wget -q https://github.com/sylabs/singularity/releases/download/v${SINGULARITY_VERSION}/singularity-ce-${SINGULARITY_VERSION}.tar.gz 
tar -xzvf singularity-ce-${SINGULARITY_VERSION}.tar.gz 
cd singularity-ce-${SINGULARITY_VERSION} 
./mconfig --without-suid --prefix=~/tools/singularity 
make -C builddir 
make -C builddir install
export PATH=~/tools/singularity/bin:${PATH}</code>
</pre>

# Use containers on CVMFS in the module system
Now you should be able to use our containers in singularity and the module system:
<pre class="language-batch command-line" data-prompt=">">
<code>module use /cvmfs/neurodesk.ardc.edu.au/neurodesk-modules/*
ml fsl
which fslmaths
fslmaths</code>
</pre>
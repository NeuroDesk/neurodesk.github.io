---
title: "CVMFS"
linkTitle: "CVMFS"
description: >
  Neurodesk Singularity Containers on CVMFS
---

# Install CVMFS
First you need to install CVMFS. Follow the official instructions here: https://cvmfs.readthedocs.io/en/stable/cpt-quickstart.html#getting-the-software

one example for Ubuntu in Windows Subsystem for Linux (WSL) could look like this:
<pre class="language-batch command-line" data-prompt=">">
<code>sudo apt-get install lsb-release
wget https://ecsft.cern.ch/dist/cvmfs/cvmfs-release/cvmfs-release-latest_all.deb
sudo dpkg -i cvmfs-release-latest_all.deb
rm -f cvmfs-release-latest_all.deb
sudo apt-get update
sudo apt-get build-essential
sudo apt-get install cvmfs</code>
</pre>

# Configure CVMFS

Once installed create the keys and configure the servers used:
<pre class="language-batch command-line" data-prompt=">">
<code>sudo mkdir -p /etc/cvmfs/keys/ardc.edu.au/


echo "-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwUPEmxDp217SAtZxaBep
Bi2TQcLoh5AJ//HSIz68ypjOGFjwExGlHb95Frhu1SpcH5OASbV+jJ60oEBLi3sD
qA6rGYt9kVi90lWvEjQnhBkPb0uWcp1gNqQAUocybCzHvoiG3fUzAe259CrK09qR
pX8sZhgK3eHlfx4ycyMiIQeg66AHlgVCJ2fKa6fl1vnh6adJEPULmn6vZnevvUke
I6U1VcYTKm5dPMrOlY/fGimKlyWvivzVv1laa5TAR2Dt4CfdQncOz+rkXmWjLjkD
87WMiTgtKybsmMLb2yCGSgLSArlSWhbMA0MaZSzAwE9PJKCCMvTANo5644zc8jBe
NQIDAQAB
-----END PUBLIC KEY-----" | sudo tee /etc/cvmfs/keys/ardc.edu.au/neurodesk.ardc.edu.au.pub

echo "CVMFS_USE_GEOAPI=yes" | sudo tee /etc/cvmfs/config.d/neurodesk.ardc.edu.au.conf

echo 'CVMFS_SERVER_URL="http://cvmfs.neurodesk.org/cvmfs/@fqrn@;http://cvmfs-brisbane.neurodesk.org/cvmfs/@fqrn@;http://cvmfs-sydney.neurodesk.org/cvmfs/@fqrn@;http://cvmfs-frankfurt.neurodesk.org/cvmfs/@fqrn@;http://cvmfs-zurich.neurodesk.org/cvmfs/@fqrn@;http://cvmfs-toronto.neurodesk.org/cvmfs/@fqrn@;http://cvmfs-ashburn.neurodesk.org/cvmfs/@fqrn@;http://cvmfs.neurodesk.org/cvmfs/@fqrn@"' | sudo tee -a /etc/cvmfs/config.d/neurodesk.ardc.edu.au.conf 

echo 'CVMFS_KEYS_DIR="/etc/cvmfs/keys/ardc.edu.au/"' | sudo tee -a /etc/cvmfs/config.d/neurodesk.ardc.edu.au.conf

echo "CVMFS_HTTP_PROXY=DIRECT" | sudo tee  /etc/cvmfs/default.local
echo "CVMFS_QUOTA_LIMIT=5000" | sudo tee -a  /etc/cvmfs/default.local

sudo cvmfs_config setup

# this is only necessary for WSL:
sudo cvmfs_config wsl2_start

sudo cvmfs_config chksetup

ls /cvmfs/neurodesk.ardc.edu.au

sudo cvmfs_talk -i neurodesk.ardc.edu.au host probe
sudo cvmfs_talk -i neurodesk.ardc.edu.au host info

cvmfs_config stat -v neurodesk.ardc.edu.au</code>
</pre>

# For Ubuntu 22.04 users
If configuring CVMFS returns the following error:
<pre class="language-batch command-line" data-prompt=">">
<code>Error: failed to load cvmfs library, tried: './libcvmfs_fuse3_stub.so' '/usr/lib/libcvmfs_fuse3_stub.so' '/usr/lib64/libcvmfs_fuse3_stub.so' './libcvmfs_fuse_stub.so' '/usr/lib/libcvmfs_fuse_stub.so' '/usr/lib64/libcvmfs_fuse_stub.so'
./libcvmfs_fuse3_stub.so: cannot open shared object file: No such file or directory
/usr/lib/libcvmfs_fuse3_stub.so: cannot open shared object file: No such file or directory
/usr/lib64/libcvmfs_fuse3_stub.so: cannot open shared object file: No such file or directory
./libcvmfs_fuse_stub.so: cannot open shared object file: No such file or directory
libcrypto.so.1.1: cannot open shared object file: No such file or directory
/usr/lib64/libcvmfs_fuse_stub.so: cannot open shared object file: No such file or directory


Failed to read CernVM-FS configuration</code>
</pre>

A temporary workaround is:

<pre class="language-batch command-line" data-prompt=">">
<code>wget https://mirror.umd.edu/ubuntu/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2.15_amd64.deb
dpkg -i libssl1.1_1.1.1f-1ubuntu2.15_amd64.deb</code>
</pre>

# Install singularity/apptainer 
e.g. for Ubuntu/Debian:
<pre class="language-batch command-line" data-prompt=">">
<code>export VERSION=1.18.3 OS=linux ARCH=amd64 && \
    wget https://dl.google.com/go/go$VERSION.$OS-$ARCH.tar.gz && \
    sudo tar -C /usr/local -xzvf go$VERSION.$OS-$ARCH.tar.gz && \
    rm go$VERSION.$OS-$ARCH.tar.gz

echo 'export GOPATH=${HOME}/go' >> ~/.bashrc && \
    echo 'export PATH=/usr/local/go/bin:${PATH}:${GOPATH}/bin' >> ~/.bashrc && \
    source ~/.bashrc

go get -d github.com/sylabs/singularity

export VERSION=v3.10.0 # or another tag or branch if you like && \
    cd $GOPATH/src/github.com/sylabs/singularity && \
    git fetch && \
    git checkout $VERSION # omit this command to install the latest bleeding edge code from master

export VERSION=3.10.0 && # adjust this as necessary \
    mkdir -p $GOPATH/src/github.com/sylabs && \
    cd $GOPATH/src/github.com/sylabs && \
    wget https://github.com/sylabs/singularity/releases/download/v${VERSION}/singularity-ce-${VERSION}.tar.gz && \
    tar -xzf singularity-ce-${VERSION}.tar.gz && \789
    cd ./singularity-ce-${VERSION} && \
    ./mconfig --without-seccomp --without-conmon

./mconfig --without-seccomp --without-conmon && \
    make -C ./builddir && \
    sudo make -C ./builddir install

export PATH="/usr/local/singularity/bin:${PATH}"</code>
</pre>

# Use of Neurodesk CVMFS containers
The containers are now available in /cvmfs/neurodesk.ardc.edu.au/containers/ and can be started with:
<pre class="language-batch command-line" data-prompt=">">
<code>singularity shell /cvmfs/neurodesk.ardc.edu.au/containers/itksnap_3.8.0_20201208/itksnap_3.8.0_20201208.simg</code>
</pre>

make sure that SINGULARITY_BINDPATH include the directories you want to work with:
<pre class="language-batch command-line" data-prompt=">">
<code>export SINGULARITY_BINDPATH='/cvmfs,/mnt,/home'</code>
</pre>

## For WSL users
The homedirectory might not be supported. Avoid mounting it with
<pre class="language-batch command-line" data-prompt=">">
<code>singularity shell --no-home /cvmfs/neurodesk.ardc.edu.au/containers/itksnap_3.8.0_20201208/itksnap_3.8.0_20201208.simg</code>
</pre>


or configure permanently:
<pre class="language-batch command-line" data-prompt=">">
<code>sudo vi /etc/singularity/singularity.conf</code>
</pre>

set
<pre class="language-batch command-line" data-prompt=">">
<code>mount home = no</code>
</pre>

# Install module system
<pre class="language-batch command-line" data-prompt=">">
<code>sudo yum install lmod</code>
</pre>
or
<pre class="language-batch command-line" data-prompt=">">
<code>sudo apt install lmod</code>
</pre>

# Use of containers in the module system
## Configuration for module system
Create a the new file `/usr/share/module.sh` with the content:
<pre class="language-batch command-line" data-prompt=">">
<code># system-wide profile.modules                                          #
# Initialize modules for all sh-derivative shells                      #
#----------------------------------------------------------------------#
trap "" 1 2 3

case "$0" in
    -bash|bash|*/bash) . /usr/share/lmod/6.6/init/bash ;;
       -ksh|ksh|*/ksh) . /usr/share/lmod/6.6/init/ksh ;;
       -zsh|zsh|*/zsh) . /usr/share/lmod/6.6/init/zsh ;;
          -sh|sh|*/sh) . /usr/share/lmod/6.6/init/sh ;;
                    *) . /usr/share/lmod/6.6/init/sh ;;  # default for scripts
esac

trap - 1 2 3</code>
</pre>

## Make the module system usable in the shell
Add the following lines to your `~/.bashrc` file:
<pre class="language-batch command-line" data-prompt=">">
<code>if [ -f '/usr/share/module.sh' ]; then source /usr/share/module.sh; fi

if [ -d /cvmfs/neurodesk.ardc.edu.au/neurodesk-modules ]; then
        # export MODULEPATH="/cvmfs/neurodesk.ardc.edu.au/neurodesk-modules"
        module use /cvmfs/neurodesk.ardc.edu.au/neurodesk-modules/*
else
        export MODULEPATH="/neurodesktop-storage/containers/modules"              
        module use $MODULEPATH
        export CVMFS_DISABLE=true
fi

if [ -f '/usr/share/module.sh' ]; then
        echo 'Run "ml av" to see which tools are available - use "ml <tool>" to use them in this shell.'
        if [ -v "$CVMFS_DISABLE" ]; then
                if [ ! -d $MODULEPATH ]; then
                        echo 'Neurodesk tools not yet downloaded. Choose tools to install from the Application menu.'
                fi
        fi
fi</code>
</pre>
Restart the current shell or run
<pre class="language-batch command-line" data-prompt=">">
<code>source ~/.bashrc</code>
</pre>

# Use of containers in the module system
<pre class="language-batch command-line" data-prompt=">">
<code>export SINGULARITY_BINDPATH='/cvmfs,/mnt,/home'
module use /cvmfs/neurodesk.ardc.edu.au/neurodesk-modules/*
ml fsl
fslmaths</code>
</pre>


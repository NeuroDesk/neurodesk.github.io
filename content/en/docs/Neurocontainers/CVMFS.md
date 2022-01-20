---
title: "CVMFS"
linkTitle: "CVMFS"
weight: 4
description: >
  Neurodesk Singularity Containers on CVMFS
---

# Install CVMFS
First you need to install CVMFS. Follow the official instructions here: https://cvmfs.readthedocs.io/en/stable/cpt-quickstart.html#getting-the-software

one example for Windows Subsystem for Linux (WSL) could look like this:
<pre class="language-batch command-line" data-prompt=">">
<code>sudo apt-get install lsb-release
wget https://ecsft.cern.ch/dist/cvmfs/cvmfs-release/cvmfs-release-latest_all.deb
sudo dpkg -i cvmfs-release-latest_all.deb
rm -f cvmfs-release-latest_all.deb
sudo apt-get update
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

echo 'CVMFS_SERVER_URL="http://203.101.231.144/cvmfs/@fqrn@;http://150.136.239.221/cvmfs/@fqrn@;http://132.145.96.34/cvmfs/@fqrn@;http://140.238.170.185/cvmfs/@fqrn@;http://130.61.74.69/cvmfs/@fqrn@;http://152.67.114.42/cvmfs/@fqrn@"' | sudo tee -a /etc/cvmfs/config.d/neurodesk.ardc.edu.au.conf 

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


# use of Neurodesk CVMFS containers
The containers are now available in /cvmfs/neurodesk.ardc.edu.au/containers/ and can be started with:
<pre class="language-batch command-line" data-prompt=">">
<code>singularity shell /cvmfs/neurodesk.ardc.edu.au/containers/itksnap_3.8.0_20201208/itksnap_3.8.0_20201208.simg</code>
</pre>

make sure that SINGULARITY_BINDPATH include the directories you want to work with:
<pre class="language-batch command-line" data-prompt=">">
<code>export SINGULARITY_BINDPATH='/cvmfs,/mnt,/home'</code>
</pre>

# WSL doesn't support homedirectory - so don't mount this
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

# use of containers in the module system:
<pre class="language-batch command-line" data-prompt=">">
<code>export SINGULARITY_BINDPATH='/cvmfs,/mnt,/home'
module use /cvmfs/neurodesk.ardc.edu.au/neurodesk-modules/*
ml fsl
fslmaths</code>
</pre>


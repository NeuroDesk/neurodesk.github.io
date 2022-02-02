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
echo "-----BEGIN PUBLIC KEY-----" | tee ~/tools/neurodesk.ardc.edu.au.pub 
echo "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwUPEmxDp217SAtZxaBep" | tee -a ~/tools/neurodesk.ardc.edu.au.pub
echo "Bi2TQcLoh5AJ//HSIz68ypjOGFjwExGlHb95Frhu1SpcH5OASbV+jJ60oEBLi3sD" | tee -a ~/tools/neurodesk.ardc.edu.au.pub
echo "qA6rGYt9kVi90lWvEjQnhBkPb0uWcp1gNqQAUocybCzHvoiG3fUzAe259CrK09qR" | tee -a ~/tools/neurodesk.ardc.edu.au.pub
echo "pX8sZhgK3eHlfx4ycyMiIQeg66AHlgVCJ2fKa6fl1vnh6adJEPULmn6vZnevvUke" | tee -a ~/tools/neurodesk.ardc.edu.au.pub
echo "I6U1VcYTKm5dPMrOlY/fGimKlyWvivzVv1laa5TAR2Dt4CfdQncOz+rkXmWjLjkD" | tee -a ~/tools/neurodesk.ardc.edu.au.pub
echo "87WMiTgtKybsmMLb2yCGSgLSArlSWhbMA0MaZSzAwE9PJKCCMvTANo5644zc8jBe" | tee -a ~/tools/neurodesk.ardc.edu.au.pub
echo "NQIDAQAB" | tee -a ~/tools/neurodesk.ardc.edu.au.pub
echo "-----END PUBLIC KEY-----" | tee -a ~/tools/neurodesk.ardc.edu.au.pub
parrot_run bash
ls ls /cvmfs/neurodesk.ardc.edu.au</code>
</pre>
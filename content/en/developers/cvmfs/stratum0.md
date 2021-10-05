---
title: "Setup Stratum 0 server"
linkTitle: "Stratum 0"
weight: 1
description: >
  Host a Stratum 0 server
---


## Setup a Stratum 0 server:
### Setup Storage 
(would object storage bet better -> see comment below)
```bash
lsblk -l
sudo mkfs.ext4 /dev/vdb
sudo mkdir /storage
sudo mount /dev/vdb /storage/ -t auto
sudo chown ec2-user /storage/
sudo chmod a+rwx /storage/

sudo vi /etc/fstab
/dev/vdb  /storage    auto    defaults,nofail   0  2
```

### Setup server
```bash
sudo yum install vim htop gcc git screen
sudo timedatectl set-timezone Australia/Brisbane

sudo yum install -y https://ecsft.cern.ch/dist/cvmfs/cvmfs-release/cvmfs-release-latest.noarch.rpm
sudo yum install -y cvmfs cvmfs-server

sudo systemctl enable httpd
sudo systemctl restart httpd

# sudo systemctl stop firewalld 

# restore keys:
sudo mkdir /etc/cvmfs/keys/incoming
sudo chmod a+rwx /etc/cvmfs/keys/incoming
 cd connections/cvmfs_keys/
scp neuro* ec2-user@203.101.226.164:/etc/cvmfs/keys/incoming
sudo mv  /etc/cvmfs/keys/incoming/* /etc/cvmfs/keys/

#backup keys: 
#mkdir cvmfs_keys
#scp opc@158.101.127.61:/etc/cvmfs/keys/neuro* .

sudo cvmfs_server mkfs -o $USER neurodesk.ardc.edu.au

cd /storage
sudo mkdir -p cvmfs-storage/srv/
cd /srv/
sudo mv cvmfs/ /storage/cvmfs-storage/srv/
sudo ln -s /storage/cvmfs-storage/srv/cvmfs/

cd /var/spool
sudo mkdir /storage/spool
sudo mv cvmfs/ /storage/spool/
sudo ln -s  /storage/spool/cvmfs .


cvmfs_server transaction neurodesk.ardc.edu.au

cvmfs_server publish neurodesk.ardc.edu.au

sudo vi /etc/cron.d/cvmfs_resign
0 11 * * 1 root /usr/bin/cvmfs_server resign neurodesk.ardc.edu.au

cat /etc/cvmfs/keys/neurodesk.ardc.edu.au.pub
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuV9JBs9uXBR83qUs7AiE
nSQfvh6VCdNigVzOfRMol5cXsYq3cFy/Vn1Nt+7SGpDTQArQieZo4eWC9ww2oLq0
vY1pWyAms3Y4i+IUmMbwNifDU4GQ1KN9u4zl9Peun2YQCLE7mjC0ZLQtLM7Q0Z8h
NwP8jRJTN+u8mRKzkyxfSMLscVMKhm2pAwnT1zB9i3bzVV+FSnidXq8rnnzNHMgv
tfqx1h0gVyTeodToeFeGG5vq69wGZlwEwBJWVRGzzr+a8dWNBFMJ1HxamrBEBW4P
AxOKGHmQHTGbo+tdV/K6ZxZ2Ry+PVedNmbON/EPaGlI8Vd0fascACfByqqeUEhAB
dQIDAQAB
-----END PUBLIC KEY-----
```


## Next iteration of this:
### use object storage?
- current implementation uses block storage, but this makes increasing the volume size a bit more work
- we coulddn't get object storage to work on Oracle as it assumes AWS S3

### Optimize settings for repositories for Container Images

from the CVMFS documentation:
Repositories containing Linux container image contents (that is: container root file systems) should use overlayfs as a union file system and have the following configuration:
	
	CVMFS_INCLUDE_XATTRS=true
	CVMFS_VIRTUAL_DIR=true

Extended attributes of files, such as file capabilities and SElinux attributes, are recorded. And previous file system revisions can be accessed from the clients.

## Currently not used
We tested the DUCC tool in the beginning, but it was leading to too many docker pulls and we therefore replaced it with our own script: https://github.com/NeuroDesk/neurocommand/blob/main/cvmfs/sync_containers_to_cvmfs.sh

This is the old DUCC setup
```bash
sudo yum install cvmfs-ducc.x86_64
sudo -i
dnf install -y yum-utils 
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
dnf install docker-ce docker-ce-cli containerd.io
systemctl enable docker
systemctl start docker
docker version
docker info

# leave root mode

sudo groupadd docker
sudo usermod -aG docker $USER
sudo chown root:docker /var/run/docker.sock
newgrp docker


vi convert_appsjson_to_wishlist.sh
export DUCC_DOCKER_REGISTRY_PASS=configure_secret_password_here_and_dont_push_to_github
cd neurodesk
git pull
./gen_cvmfs_wishlist.sh
cvmfs_ducc convert recipe_neurodesk_auto.yaml
cd ..


 chmod +x convert_appsjson_to_wishlist.sh

git clone https://github.com/NeuroDesk/neurodesk/

# setup cron job
sudo vi /etc/cron.d/cvmfs_dockerpull
*/5 * * * * opc cd ~ && bash /home/opc/convert_appsjson_to_wishlist.sh



#vi recipe.yaml

##version: 1
#user: vnmd
#cvmfs_repo: neurodesk.ardc.edu.au
#output_format: '$(scheme)://$(registry)/vnmd/thin_$(image)'
#input:
#- 'https://registry.hub.docker.com/vnmd/tgvqsm_1.0.0:20210119'
#- 'https://registry.hub.docker.com/vnmd/itksnap_3.8.0:20201208'


#cvmfs_ducc convert recipe_neurodesk.yaml
#cvmfs_ducc convert recipe_unpacked.yaml


```
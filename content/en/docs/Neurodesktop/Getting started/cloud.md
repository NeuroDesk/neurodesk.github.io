---
title: "Cloud"
linkTitle: "Cloud"
weight: 5
description: >
  Run neurodesktop using Oracle or Azure cloud computing
---

## Minimum System Requirements
1. At least 3GB free space for neurodesktop base image
2. Docker requirements. Details found under https://docs.docker.com/get-docker/

## Quickstart
1. Open an SSH connection to your cloud instance with port forwarding
```shell
ssh -L 8080:127.0.0.1:8080 opc@133.71.33.71
```

2. Install Docker from here: https://docs.docker.com/get-docker/ 

one example to install docker in a yum-based distribution could look like this:
```shell
sudo dnf install -y yum-utils 
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io
sudo systemctl enable docker
sudo systemctl start docker
sudo docker version
sudo docker info
sudo groupadd docker
sudo usermod -aG docker $USER
sudo chown root:docker /var/run/docker.sock
newgrp docker
```

3. Create a local folder where the downloaded applications will be stored, e.g. ~/neurodesktop-storage

4. Open a terminal, and type the folowing command to automatically download the neurodesktop container and run it (Mac, Windows, Linux commands listed below) 

```shell
sudo docker run \
  --shm-size=1gb -it --privileged --name neurodesktop \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)" \
  -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} \
  vnmd/neurodesktop:{{< params/neurodesktop/version >}}
```
<!-- neurodesktop version found in neurodesk.github.io/data/neurodesktop.toml -->

(notice: if you get errors in neurodesktop then check if the ~/neurodesktop-storage directory is writable to all users, otherwise run `chmod a+rwx ~/neurodesktop-storage`)

5. Once neurodesktop is downloaded i.e. `guacd[77]: INFO:        Listening on host 127.0.0.1, port 4822` is displayed in terminal, open a browser and go to:
```
http://localhost:8080/#/?username=user&password=password
```
or open a VNC Client and connect to port 5901 (for this -p 5901:5901 has to be added to the docker call)

6. neurodesktop is ready to use!
- User is `user`
- Password is `password`

## Stopping neurodesktop:
When done processing your data it is important to stop and remove the container - otherwise the next start or container update will give an error ("... The container name "/neurodesktop" is already in use...")
1. Click on the terminal from which you ran neurodesktop

2. Press control-C

3. Type:
```shell
sudo docker stop neurodesktop
```shell
4. Type:
```
sudo docker rm neurodesktop
```


## Cloud-provider specific Tutorials 
| Cloud provider | link                                                                                    |
|----------------|-----------------------------------------------------------------------------------------|
| Oracle         | https://mri.sbollmann.net/index.php/2020/12/08/run-neurodesk-on-oracle-cloud-free-tier/ |
| Azure          | https://henryjburg.medium.com/neurodesk-running-on-azure-3e38c590a152                   |

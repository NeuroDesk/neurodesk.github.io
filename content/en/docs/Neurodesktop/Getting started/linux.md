---
title: "Linux"
linkTitle: "Linux"
weight: 1
description: >
  Installation
---

## Minimum System Requirements
1. At least 3GB free space for neuromachine base image
2. Docker requirements. Details found under https://docs.docker.com/get-docker/

## Quickstart
1. Install Docker from here: https://docs.docker.com/get-docker/ 

2. Create a local folder where the downloaded applications will be stored, e.g. ~/neurodesktop

3. Open a terminal, and type the folowing command to automatically download the neuromachine container and run it (Mac, Windows, Linux commands listed below) 

```
sudo docker run --shm-size=1gb -it --privileged --name neuromachine -v ~/neurodesktop:/neurodesktop -e USER=user -p 8080:8080 vnmd/neuromachine:latest
```
(notice: if you get errors in neuromachine then check if the ~/neurodesktop directory is writable to all users, otherwise run `chmod a+rwx ~/neurodesktop`)

4. Once neuromachine is downloaded i.e. `guacd[77]: INFO:        Listening on host 127.0.0.1, port 4822` is displayed in terminal, open a browser and go to:
```
http://localhost:8080/#/?username=user&password=password
```
or open a VNC Client and connect to port 5901 (for this -p 5901:5901 has to be added to the docker call)

5. neuromachine is ready to use!
- User is `user`
- Password is `password`

## Stopping neuromachine:
When done processing your data it is important to stop and remove the container - otherwise the next start or container update will give an error ("... The container name "/neuromachine" is already in use...")
1. Click on the terminal from which you ran neuromachine

2. Press control-C

3. Type:
```
docker stop neuromachine
```
4. Type:
```
docker rm neuromachine
```

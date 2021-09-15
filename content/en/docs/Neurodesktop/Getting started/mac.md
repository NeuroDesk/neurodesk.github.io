---
title: "MacOS"
linkTitle: "MacOS"
weight: 2
description: >
  Install neurodesktop on MacOS
---

## Minimum System Requirements
1. At least 3GB free space for neuromachine base image
2. Docker requirements. Details found under https://docs.docker.com/get-docker/

## Quickstart
1. Install Docker from here: https://docs.docker.com/get-docker/ 

2. Create a local folder where the downloaded applications will be stored, e.g. ~/neurodesktop 

3. Open a terminal, and type the folowing command to automatically download the neurodesktop container and run it

```
docker run --shm-size=1gb -it --privileged --name neuromachine -v ~/neurodesktop:/neurodesktop -e USER=user -p 8080:8080 vnmd/neuromachine:latest
```
(notice: There is a bug in docker 3.3.0 for Mac that makes this command not run correctly and there will be no application menu when you start the desktop. Update your docker version when you see this!)

if you get errors in neurodesktop then check if the ~/neurodesktop directory is writable to all users, otherwise run `chmod a+rwx ~/neurodesktop`

4. Once neurodesktop is downloaded i.e. `guacd[77]: INFO:        Listening on host 127.0.0.1, port 4822` is displayed in terminal, open a browser and go to:
```
http://localhost:8080/#/?username=user&password=password
```
or open a VNC Client and connect to port 5901 (for this -p 5901:5901 has to be added to the docker call)

5. neurodesktop is ready to use!
- User is `user`
- Password is `password`

## Stopping neurodesktop:
When done processing your data it is important to stop and remove the container - otherwise the next start or container update will give an error ("... The container name "/neurodesktop" is already in use...")
1. Click on the terminal from which you ran neurodesktop

2. Press control-C

3. Type:
```
docker stop neuromachine
```
4. Type:
```
docker rm neuromachine
```

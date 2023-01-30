---
title: "MacOS"
linkTitle: "MacOS"
weight: 2
description: >
  Install neurodesktop on MacOS
---

### Minimum System Requirements
1. At least 3GB free space for neurodesktop base image
2. An Intel Mac. M1/ARM Macs are not yet supported.
3. Docker requirements. Details found under https://docs.docker.com/get-docker/

## Quickstart
### 1. Install Docker
Install Docker from here: https://docs.docker.com/get-docker/ 

{{< alert color="warning" >}}
Docker for MacOS by default runs with 2GB Memory. For actual workloads, 4GB Memory minimum for docker is highly recommended
{{< /alert >}}

1. Open the Docker Desktop and Navigate to the Resources tab. Instructions found at https://docs.docker.com/desktop/mac/#resources

2. Increase the Memory slider from 2.00 GB to 4.00 GB (or greater)
3. Increase Swap slider from 1GB to 2GB (or greater)

### 2. Run Neurodesktop
Create a local folder where the downloaded applications will be stored, e.g. ~/neurodesktop-storage 

1. Open a terminal, and type the folowing command to automatically download the neurodesktop container and run it

```shell
docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} vnmd/neurodesktop:{{< params/neurodesktop/version >}}
```
<!-- neurodesktop version found in neurodesk.github.io/data/neurodesktop.toml -->

{{< alert color="warning" >}}
There is a bug in docker 3.3.0 for Mac that makes this command not run correctly and there will be no application menu when you start the desktop. Update your docker version when you see this!
{{< /alert >}}

if you get errors in neurodesktop then check if the ~/neurodesktop-storage directory is writable to all users, otherwise run `chmod a+rwx ~/neurodesktop-storage`

2. Once neurodesktop is downloaded i.e. `guacd[77]: INFO:        Listening on host 127.0.0.1, port 4822` is displayed in terminal, leave the terminal open and neurodesktop running (i.e., do not press CTRL+C)

3. Open a browser and go to:
```
http://localhost:8080/#/?username=user&password=password
```
{{< alert color="warning" >}}
We recommend to use Chrome over Firefox as it has an option to hide the Toolbar in full screen mode (go to the menu bar, click on View, and uncheck "Always Show Toolbar in Full Screen"). This allows for Neurodesktop to truly utilise the whole of your screen.
{{< /alert >}}

3. Press on "Desktop Auto-Resolution" under "ALL CONNECTIONS"

4. If it is the first time you use Neruodesktop, wait until the desktop appears (it may take a few seconds). Otherwise, it should appear instantaneously.

5. Neurodesk is ready to use! Click "What's next?" on the left of this page for further instructions.     

{{< alert color="info" >}}
The browser can be closed anytime, and Neurodesktop will continue to run in the background. To reconnect to Neurodesktop, simply start over from step 3 above.
{{< /alert >}}

 
## Deleting neurodesktop:
When done processing your data it is important to stop and remove the container - otherwise the next start or container update will give an error ("... The container name "/neurodesktop" is already in use...")

{{< alert title="Note" color="warning" >}}
Notice that any data that were saved outside of /neurodesktop-storage would be lost. Please make sure to move all your data to that folder before deleting neurodesktop.
{{< /alert >}}

1. Click on the terminal from which you ran neurodesktop

2. Press control-C

3. Type:
```
docker stop neurodesktop
```
4. Type:
```
docker rm neurodesktop
```

## Using an RDP Client
Startup Neurodesktop using the following command:

```shell
docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -p 3390:3389 -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} vnmd/neurodesktop:{{< params/neurodesktop/version >}}
```
{{< alert color="info" >}}
If you want to connect via RDP using a different port, replace 3390 in the previous and next step with your port
{{< /alert >}}

Open your RDP client and connect to Computer `localhost:3390`

Use the following details to login if prompted
```
username: user
password: password
```
## Using VNC

To enable VNC and disable RDP, startup Neurodesktop using the following command:

```shell
docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -e VNC_ENABLE=true -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} vnmd/neurodesktop:{{< params/neurodesktop/version >}}
```

{{< alert color="info" >}}
VNC allows for multiple desktop connections to same instance
{{< /alert >}}
{{< alert color="warning" >}}
VNC option for Neurodesktop on the browser does not support auto-resolution 
{{< /alert >}}

### Using a VNC Client

Startup Neurodesktop using the following command:

```shell
docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -e VNC_ENABLE=true -p 5901:5901 -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} vnmd/neurodesktop:{{< params/neurodesktop/version >}}
```

Open a VNC Client and connect to port 5901

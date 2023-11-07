---
title: "MacOS"
linkTitle: "MacOS"
weight: 2
aliases:
- /docs/neurodesktop/getting-started/mac
description: >
  Install neurodesktop on MacOS
---

## Quickstart
### 1. Install Docker
Install Docker from here: https://docs.docker.com/get-docker/ 

{{< alert color="warning" >}}
Docker for MacOS by default runs with 2GB Memory. For actual workloads, 4GB Memory minimum for docker is highly recommended. You need to adjust this: 
1. Open the Docker Desktop and Navigate to the Settings. Then navigate to the "Resources" section. 
2. Increase the Memory slider from 2.00 GB to 4.00 GB (or greater)
3. Increase Swap slider from 1GB to 2GB (or greater)
{{< /alert >}}

{{< alert color="warning" >}}
For best performance on ARM Apple Silicon Hardware (M1/M2/M3) you need to enable Rosetta support in Docker:
0. If you are running Docker newer than 4.25.0 (126437) then you don't need to do anything as it's enabled by default already.
1. For Docker versions older than 4.25.0 (126437): Open the Docker Desktop and Navigate to the Settings. Then navigate to the "Features in development" section. 
2. Activate "Use Rosetta for x86/amd64 emulation on Apple Silicon
3. Click "Apply & Restart"
{{< /alert >}}

### 2. Run Neurodesktop
Use one of the following options to run Neurodesktop:

#### Option 1 (Recommended): Neurodesk-App
Instructions on installing and using the app: https://www.neurodesk.org/docs/getting-started/neurodesktop/neurodeskapp/

#### Option 2 (Advanced): Using Terminal
Create a local folder where the downloaded applications will be stored, e.g. ~/neurodesktop-storage 

1. Open a terminal, and type the following command to automatically download the neurodesktop container and run it

1.a) with a persistent home directory:
```shell
docker volume create neurodesk-home &&
docker run \
--shm-size=1gb -it --privileged --user=root --name neurodesktop \
-v ~/neurodesktop-storage:/neurodesktop-storage \
--mount source=neurodesk-home,target=/home/jovyan \
-e NB_UID="$(id -u)" -e NB_GID="$(id -g)" \
-p 8888:8888 -e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}}
```

1.b) without a persistent home directory:
```shell
docker run \
--shm-size=1gb -it --privileged --user=root --name neurodesktop \
-v ~/neurodesktop-storage:/neurodesktop-storage \
-e NB_UID="$(id -u)" -e NB_GID="$(id -g)" \
-p 8888:8888 -e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}}
```

<!-- neurodesktop version found in neurodesk.github.io/data/neurodesktop.toml -->

{{< alert color="warning" >}}
There is a bug in docker 3.3.0 for Mac that makes this command not run correctly so that there is no application menu when the desktop is started. Update your docker version if you see this!
{{< /alert >}}

If you get errors in neurodesktop then check if the ~/neurodesktop-storage directory is writable for all users. If it is not, run `chmod a+rwx ~/neurodesktop-storage`

2. Once neurodesktop is downloaded, leave the terminal open and check which server neurodesktop running on (Avoid pressing CTRL+C).

![image](/static/docs/getting-started/neurodeskapp/terminal_token.png)

3. To access neurodesktop, open your web browser and navigate to one of the URLs shown in your terminal (e.g. `http://127.0.0.1:8888/lab?token=your_unique_token`).

{{< alert color="warning" >}}
We recommend using Chrome over Firefox as it has an option to hide the Toolbar in full screen mode (go to the menu bar, click on View, and uncheck "Always Show Toolbar in Full Screen"). This allows for Neurodesktop to fully utilise the whole of your screen.
{{< /alert >}}

3. If prompted, press on "Desktop Auto-Resolution" under "ALL CONNECTIONS"

4. If it is the first time you use Neurodesktop, wait until the desktop appears (it may take a few seconds). Otherwise, it should appear instantaneously.

5. Neurodesk is ready to use! See the tutorials page for advice on how to use Neurodesk.     

{{< alert color="info" >}}
The browser can be closed anytime, and Neurodesktop will continue to run in the background. To reconnect to Neurodesktop, simply start over from step 3 above.
{{< /alert >}}

{{< alert color="info">}}
If you are using conda environments and you are installing packages or even new kernels, make sure to read this: https://www.neurodesk.org/tutorials-examples/tutorials/programming/conda/
{{< /alert >}}

## Deleting neurodesktop:
When done processing your data it is important to stop and remove the container - otherwise the next start or container update will give an error ("... The container name "/neurodesktop" is already in use...")

{{< alert title="Note" color="warning" >}}
Note that any data that were saved outside of /neurodesktop-storage would be lost. Please make sure to move all your data to that folder before deleting neurodesktop.
{{< /alert >}}

1. Click on the terminal from which you ran neurodesktop

2. Press control-C

3. Type:
```shell
docker stop neurodesktop
```
4. Type:
```shell
docker rm neurodesktop
```

## Using an RDP Client
Startup Neurodesktop using the following command:

```shell
docker run \
--shm-size=1gb -it --privileged --user=root --name neurodesktop \
-v ~/neurodesktop-storage:/neurodesktop-storage \
-p 3390:3389 -p 8888:8888 \
-e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}}
```
{{< alert color="info" >}}
If you want to connect via RDP using a different port, replace 3390 in the previous and next step with your port
{{< /alert >}}

Open your RDP client and connect to Computer `localhost:3390`

Use the following details to login if prompted

username
: user

password
: password

## Using VNC

To enable VNC and disable RDP, startup Neurodesktop using the following command:

```shell
docker run \
--shm-size=1gb -it --privileged --user=root --name neurodesktop \
-v ~/neurodesktop-storage:/neurodesktop-storage \
-e VNC_ENABLE=true -p 8888:8888 \
-e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}}
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
docker run \
--shm-size=1gb -it --privileged --user=root --name neurodesktop \
-v ~/neurodesktop-storage:/neurodesktop-storage \
-e VNC_ENABLE=true -p 5901:5901 -p 8888:8888 \
-e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}}
```

Open a VNC Client and connect to port 5901

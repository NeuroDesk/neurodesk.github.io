---
title: "Windows"
linkTitle: "Windows"
weight: 2
aliases:
- /docs/neurodesktop/getting-started/windows
description: >
  Install neurodesktop on Windows
---

## Minimum System Requirements
1. At least 3GB free space for neurodesktop base image
2. Docker requirements. Details found under https://docs.docker.com/get-docker/
3. If installing docker using WSL, minimum 20GB space recommended for WSL with Ubuntu

## Quickstart
### 1. Install Docker or Podman
Install Docker from here: https://docs.docker.com/get-docker/
{{< alert color="info" >}}
The docker installation will reboot your computer a few times. There might be warnings regarding WSL2 and this also might require a few more installation steps that unfortunately differ for every system. Please get in touch if you are stuck and have a look at our troubleshooting page. Here is a detailed instruction on how Neurodesk was installed on Windows VMs from the team at Technion: [Detailed Docker & Neurodesk installation instruction Windows
](https://github.com/NeuroDesk/neurodesk.github.io/blob/main/static/docs/getting-started/neurodesktop/Neurodesk_Windows_Technion.pdf){{< /alert >}}

Alternatively, Neurodesk also works with Podman, follow the Podman installation instructions provided at https://podman.io/docs/installation.

### 2. Run Neurodesktop
Use one of the following options to run Neurodesktop:

#### Option 1 (Recommended): Neurodesk-App
Instructions for installing and using the app: https://www.neurodesk.org/docs/getting-started/neurodesktop/neurodeskapp/

#### Option 2 (Advanced): Using Terminal
1. Open a terminal (e.g. Powershell), and type the following command to automatically download the neurodesktop container and run it

```shell
docker volume create neurodesk-home
# This creates a docker volume to store your /home/jovyan data inside a docker volume
```
```shell
docker run --shm-size=1gb -it --privileged --user=root --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage --mount source=neurodesk-home,target=/home/jovyan -p 8888:8888 -e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}}
```


<!-- neurodesktop version found in neurodesk.github.io/data/neurodesktop.toml -->
2. Once neurodesktop is downloaded, leave the terminal open and check which server neurodesktop running on (Avoid pressing CTRL+C). ]

![image](/static/docs/getting-started/neurodeskapp/terminal_token.png)

3. To access neurodesktop, open your web browser and type in one of the URLs provided in your terminal (e.g. `http://127.0.0.1:8888/lab?token=your_unique_token`).

{{< alert title="Note" color="warning" >}}
We do not recommend the use of the Firefox browser for accessing Neurodesktop on Windows 10, as firefox is not able to access localhost where neurodesk is running. 
{{< /alert >}}

4. Press on "Desktop Auto-Resolution" under "ALL CONNECTIONS"

5. If it is the first time you use Neurodesktop, wait until the desktop appears (it may take a few seconds). Otherwise, it should appear instantaneously.

6. Neurodesk is ready to use! See the tutorials page for advice on how to use Neurodesk.     

7. For an optimal experience, switch your browser to full-screen mode by following the instructions for your browser here:
https://www.thewindowsclub.com/open-chrome-edge-or-firefox-browser-in-full-screen-mode

{{< alert color="info" >}}
The browser can be closed anytime, and Neurodesktop will continue running in the background. To reconnect to Neurodesktop, simply start over from step 3 above.
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
```cmd
docker stop neurodesktop
```
4. Type:
```cmd
docker rm neurodesktop
```

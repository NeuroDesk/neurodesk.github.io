---
title: "Windows"
linkTitle: "Windows"
weight: 3
description: >
  Install neurodesktop on Windows
---

## Minimum System Requirements
1. At least 3GB free space for neurodesktop base image
2. Docker requirements. Details found under https://docs.docker.com/get-docker/
3. If installing docker using WSL, atleast 20GB space recommended for WSL with Ubuntu

## Quickstart
### 1. Install Docker
Install Docker from here: https://docs.docker.com/get-docker/
{{< alert >}}
The docker installation will reboot your computer a few times and there might be warnings regardings WSL2 and this also might require a few more installation steps that unfortunatley differ for every system. Please get in touch if you are stuck and have a look at our troubleshoot page.
{{< /alert >}}

### 2. Run Neurodesktop
Use one of the following options to run Neurodesktop:

#### Option 1: NeuroDesktop.exe
Download and run the following executable - careful: This will always download the latest version of neurodesk. For full reproducibility and control please choose Option 2!
https://github.com/NeuroDesk/neurodesktop/raw/main/Windows_run_Neurodesk/NeuroDesktop.exe

#### Option 2: Using Terminal
1. Open a terminal (e.g. Powershell), and type the folowing command to automatically download the neurodesktop container and run it

<pre class="language-batch command-line" data-prompt=">">
<code>docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} vnmd/neurodesktop:{{< params/neurodesktop/version >}}</code>
</pre>

<!-- neurodesktop version found in neurodesk.github.io/data/neurodesktop.toml -->
2. Once neurodesktop is downloaded i.e. `guacd[77]: INFO:        Listening on host 127.0.0.1, port 4822` is displayed in terminal, open a browser and go to:
```
http://localhost:8080/#/?username=user&password=password
```

{{< alert title="Note" >}}
We do not recommend the use of the Firefox browser for accessing Neurodesktop on Windows 10, as firefox is not able to access localhost where neurodesk is running. 
{{< /alert >}}

3. Press on "Desktop Auto-Resolution" under "ALL CONNECTIONS"

4. If it is the first time you use Neruodesktop, wait until the desktop appears (it may take a few seconds). Otherwise, it should appear instantaneously.

5. Neurodesk is ready to use! Click "What's next?" on the left of this page for further instructions.     

6. For an optimal experience, switch your browser to full-screen mode by following the instructions for your browser here:
https://www.thewindowsclub.com/open-chrome-edge-or-firefox-browser-in-full-screen-mode


## Deleting neurodesktop:
When done processing your data it is important to stop and remove the container - otherwise the next start or container update will give an error ("... The container name "/neurodesktop" is already in use...")

{{< alert title="Note" >}}
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

<pre class="language-batch command-line" data-prompt=">">
<code>docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -p 3390:3389 -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} vnmd/neurodesktop:{{< params/neurodesktop/version >}}</code>
</pre>
{{< alert >}}
If you want to connect via RDP using a different port, replace 3390 in the previous and next step with your port
{{< /alert >}}

Open Windows Remote Desktop Connection and connect to Computer `localhost:3390` as shown below. 


![win-rdp-1](/neurodesktop/getting-started/win-rdp-1.png 'win-rdp-1')

Resolution and multi-monitor settings can be set from the Display tab. 

Once ready, click Connect. This will take you to the following prompt

![win-rdp-1](/neurodesktop/getting-started/win-rdp-2.png 'win-rdp-2')

Use the following details to login
```
Session: Xorg
username: user
password: password
```

## Using VNC

To enable VNC and disable RDP, startup Neurodesktop using the following command:

<pre class="language-batch command-line" data-prompt=">">
<code>docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -e VNC_ENABLE=true -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} vnmd/neurodesktop:{{< params/neurodesktop/version >}}</code>
</pre>

{{< alert >}}
VNC allows for multiple desktop connections to same instance

Note: Neurodesktop VNC on the browser currently does not support auto-resolution 
{{< /alert >}}

### Using a VNC Client

{{< alert color="warning" >}}
Needs testing
{{< /alert >}}

Startup Neurodesktop using the following command:

<pre class="language-batch command-line" data-prompt=">">
<code>docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -e VNC_ENABLE=true -p 5901:5901 -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} vnmd/neurodesktop:{{< params/neurodesktop/version >}}</code>
</pre>

Open a VNC Client and connect to port 5901

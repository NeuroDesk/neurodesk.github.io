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
### 1. Connect to cloud server
Open an SSH connection to your cloud instance with port forwarding (USER should be substituted with a username that has admin privileges on the cloud instance, and IP should be substituted with the IP address of the cloud instance)
```
ssh -L 8080:127.0.0.1:8080 USER@IP
```

### 2. Install Docker
Install Docker on the cloud instance from here: https://docs.docker.com/get-docker/. Additional information available here: https://neurodesk.github.io/docs/neurodesktop/getting-started/linux/#installing-docker 

### 3. Run Neurodesktop
Create a local folder on the cloud instance to store persistent data (data that will not disappear if neurodesktop is stopped), e.g. ~/neurodesktop-storage

#### Option 1: NeuroDesktop.run
Download and run the following executable
https://github.com/NeuroDesk/neurodesktop/raw/main/Linux_run_Neurodesk/NeuroDesktop.run

#### Option 2: Using Terminal
1. Type the folowing command on the cloud instance to automatically download the neurodesktop container and run it (Mac, Windows, Linux commands listed below) 

<pre class="language-shell command-line" data-prompt="$" data-output="2-9">
<code>sudo docker run \
  --shm-size=1gb -it --privileged --name neurodesktop \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)" \
  -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} \
  vnmd/neurodesktop:{{< params/neurodesktop/version >}}</code>
</pre>
<!-- neurodesktop version found in neurodesk.github.io/data/neurodesktop.toml -->

{{< alert >}}
If you get errors in neurodesktop then check if the ~/neurodesktop-storage directory is writable to all users, otherwise run `chmod a+rwx ~/neurodesktop-storage`
{{< /alert >}}

### 4. Wait for Neurodesktop to be downloaded to the cloud instance and start

Once neurodesktop has been downloaded and initiated (`guacd[77]: INFO:        Listening on host 127.0.0.1, port 4822` is displayed in terminal), leave the terminal open and neurodesktop running (i.e., do not press CTRL+C)

### 5. Connect to Neurodesktop from your computer for the first time

Open a web browser on your computer, and go to:
```
http://localhost:8080/#/?username=user&password=password
```
Click on the underlying remote desktop protocol that you want to use for the connections: RDP or VNC

Neurodesktop is now ready to be used!

An alternartive to using a web browser, is to use a VNC Client and connect to port 5901 (for this -p 5901:5901 has to be added to the docker call in Option 2 above). User is 'user', Password is 'password'

### 6. Reconnecting to Neurodesktop from your/other computer

If your computer hibernated/rebooted/etc., if the network connnection has been temprarily lost, or if you want to connect to the same instance of Neurodesktop from another computer, only repeat steps 1 and 5, and you will be reconnected to neurodesktop

## Stopping neurodesktop:
When done processing your data it is important to stop and remove the container - otherwise the next start or container update will give an error ("... The container name "/neurodesktop" is already in use...")
1. Click on the terminal from which you ran neurodesktop

2. Press Ctrl-C

3. Run:
<pre class="language-shell command-line" data-prompt="$">
<code>sudo docker stop neurodesktop && sudo docker rm neurodesktop</code>
</pre>

## Portforwarding to an iOS ipad 
You can also connect to this cloud instance from your iOS device :) For this install https://webssh.net/documentation/help/networking/port-forwarding/ and create a tunnel (the tool is free for one connection). Start the docker container in a screen session and then connect to it from your ios device in the browser.

## Cloud-provider specific Tutorials 
| Cloud provider | link                                                                                    |
|----------------|-----------------------------------------------------------------------------------------|
| Oracle         | https://mri.sbollmann.net/index.php/2020/12/08/run-neurodesk-on-oracle-cloud-free-tier/ |
| Azure          | https://henryjburg.medium.com/neurodesk-running-on-azure-3e38c590a152                   |

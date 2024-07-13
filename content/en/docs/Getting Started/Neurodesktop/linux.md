---
title: "Linux"
linkTitle: "Linux"
weight: 2
aliases:
- /docs/neurodesktop/getting-started/linux
description: >
  Install neurodesktop on Linux
---

## Minimum System Requirements
1. At least 3GB free space for neurodesktop base image
2. Docker requirements. Details found under https://docs.docker.com/get-docker/

## Quickstart
### 0. Install Docker or Podman
Install Docker from here: https://docs.docker.com/get-docker/. Additional information is available [below](#installing-docker). 
Alternatively, Neurodesk also works with Podman (https://podman.io/).

To set up Neurodesk on Ubuntu, ensure both Podman client and server are installed. Follow the Podman installation instructions provided at https://podman.io/docs/installation for server setup. 

{{< alert color="info">}}
In Ubuntu 20.10 or newer versions, the packages to install Podman are included to download in the standard repository of the system. However, for Ubuntu 20.04, we manually have to add the repository of Podman. 
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl
echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_20.04/ /" | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
curl -L "https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_20.04/Release.key" | sudo apt-key add -
sudo apt update
sudo apt-get -y install podman
```
{{< /alert >}}

For the client setup, execute the following commands.

```bash
systemctl --user --now enable podman.socket
sudo loginctl enable-linger $USER
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519
cat  ~/.ssh/id_ed25519.pub | cat >> ~/.ssh/authorized_keys
podman system connection add development --identity ~/.ssh/id_ed25519 ssh://$USER@$HOSTNAME/run/user/$UID/podman/podman.sock
```

### 1. Optional: only for ARM64 hardware
Neurodesk supports ARM64 hardware through binfmt

To enable Neurodesk on ARM64 hardware run this setup step:
```bash
sudo docker run --privileged --rm tonistiigi/binfmt --install all
```

### 2. Run Neurodesktop
Before the first run, create a local folder where the downloaded applications will be stored, e.g. `mkdir ~/neurodesktop-storage`

Then use one of the following options to run Neurodesktop:

#### Option 1 (Recommended for local installations): Neurodesk-App
Instructions on installing and using the app: https://www.neurodesk.org/docs/getting-started/neurodesktop/neurodeskapp/

#### Option 2 (Advanced and for remote installations): Using Terminal

0. If the Linux machine is remote (e.g. in the cloud), connect to the machine with a port forwarding first:
```bash
ssh -L 8888:127.0.0.1:8888 USER@IP
```

1. then start neurodesktop:

```bash
docker volume create neurodesk-home &&
sudo docker run \
  --shm-size=1gb -it --privileged --user=root --name neurodesktop \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  --mount source=neurodesk-home,target=/home/jovyan \
  -e NB_UID="$(id -u)" -e NB_GID="$(id -g)" \
  -p 8888:8888 \
  -e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}}
```
or for podman:
```bash
podman volume create neurodesk-home &&
sudo podman run \
  --shm-size=1gb -it --privileged --user=root --name neurodesktop \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  --mount type=volume,source=neurodesk-home,target=/home/jovyan \
  -e NB_UID="$(id -u)" -e NB_GID="$(id -g)" \
  -p 8888:8888 \
  -e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} docker://vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}}
```


<!-- neurodesktop version found in neurodesk.github.io/data/neurodesktop.toml -->

{{< alert color="warning">}}
If you get errors in neurodesktop then check if the ~/neurodesktop-storage directory is writable to all users. Otherwise run:
```bash
chmod a+rwx ~/neurodesktop-storage
```
{{< /alert >}}

2. Once neurodesktop is downloaded, leave the terminal open and check which server neurodesktop is running on (Avoid pressing CTRL+C). 

![image](/static/docs/getting-started/neurodeskapp/terminal_token.png)

3. To access neurodesktop, open your web browser and type in one of the provided URLs in your terminal (e.g. `http://127.0.0.1:8888/lab?token=your_unique_token`).

{{< alert color="warning">}}
If using Chrome, a pop-up may open with the text: 
```none
"http://127.0.0.1:8888 wants to
See text and images copied to the clipboard".
```
Press "Allow" to access your clipboard from within Neurodesktop.  
{{< /alert >}}

{{< alert color="warning">}}
If using Firefox, you might not be able to paste clipboard content into the virtual desktop from the host computer. In that case, please follow [these instructions](/docs/support/faq/#copying-text-from-my-host-computer-and-pasting-it-inside-neurodesktop-doesnt-work-in-firefox)
{{< /alert >}}

4. Press on "Desktop Auto-Resolution" under "ALL CONNECTIONS"

5. If it is the first time you have used Neurodesktop, wait until the desktop appears (it may take a few seconds). Otherwise, it should appear instantaneously.

6. Neurodesk is now ready to use! See the tutorials page for advice on how to use Neurodesk.     

7. For an optimal experience, switch your browser to full-screen mode by following the instructions for your browser here:
https://www.thewindowsclub.com/open-chrome-edge-or-firefox-browser-in-full-screen-mode

{{< alert color="info">}}
The browser can be closed anytime, and Neurodesktop will continue running in the background. To reconnect to Neurodesktop, simply start over from step 3 above.
{{< /alert >}}

{{< alert color="info">}}
If you are using conda environments and you are installing packages or even new kernels, make sure to read this: https://www.neurodesk.org/tutorials-examples/tutorials/programming/conda/
{{< /alert >}}

{{< alert color="info">}}
If you want to use Neurodesk in combination with a reverse proxy, make sure to activate proxy_buffering off as described here: https://guacamole.apache.org/doc/gug/reverse-proxy.html
{{< /alert >}}


## Deleting neurodesktop:
When done processing your data it is important to stop and remove the container - otherwise the next start or container update will give an error ("... The container name "/neurodesktop" is already in use...")

{{< alert title="Note" color="warning">}}
Notice that any data that were saved outside of /neurodesktop-storage would be lost. Please make sure to move all your data to that folder before deleting neurodesktop.
{{< /alert >}}

1. Click on the terminal from which you ran neurodesktop

2. Press `Ctrl-C`

3. Run:
```bash
docker stop neurodesktop
```

4. Run:
```bash
docker rm neurodesktop
```

## Installing Docker

For general installation instructions, refer to https://docs.docker.com/get-docker/

### RHEL/CentOS (yum-based)
Refer to https://docs.docker.com/engine/install/centos/

One example to install docker in a yum-based distribution could look like this:
```bash
sudo dnf install -y yum-utils 
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io
# or if dnf not found: sudo yum install docker-ce docker-ce-cli containerd.io
sudo systemctl enable docker
sudo systemctl start docker
sudo docker version
sudo docker info
sudo groupadd docker
sudo usermod -aG docker $USER
sudo chown root:docker /var/run/docker.sock
newgrp docker
```

### Ubuntu/Debian (apt-based)
Refer to https://docs.docker.com/engine/install/ubuntu/

One example to install docker in a apt-based distribution could look like this:
```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

## GPU support

### RHEL/CentOS (yum-based)
```bash
sudo yum install nvidia-container-toolkit -y
```

### Ubuntu/Debian (apt-based)
```bash
sudo apt install nvidia-container-toolkit -y
```

### Running neurodesktop container with GPU
```bash
sudo docker run \
  --shm-size=1gb -it --privileged --user=root --name neurodesktop \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  -e NB_UID="$(id -u)" -e NB_GID="$(id -g)" \
  --gpus all \
  -p 8888:8888 -e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} \
  vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}}
```

<!-- neurodesktop version found in neurodesk.github.io/data/neurodesktop.toml -->

#### Running tensorflow (w/ GPU)
##### Using tensorflow (python)
```bash
mamba install tensorflow-gpu
python
```
```python
import tensorflow as tf
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))
```

![image](https://user-images.githubusercontent.com/4021595/135446560-d135f6ce-b699-4e46-8534-b72b4d9f2d41.png)
##### Using tensorflow (singularity container in neurodesktop)
```bash
singularity pull docker://tensorflow/tensorflow:latest-gpu
singularity run --nv tensorflow_latest-gpu.sif
python
```
```python
import tensorflow as tf
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))
```

![image](https://user-images.githubusercontent.com/4021595/135449288-6c3e9bbd-fe5f-4f43-aa4a-8a798ba629e6.png)

## Connecting to a running Neurodesktop session via a plain shell
You can start a neurodesktop container using docker or the neurodeskapp. If you want to connect to this running session using a plain shell you can do this as well:
```
docker ps
# note the name of the running container, e.g. neurodeskapp-49977

# now connect to this container
docker exec -ti neurodeskapp-49977 bash

# then switch to the jovyan user
su jovyan
```

## Using an RDP Client
Startup Neurodesktop using the following command:

```bash
sudo docker run \
  --shm-size=1gb -it --privileged --user=root --name neurodesktop \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  -e NB_UID="$(id -u)" -e NB_GID="$(id -g)" \
  -p 8888:8888 -p 3390:3389 \
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

```bash
sudo docker run \
  --shm-size=1gb -it --privileged --user=root --name neurodesktop \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  -e NB_UID="$(id -u)" -e NB_GID="$(id -g)" \
  -p 8888:8888 \
  -e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}} --vnc
```

To enable both VNC and RDP, startup Neurodesktop using the following command:

```bash
sudo docker run \
  --shm-size=1gb -it --privileged --user=root --name neurodesktop \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  -e NB_UID="$(id -u)" -e NB_GID="$(id -g)" \
  -p 8888:8888 \
  -e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}} --vnc --rdp
```

{{< alert color="info" >}}
VNC allows for multiple desktop connections to same instance
{{< /alert >}}
{{< alert color="warning" >}}
VNC option for Neurodesktop on the browser does not support auto-resolution 
{{< /alert >}}

### Using a VNC Client

Startup Neurodesktop using the following command:

```bash
sudo docker run \
  --shm-size=1gb -it --privileged --user=root --name neurodesktop \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  -e NB_UID="$(id -u)" -e NB_GID="$(id -g)" \
  -p 8888:8888 -p 5901:5901 \
  -e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}} --vnc
```

Install the Tiger VNC client
```
sudo apt install tigervnc-client
```

Run the VNC Client and connect to `localhost::5901`

![tigervncclient](/static/docs/getting-started/neurodesktop/vnc/tigervncclient.png 'tigervncclient')

Enter `password` and click Ok.

![tigervncclient-password](/static/docs/getting-started/neurodesktop/vnc/tigervncclient-password.png 'tigervncclient-password')


---
title: "Linux"
linkTitle: "Linux"
weight: 1
description: >
  Install neurodesktop on Linux
---

## Minimum System Requirements
1. At least 3GB free space for neurodesktop base image
2. Docker requirements. Details found under https://docs.docker.com/get-docker/

## Quickstart
### 1. Install Docker
Install Docker from here: https://docs.docker.com/get-docker/. Additional information available [below](#installing-docker)

### 2. Run Neurodesktop
Before the first run, create a local folder where the downloaded applications will be stored, e.g. `~/neurodesktop-storage`

Then use one of the following options to run Neurodesktop:

#### Option 1: NeuroDesktop.run
Download and run the following executable
https://github.com/NeuroDesk/neurodesktop/raw/main/Linux_run_Neurodesk/NeuroDesktop.run

#### Option 2: Using Terminal
1. Open a terminal, and type the folowing command to automatically download the neurodesktop container and run it

{{< params/neurodesktop/linux/default >}}
<!-- neurodesktop version found in neurodesk.github.io/data/neurodesktop.toml -->

{{< alert >}}
If you get errors in neurodesktop then check if the ~/neurodesktop-storage directory is writable to all users, otherwise run `chmod a+rwx ~/neurodesktop-storage`
{{< /alert >}}

2. Once neurodesktop is downloaded i.e. `guacd[77]: INFO:        Listening on host 127.0.0.1, port 4822` is displayed in terminal, leave the terminal open and neurodesktop running (i.e., do not press CTRL+C)

3. Open a browser and go to:
```
http://localhost:8080/#/?username=user&password=password
```

{{< alert >}}
If using Chrome, a pop-up may open with the text: 
```
"http://localhost:8080 wants to
See text and images copied to the clipboard".
```
You should press "Allow"
{{< /alert >}}

{{< alert >}}
If using Firefox, you might not be able to paste clipboard content into the virtual desktop from the host computer. In that case, please follow the instructions here:
https://www.neurodesk.org/docs/neurodesktop/troubleshooting/#the-clipboard-in-firefox-is-not-working-correctly
{{< /alert >}}

4. Press on "Desktop Auto-Resolution" under "ALL CONNECTIONS"

5. If it is the first time you use Neruodesktop, wait until the desktop appears (it may take a few seconds). Otherwise, it should appear instantaneously.

6. Neurodesk is ready to use! Click "What's next?" on the left of this page for further instructions.     

7. For an optimal experience, switch your browser to full-screen mode by following the instructions for your browser here:
https://www.thewindowsclub.com/open-chrome-edge-or-firefox-browser-in-full-screen-mode

{{< alert >}}
The browser can be closed anytime, and Neurodesktop will continue running in the background. To reconnect to Neurodesktop, simply start over from step 3 above.
{{< /alert >}}

## Deleting neurodesktop:
When done processing your data it is important to stop and remove the container - otherwise the next start or container update will give an error ("... The container name "/neurodesktop" is already in use...")

{{< alert title="Note" >}}
Notice that any data that were saved outside of /neurodesktop-storage would be lost. Please make sure to move all your data to that folder before deleting neurodesktop.
{{< /alert >}}

1. Click on the terminal from which you ran neurodesktop

2. Press `Ctrl-C`

3. Run:
<pre class="language-shell command-line" data-prompt="$">
<code>docker stop neurodesktop</code>
</pre>

4. Run:
<pre class="language-shell command-line" data-prompt="$">
<code>docker rm neurodesktop</code>
</pre>

## Installing Docker

For general installation instructions, refer to https://docs.docker.com/get-docker/

### RHEL/CentOS (yum-based)
Refer to https://docs.docker.com/engine/install/centos/

One example to install docker in a yum-based distribution could look like this:
<pre class="language-shell command-line" data-prompt="$">
<code>sudo dnf install -y yum-utils 
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io
sudo systemctl enable docker
sudo systemctl start docker
sudo docker version
sudo docker info
sudo groupadd docker
sudo usermod -aG docker $USER
sudo chown root:docker /var/run/docker.sock
newgrp docker</code>
</pre>

### Ubuntu/Debian (apt-based)
Refer to https://docs.docker.com/engine/install/ubuntu/

One example to install docker in a apt-based distribution could look like this:
<pre class="language-shell command-line" data-prompt="$" data-output="5">
<code>sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io</code>
</pre>

## GPU support

### RHEL/CentOS (yum-based)
<pre class="language-shell command-line" data-prompt="$" data-output="4-9">
<code>sudo yum install nvidia-container-toolkit -y</code>
</pre>
### Running neurodesktop container with GPU
<pre class="language-shell command-line" data-prompt="$" data-output="2-9">
<code>sudo docker run \
  --shm-size=1gb -it --privileged --name neurodesktop \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)" \
  -e NVIDIA_VISIBLE_DEVICES=all \
  -e NVIDIA_DISABLE_REQUIRE=1 \
  -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} \
  vnmd/neurodesktop:{{< params/neurodesktop/version >}}</code>
</pre>

<!-- neurodesktop version found in neurodesk.github.io/data/neurodesktop.toml -->

Then inside the neurodesktop container run:
<pre class="language-shell command-line" data-prompt="$">
<code>
sudo apt update
sudo apt install libcudart10.1
</code>
</pre>

For a GPU with Nvidia driver Version > 495.29.05:
<pre class="language-shell command-line" data-prompt="$">
<code>
wget https://developer.download.nvidia.com/compute/cuda/11.5.0/local_installers/cuda_11.5.0_495.29.05_linux.run
sudo sh ./cuda_11.5.0_495.29.05_linux.run
</code>
</pre>

#### Running tensorflow (w/ GPU)
##### Using tensorflow (python)
<pre class="language-shell command-line" data-prompt="$">
<code>
conda install tensorflow-gpu
python</code>
</pre>
<pre class="language-python command-line" data-prompt=">>>">
<code>import tensorflow as tf
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))</code>
</pre>

![image](https://user-images.githubusercontent.com/4021595/135446560-d135f6ce-b699-4e46-8534-b72b4d9f2d41.png)
##### Using tensorflow (singularity container in neurodesktop)
<pre class="language-shell command-line" data-prompt="$">
<code>singularity pull docker://tensorflow/tensorflow:latest-gpu
singularity run --nv tensorflow_latest-gpu.sif
python</code>
</pre>
<pre class="language-python command-line" data-prompt=">>>">
<code>import tensorflow as tf
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))</code>
</pre>

![image](https://user-images.githubusercontent.com/4021595/135449288-6c3e9bbd-fe5f-4f43-aa4a-8a798ba629e6.png)

## Using an RDP Client
Startup Neurodesktop using the following command:

{{< params/neurodesktop/linux/rdpclient >}}
{{< alert >}}
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

{{< params/neurodesktop/linux/vnc >}}

To enable both VNC and RDP, startup Neurodesktop using the following command:

{{< params/neurodesktop/linux/vncrdp >}}

{{< alert >}}
VNC allows for multiple desktop connections to same instance

Note: Neurodesktop VNC on the browser currently does not support auto-resolution 
{{< /alert >}}

### Using a VNC Client

{{< alert color="warning" >}}
Needs testing
{{< /alert >}}

Startup Neurodesktop using the following command:

{{< params/neurodesktop/linux/vncclient >}}

Open a VNC Client and connect to port 5901

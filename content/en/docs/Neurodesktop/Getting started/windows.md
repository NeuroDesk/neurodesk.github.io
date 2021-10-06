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
1. Install Docker from here: https://docs.docker.com/get-docker/

2. Open a terminal, and type the folowing command to automatically download the neurodesktop container and run it

<!-- Windows powershell
{{< prismjs lang="powershell" prompt=">>" command-line="false" output="2-4">}}
docker run --shm-size=1gb -it --privileged --name neurodesktop `
-v C:/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 `
-h neurodesktop-{{< params/neurodesktop/version >}} `
vnmd/neurodesktop:{{< params/neurodesktop/version >}}{{< /prismjs >}} -->

<!-- Command line
{{< prismjs lang="batch" prompt=">" command-line="true" output="2-4">}}
docker run --shm-size=1gb -it --privileged --name neurodesktop ^
-v C:/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 ^
-h neurodesktop-{{< params/neurodesktop/version >}} ^
vnmd/neurodesktop:{{< params/neurodesktop/version >}}{{< /prismjs >}} -->

<pre class="language-shell command-line" data-prompt="$">
<code>docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-{{< params/neurodesktop/version >}} vnmd/neurodesktop:{{< params/neurodesktop/version >}}</code>
</pre>
<!-- neurodesktop version found in neurodesk.github.io/data/neurodesktop.toml -->
3. Once neurodesktop is downloaded i.e. `guacd[77]: INFO:        Listening on host 127.0.0.1, port 4822` is displayed in terminal, open a browser and go to:
```
http://localhost:8080/#/?username=user&password=password
```
or open a VNC Client and connect to port 5901 (for this -p 5901:5901 has to be added to the docker call)

4. neurodesktop is ready to use!
- User is `user`
- Password is `password`

## Stopping neurodesktop:
When done processing your data it is important to stop and remove the container - otherwise the next start or container update will give an error ("... The container name "/neurodesktop" is already in use...")
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

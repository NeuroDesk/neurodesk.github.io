---
title: "Neurodesktop Dev"
linkTitle: "Neurodesktop Dev"
weight: 3
description: >
  Testing the latest dev version of Neurodesktop
---

{{% alert title="Warning" color="warning" %}}
For development and testing only. Not recommended for production use
{{% /alert %}}

## Building neurodesktop-dev
Dev builds can be triggered by Neurodesk admins from https://github.com/NeuroDesk/neurodesktop/actions/workflows/build-neurodesktop-dev.yml

## Running latest neurodesktop-dev

### Linux
<pre class="language-shell command-line" data-prompt="$" data-output="3-7">
<code>docker pull vnmd/neurodesktop-dev:latest
sudo docker run \
  --shm-size=1gb -it --cap-add SYS_ADMIN \
  --security-opt apparmor:unconfined --device=/dev/fuse \
  --name neurodesktop-dev \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)" \
  -p 8080:8080 -h neurodesktop-dev \
  vnmd/neurodesktop-dev:latest</code>
</pre>

### Windows
<pre class="language-batch command-line" data-prompt=">">
<code>docker pull vnmd/neurodesktop-dev:latest
docker run --shm-size=1gb -it --cap-add SYS_ADMIN --security-opt apparmor:unconfined --device=/dev/fuse --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-dev vnmd/neurodesktop-dev:latest</code>
</pre>

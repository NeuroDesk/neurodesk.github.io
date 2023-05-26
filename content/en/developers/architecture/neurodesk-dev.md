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
```bash
docker pull vnmd/neurodesktop-dev:latest
sudo docker run \
  --shm-size=1gb -it --cap-add SYS_ADMIN \
  --security-opt apparmor:unconfined --device=/dev/fuse \
  --name neurodesktop-dev \
  -v ~/neurodesktop-storage:/neurodesktop-storage \
  -e NB_UID="$(id -u)" -e NB_GID="$(id -g)" \
  -p 8888:8888 -h neurodesktop-dev \
  vnmd/neurodesktop-dev:latest
```

### Windows
```bash
docker pull vnmd/neurodesktop-dev:latest
docker run --shm-size=1gb -it --cap-add SYS_ADMIN --security-opt apparmor:unconfined --device=/dev/fuse --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -p 8888:8888 -h neurodesktop-dev vnmd/neurodesktop-dev:latest
```

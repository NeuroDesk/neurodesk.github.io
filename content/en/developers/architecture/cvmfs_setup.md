---
title: "CVMFS architecture"
linkTitle: "CVMFS architecture"
weight: 1
description: >
  CVMFS architecture
---

We store our singuarlity containers unpacked on CVMFS. We tried the DUCC tool in the beginning, but it was causing too many issues with dockerhub and we were rate limited. The script to unpack our singularity containers is here: https://github.com/NeuroDesk/neurocommand/blob/main/cvmfs/sync_containers_to_cvmfs.sh

It gets called by a cronjob on the CVMFS Stratum 0 server and relies on the log.txt file being updated via an action in the neurocommand repository (https://github.com/NeuroDesk/neurocommand/blob/main/.github/workflows/upload_containers_simg.sh)

The Stratum 1 servers then pull this repo from Stratum 0 and our desktops mount these repos (configured here: https://github.com/NeuroDesk/neurodesktop/blob/main/Dockerfile)

The startup script (https://github.com/NeuroDesk/neurodesktop/blob/main/config/startup.sh) sets up CVMFS and tests which server is fastest during the container startup.
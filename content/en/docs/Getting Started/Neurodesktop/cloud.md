---
title: "Cloud"
linkTitle: "Cloud"
weight: 5
aliases:
- /docs/neurodesktop/getting-started/cloud
description: >
  Run neurodesktop on cloud computing resources
---

## Options for Running Neurodesk on cloud computing resources

There are a couple of ways how Neurodesktop can be run on cloud computing resources:
1. The first and easiest option is to provision a virtual Linux machine and run docker on this machine similar to a local Linux setup: https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/
2. Another option is to use Windows VMs and some groups have had success with that. Here is a detailed instructions on this setup: https://github.com/NeuroDesk/neurodesk.github.io/blob/main/static/docs/getting-started/neurodesktop/Neurodesk_Windows_Technion.pdf 
3. The third and most scalable solution is to run Neurodesk via Kubernetes. This setup is a bit more complex, but can handle many simultaneous users and is ideal for research groups and workshops. The easiest way to deploy Neurodesk on Kubernetes is to use Zero to Jupyterhub (https://z2jh.jupyter.org/en/stable/) - then you can use the Neurodesk image like any other jupyterhub image. If you do not want to run a privileged container you need to deploy the cvmfs setup on Kubernetes as well: https://github.com/cvmfs-contrib/cvmfs-csi/

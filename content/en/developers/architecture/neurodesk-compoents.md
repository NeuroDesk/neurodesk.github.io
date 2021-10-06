---
title: "Neurodesk Architecture"
linkTitle: "Neurodesk Architecture"
weight: 2
description: >
  The architecture of the Neurodesk ecosystem
---

# Layers
Neurodesktop: [https://github.com/NeuroDesk/neurodesktop](https://github.com/NeuroDesk/neurodesktop)
* docker container with interface modifications
* contains tools necessary to manage workflows in sub-containers: vscode, git
* CI: builds docker image and tests if it runs; tests if CVMFS servers are OK before deployment
* CD: pushes images to github & docker registry 

Neurocommand: [https://github.com/NeuroDesk/neurocommand](https://github.com/NeuroDesk/neurocommand)
* script to install and manage multiple containers using transparent singularity on any linux system
* this repo also handles the creation of menu entries in a general form applicable to different desktop environments
* this repo can be re-used in other projects like CVL and when installing it on a bare-metal workstations
* CI: tests if containers can be installed
* CD: this repo checks if containers requested in apps.json file are availabe on object storage and if not converts the singularity containers based on the docker containers and uploads them to object storage 

transparent-singularity: [https://github.com/NeuroDesk/transparent-singularity](https://github.com/NeuroDesk/transparent-singularity)
* script to install neuro-sub-containers, installers are called by neurocommand 
* this repo provides a way of using our containers on HPCs for large scale processing of the pipelines (including the support of SLURM and other job schedulers)
* CI: test if exposing of binaries from container works

Neurocontainers: [https://github.com/NeuroDesk/neurocontainers](https://github.com/NeuroDesk/neurocontainers)
* build scripts for neuro-sub-containers 
* CI: building and testing of containers 
* CD: pushing containers to github and dockerhub registry

Neurodocker: [https://github.com/NeuroDesk/neurodocker](https://github.com/NeuroDesk/neurodocker)
* fork of neurodocker project
* provides recipes for our containers built 
* we are providing pull requests back of recipes
* CI: handled by [neurodocker](https://github.com/ReproNim/neurodocker) - testing of generating container recipes


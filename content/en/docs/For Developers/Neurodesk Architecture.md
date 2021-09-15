---
title: "Neurodesk Architecture"
linkTitle: "Neurodesk Architecture"
weight: 1
description: >
  The architecture of the Neurodesk ecosystem
---

# Layers
Neurodesktop: [https://github.com/NeuroDesk/neurodesktop](https://github.com/NeuroDesk/neurodesktop)
* docker container with interface modifications
* contains tools necessary to manage containers: vscode, git, niype
* CI: builds docker image and tests if it runs

Neurocommand: [https://github.com/NeuroDesk/neurocommand](https://github.com/NeuroDesk/neurocommand)
* script to install and manage multiple containers using transparent singularity on any linux system
* this repo would also handle the creation of menu entries in a general form applicable to different desktop environments
* this repo can be re-used in other projects like CVL and the imaging workstations
* CI: tests if containers can be installed

transparent-singularity: [https://github.com/NeuroDesk/transparent-singularity](https://github.com/NeuroDesk/transparent-singularity)
* script to install neuro-sub-containers, installers are called by neurodesk script 
* this repo could provide a simple way of using our containers on HPCs for large scale processing of the pipelines build in VNM
* CI: test if exposing of binaries work

Neurocontainers: [https://github.com/NeuroDesk/neurocontainers](https://github.com/NeuroDesk/neurocontainers)
* build scripts for neuro-sub-containers 
* CI: building, pushing and testing of containers 

Neurodocker: [https://github.com/NeuroDesk/neurodocker](https://github.com/NeuroDesk/neurodocker)
* fork of neurodocker project
* provides recipes for our containers built 
* we are providing pull requests back of recipes
* CI: handled by [neurodocker](https://github.com/ReproNim/neurodocker) - testing of generating container recipes

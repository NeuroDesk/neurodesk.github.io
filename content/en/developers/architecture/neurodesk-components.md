---
title: "Neurodesk Architecture"
linkTitle: "Neurodesk Architecture"
weight: 1
description: >
  The architecture of the Neurodesk ecosystem
---

## Neurodesktop: Recommended for Beginners
_Neurodesktop_ is a compact Docker container with a browser-accessible virtual desktop that allows you develop and implement data analysis, pre-equipped with basic fMRI and EEG analysis tools.
To get started, see: [Neurodesktop](/docs/neurodesktop/) ([Github](https://github.com/NeuroDesk/neurodesktop))
* docker container with interface modifications
* contains tools necessary to manage workflows in sub-containers: vscode, git
* CI: builds docker image and tests if it runs; tests if CVMFS servers are OK before deployment
* CD: pushes images to github & docker registry 

## Neurocommand: 

_Neurocommand_ offers the option to install and manage multiple distinct containers for more advanced users who prefer a command-line interface. _Neurocommand_ is the recommended interface for users seeking to use Neurodesk in high performance computing (HPC) environments. 

To get started, see: [Neurocommand](/docs/neurocommand/) ([Github](https://github.com/NeuroDesk/neurocommand))
* script to install and manage multiple containers using transparent singularity on any linux system
* this repo also handles the creation of menu entries in a general form applicable to different desktop environments
* this repo can be re-used in other projects like CVL and when installing it on bare-metal workstations
* CI: tests if containers can be installed
* CD: this repo checks if containers requested in apps.json file are available on object storage and if not converts the singularity containers based on the docker containers and uploads them to object storage 

## transparent-singularity: 
_transparent-singularity_ offers seamless access to applications installed in _neurodesktop_ and _neurocommand_, treating containerised software as native installations. 

More info: [transparent-singularity](/developers/transparent_singularity) ([Github](https://github.com/NeuroDesk/transparent-singularity))
* script to install neuro-sub-containers, installers are called by neurocommand 
* this repo provides a way of using our containers on HPCs for large scale processing of the pipelines (including the support of SLURM and other job schedulers)
* CI: test if exposing of binaries from container works

## Neurocontainers: 
_neurocontainers_ contains scripts for building sub-containers for neuroimaging data-analysis software. These containers can be used alongside _neurocommand_ or _transparent-singularity_. 

To get started, see: [Neurocontainers](/docs/neurocontainers/) ([Github](https://github.com/NeuroDesk/neurocontainers))
* build scripts for neuro-sub-containers 
* CI: building and testing of containers 
* CD: pushing containers to github and dockerhub registry

## Neurodocker: 
_Neurodocker_ is a command-line program that generates custom Dockerfiles and Singularity recipes for neuroimaging and minifies existing containers.  

More info: [Github](https://github.com/NeuroDesk/neurodocker)
* fork of neurodocker project
* provides recipes for our containers built 
* we are providing pull requests back of recipes
* CI: handled by [neurodocker](https://github.com/ReproNim/neurodocker) - testing of generating container recipes


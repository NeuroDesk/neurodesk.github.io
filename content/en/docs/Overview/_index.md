---
title: "Neurodesk Overview"
linkTitle: "Overview"
weight: 1
description: >
  A flexible, scalable and easy to use data analysis environment for reproducible neuroimaging.
---

Neurodesk provides a containerised data analysis environment to facilitate reproducible analysis of neuroimaging data. At Neurodesk, we believe that reproducibility should be a fundamental principle underlying neuroscientific data analysis (1). Analysis pipelines for neuroimaging data typically rely on specific versions of packages and software, and are dependent on their native operating system. These dependencies mean that a working analysis pipeline may fail or produce different results on a new computer, or even on the same computer after a software update. Neurodesk provides a platform in which anyone, anywhere, using any computer can reproduce your original research findings given the original data and analysis code. 

## What is a container?

The Neurodesk environment allows users to build and use containers for analysing neuroimaging data. Containers can be compared to virtual machines, in that they allow users to create a virtual, isolated computing environment with an operating system separate to that of the host machine. However, containers differ from virtual machines in that they virtualise software rather than hardware. Practically, this means that container images require few system resources to install, start-up quickly, and are easily portable between computers. To read more about Docker containers, visit [the Docker webpage](https://www.docker.com/resources/what-container)  

## The Neurodesk ecosystem

The Neurodesk ecosystem includes a number of tools for containerised analysis of neuroimaging data. These include:

![architecture](/NeurodeskArchitecture.png 'architecture')

### Neurodesktop

> If you’re new to Neurodesk, we recommend you begin with Neurodesktop.

_Neurodesktop_ is a compact Docker container with a browser-accessible virtual desktop that allows you develop and implement data analysis pipelines as though you’re on your own computer. The _neurodesktop_ container has the basic tools required for the analysis of fMRI and EEG data pre-installed. 
To get started, see: [Neurodesktop](/docs/Neurodesktop/)

### Neurocommand

_Neurocommand_ offers to option of install and manage multiple distinct containers for more advanced users who prefer a command-line interface. _Neurocommand_ is the recommended interface for users seeking to use Neurodesk in high performance computing (HPC) environments. 

To get started, see: [Neurocommand](/docs/Neurocommand/)

### Transparent-singularity

The applications pre-installed in _neurodesktop_ and _neurocommand_ are accessible through _transparent-singularity_, which allows users to transparently use containerised software as through it were installed natively. 

To find out more about this open-source project, see: [transparent-singularity](https://github.com/NeuroDesk/transparent-singularity)

### Neurocontainers

The _neurocontainers_ repository contains build scripts for sub-containers which are wrapped around executables for neuroimaging data-analysis software. These neurocontainers can be used in combination with neurocommand or transparent-singularity. 

To get started, see: [Neurocontainers](/docs/Neurocontainers/)

### Neurodocker

_Neurodocker_ is a command-line program that generates custom Dockerfiles and Singularity recipes for neuroimaging and minifies existing containers.  

To find out more about this open-source project, see: [Neurodocker](https://github.com/NeuroDesk/neurodocker)

## References

1. 1.	National Academies of Sciences, Engineering, and Medicine. 2019. Reproducibility and Replicability in Science. Washington, DC: The National Academies Press. https://doi.org/10.17226/25303.


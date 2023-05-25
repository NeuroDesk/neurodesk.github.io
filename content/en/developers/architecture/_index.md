---
title: "Architecture"
linkTitle: "Architecture"
weight: 2
description: >
  The architecture of the Neurodesk ecosystem
---

## The Neurodesk ecosystem

The Neurodesk ecosystem includes a number of tools for containerised analysis of neuroimaging data. These include:

![architecture](/NeurodeskArchitecture.png 'architecture')

### Neurodesktop

> If you’re new to Neurodesk, we recommend you begin with Neurodesktop.

_Neurodesktop_ is a compact Docker container with a browser-accessible virtual desktop that allows you develop and implement data analysis pipelines as though you’re on your own computer. The _neurodesktop_ container has the basic tools required for the analysis of fMRI and EEG data pre-installed. 
To get started, see: [Neurodesktop](/docs/neurodesktop/)

### Neurocommand

_Neurocommand_ offers the option to install and manage multiple distinct containers for more advanced users who prefer a command-line interface. _Neurocommand_ is the recommended interface for users seeking to use Neurodesk in high performance computing (HPC) environments. 

To get started, see: [Neurocommand](/docs/neurocommand/)

### Transparent-singularity

The applications pre-installed in _neurodesktop_ and _neurocommand_ are accessible through _transparent-singularity_, which allows users to transparently use containerised software as through it were installed natively. 

To find out more about this open-source project, see: [transparent-singularity](https://github.com/NeuroDesk/transparent-singularity)

### Neurocontainers

The _neurocontainers_ repository contains build scripts for sub-containers which are wrapped around executables for neuroimaging data-analysis software. These neurocontainers can be used in combination with neurocommand or transparent-singularity. 

To get started, see: [Neurocontainers](/docs/neurocontainers/)

### Neurodocker

_Neurodocker_ is a command-line program that generates custom Dockerfiles and Singularity recipes for neuroimaging and minifies existing containers.  

To find out more about this open-source project, see: [Neurodocker](https://github.com/NeuroDesk/neurodocker)
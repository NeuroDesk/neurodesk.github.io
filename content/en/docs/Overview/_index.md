---
title: "Neurodesk Overview"
linkTitle: "Overview"
weight: 1
aliases:
- /docs/overview/
description: >
  A flexible, scalable and easy to use data analysis environment for reproducible neuroimaging.
---

## Video tutorial
Click [here](https://www.youtube.com/watch?v=JLv_5fycugw) to watch a 2 minute tutorial video from OHBM 2021

## Introduction

Neurodesk provides a containerised data analysis environment to facilitate reproducible analysis of neuroimaging data. At Neurodesk, we believe that reproducibility should be a fundamental principle underlying neuroscientific data analysis (1). Analysis pipelines for neuroimaging data typically rely on specific versions of packages and software, and are dependent on their native operating system. These dependencies mean that a working analysis pipeline may fail or produce different results on a new computer, or even on the same computer after a software update. Neurodesk provides a platform in which anyone, anywhere, using any computer can reproduce your original research findings given the original data and analysis code. 

Neurodesk started as a hackathon project at the Brainhack 2020:
- https://github.com/ohbm/hackathon2020/issues/177; 
- https://docs.google.com/presentation/d/1FCtrRCZrj-5nLmnIIpVFYYYXuMAoUf-B/edit?usp=sharing&ouid=100303589348027986473&rtpof=true&sd=true] - The 2020 OHBM Brainhack's Virtual Neuro Machine project webpage and kickoff presentation. This is the hackathon where the seeds of Neurodesk sprouted.  

## What is a container?

The Neurodesk environment allows users to build and use containers for analysing neuroimaging data. Containers can be compared to virtual machines, in that they allow users to create a virtual, isolated computing environment with an operating system separate to that of the host machine. However, containers differ from virtual machines in that they virtualise software rather than hardware. Practically, this means that container images require few system resources to install, start-up quickly, and are easily portable between computers. 

We recommend watching [this excellent short video](https://www.youtube.com/watch?v=HelrQnm3v4g) from the Australian Research Data Commons (ARDC) on research applications of software containers. 
To read more about Docker containers, visit [the Docker webpage](https://www.docker.com/resources/what-container)  


## References

1. National Academies of Sciences, Engineering, and Medicine. 2019. Reproducibility and Replicability in Science. Washington, DC: The National Academies Press. https://doi.org/10.17226/25303.


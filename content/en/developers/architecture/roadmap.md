---
title: "Project Roadmap"
linkTitle: "Roadmap"
weight: 100
description: >-
     This page lists ideas we have planned for Neurodesk - If any of these things sound exciting to you, get in touch and we help you to become a contributor.
---

All things we are currently working on and are planning to do are listed here: https://github.com/orgs/NeuroDesk/projects/9/views/4

The big themes are:

## Improving the workflow of how users can add new applications to Neurodesk

Adding new applications to Neurodesk currently requires multiple steps and back-and-forth between contributors and maintainers. We are aiming to simplify this process by developing an interactive workflow based on our current interactive container builder and the existing github workflows. 

Some issues in this theme are:
- https://github.com/NeuroDesk/neurocontainers/issues/127

## Standardizing the container deployment

Currently, deploying the application containers happens through a connection of various custom scripts distributed across various repositories (apps.json in neurocommand repository, neurocontainers, transparent singularity). 
We would like to adopt community standard tools, like SHPC, that can perform some of these tasks. The goal is to remove duplication of effort and maintenance. 

Some issues in this theme are:
- https://github.com/NeuroDesk/transparent-singularity/issues/7
- https://github.com/NeuroDesk/neurocommand/issues/152
- https://github.com/NeuroDesk/transparent-singularity/issues/8
- https://github.com/NeuroDesk/neurocommand/issues/187
- https://github.com/NeuroDesk/neurocontainers/issues/504

## Reuse and citability of containers

Currently, there is no good way of describing and citing the individual software containers. We would like to increase the reusability and citability of the software containers.

Some issues in this theme are:
- https://github.com/NeuroDesk/neurocontainers/issues/218
- https://github.com/NeuroDesk/neurocontainers/issues/217
- https://github.com/NeuroDesk/neurocontainers/issues/142
- https://github.com/NeuroDesk/neurocommand/issues/212

## Deeper Integration of containers and jupyter notebook system

We want to integrate the software containers deeper into the jupyter notebook system. Ideally, it is possible to use a jupyter kernel from within a software container.

Some issues in this theme are:
- https://github.com/NeuroDesk/neurocommand/issues/175


## Support of scheduling workflows
Currently, all Neurodesk work is entirely interactive. We want to add a way of scheduling workflows and jobs so that larger computations can be managed efficiently.

Some issues in this theme are:
- https://github.com/NeuroDesk/neurodesktop/issues/97
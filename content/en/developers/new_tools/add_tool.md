---
title: "Add tools"
linkTitle: "Add tools"
weight: 1
description: >
  Add a tool to neurodesktop
---

The goal of *Neurodesk* is to provide users with a large choice of tools to use in their pipelines.
Use the guide below to add a tool to *Neurodesktop* or *Neurocontainers*. 

## Guiding principles 
To decide if a tool should be packaged in a singularity container in *Neurocontainers* or be installed in the *Neurodesktop* container, we are currently following these guiding principles:
1) *Neurodesk* is not a package manager. This means we are not distributing tools in containers that can easily be installed via a standard package manager. 
2) *Neurodesk* allows users to have multiple versions of tools in parallel via [lmod]( https://lmod.readthedocs.io/en/latest), this means that if different versions of a tool can't be installed in parallel we package the tool inside a container.
3) *Neurodesk* aims to provide tooling to link tools from different containers (such as workflow managers like nipype or nextflow). This means that if a tool is required to coordinate various container-tools, it should be in the *Neurodesktop* container.


Examples:
|            | easy install | coordinates containers | small in size | latest version is ok | useful to most users   | Conclusion                     |
|------------|--------------|------------------------|---------------|----------------------|------------------------|--------------------------------|
| git        | yes          | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| lmod       | no           | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| nipype     | yes          | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| vscode     | yes          | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| itksnap    | yes          | no                     | yes           | yes                  | yes                    | container?                     |
| convert3D  | yes          | no                     | yes           | no                   | no                     | container                      |
| fsl        | no           | no                     | no            | no                   | no                     | container                      |
| mrtrix     | no           | no                     | no            | no                   | no                     | container                      |
| freesurfer | no           | no                     | no            | no                   | no                     | container                      |


## Adding new tools:
Follow either of these instructions to add new tools 

via [interactive container builder](https://www.neurodesk.org/developers/new_tools/interactive_build)

Or

via [manual container builder](https://www.neurodesk.org/developers/new_tools/manual_build)
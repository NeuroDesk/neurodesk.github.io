---
title: "How to add new tools"
linkTitle: "How to add new tools"
weight: 4
alaises:
- /developers/add_tool
- /developers/new_tools/add_tool
description: >
  How to add new tools to neurodesk
---

## Guiding principles 
To decide if a tool should be packaged in a **Neurocontainers** or be installed in the **Neurodesktop container**, we are currently following these guiding principles:

**1) Neurodesk as a Platform, Not a Package Manager:** We don't distribute tools that can be easily installed via standard package managers.

**2) Multiple versions of tools:** Neurodesk supports the use of multiple versions of a tool in parallel via [lmod]( https://lmod.readthedocs.io/en/latest). If a tool doesn't support this, follow [this instruction](#adding-new-tools-to-neurocontainers) to package it in [Neurocontainers](https://github.com/NeuroDesk/neurocontainers).

**3) Inter-Container Tool Linking:** Neurodesk is designed to facilitate the linking of tools from different containers, such as workflow managers like nipype or nextflow. Therefore, if a tool is needed to coordinate various container-tools, [create an issue](https://github.com/NeuroDesk/neurodesktop/issues/new) to have it installed directly in the [Neurodesktop container](https://github.com/NeuroDesk/neurodesktop).

**Examples:**
|            | easy install | coordinates containers | small in size | latest version is ok | useful to most users   | Conclusion                     |
|------------|--------------|------------------------|---------------|----------------------|------------------------|--------------------------------|
| git        | yes          | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| lmod       | no           | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| itksnap    | yes          | no                     | yes           | yes                  | yes                    | neurocontainer                     |
| convert3D  | yes          | no                     | yes           | no                   | no                     | neurocontainer                      |
| fsl        | no           | no                     | no            | no                   | no                     | neurocontainer                      |


## Adding new tools to Neurocontainers:
Follow either of these instructions to add new tools 

via [interactive container builder](https://www.neurodesk.org/developers/new_tools/interactive_build)

Or

via [manual container builder](https://www.neurodesk.org/developers/new_tools/manual_build)
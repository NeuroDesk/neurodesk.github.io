---
title: "Add tools"
linkTitle: "Add tools"
weight: 1
description: >
  Add a tool to neurodesktop
---

The goal of *neurodesk* is to provide users with a large choice of tools to use in their pipelines.
Use the guide below to add a tool to *neurodesktop* or *neurocontainers*. 

## Guiding principles 
To decide if a tool should be packaged in a singularity container in *neurocontainers* or be installed in the *neurodesktop* container we are currently following these guiding principles:
1) *neurodesk* is not a package manager. This means we are not distributing tools in containers that can easily be installed via a standard package manager 
2) *neurodesk* allows users to have multiple versions of tools in parallel via [lmod]( https://lmod.readthedocs.io/en/latest/), this means that if different versions of a tool can't be installed in parallel we package the tool inside a container.
3) *neurodesk* aims to provide tooling to link tools from different containers (such as workflow managers like nipype or nextflow). This means that if a tool is required to coordinate various container-tools, it should be in the *neurodesktop* container.


Examples:
|            | easy install | coordinates containers | small in size | latest version is ok | useful more most users | Conclusion                     |
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


## Adding new recipes
Refer to [neurodocker](https://github.com/NeuroDesk/neurodocker) for more information on neurodocker recipes  



## Build container
To build a container:
1) Add recipe to neurodocker if relevant (https://github.com/NeuroDesk/neurodocker) and create a pull request to neurodocker
To add an application (e.g. _newapp_), follow these steps.
2) Clone the repository https://github.com/NeuroDesk/neurocontainers
3) Copy the directory template and rename to _newapp_ in `neurocontainers/recipes`
4) Modify `build.sh` in `neurocontainers/recipes/newapp` to build your application and update README.md (make sure the version is correct in the README!)
5) Run update-builders.sh - This will auto-create the CI workflow for the application (or manually duplicate the template file and rename all occurances of template to _newapp_)
6) Build the container locally (e.g. running the build script with the --debug flag: https://github.com/NeuroDesk/neurocontainers/blob/master/recipes/lcmodel/build.sh)
7) Test the container, and if successful push repo to trigger the automatic build on GitHub
8) send a pull request to add the container to the apps.json file: https://github.com/NeuroDesk/neurocommand/blob/main/neurodesk/apps.json
9) (once accepted this will trigger an action to build the singularity container, distribute it in all object storage locations and on CVMFS, and it will update the menus in the desktop image on the next daily build)

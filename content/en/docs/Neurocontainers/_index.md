---
title: "Neurocontainers"
linkTitle: "Neurocontainers"
weight: 4
description: >
  What neurocontainers are about
---

## Automatic container building and testing

The containers can for be used in combination with our [transparent singularity](https://github.com/NeuroDesk/transparent-singularity/) or [neurocommand](https://github.com/NeuroDesk/neurocommand/) tool, that wrap the executables inside a container to make them easily available for pipelines:

The containers are hosted on [dockerhub](https://hub.docker.com/orgs/vnmd/repositories) or on [github](https://github.com/NeuroDesk/neurocontainers/packages)

## Pull containers
e.g. for a julia container
docker
```
docker pull vnmd/julia_1.6.1
```

build singularity image from dockerhub
```
singularity build julia_1.6.1.simg docker://vnmd/julia_1.6.1
```

Replace `julia_1.6.1` with your selected application

## Adding new recipes
Refer to [neurodocker](https://github.com/NeuroDesk/neurodocker) for more information on neurodocker recipes  

To add an application (e.g. _newapp_), follow these steps.
1. Clone the repository
2. Copy the directory template and rename to _newapp_ in `caid/recipes`
3. Modify `build.sh` in `caid/recipes/newapp` to build your application and update README.md
4. Run update-builders.sh from caid. This will auto-create the CI workflow for the application (or duplicate the template file and rename all occurances of template to _newapp_)
5. git commit and push
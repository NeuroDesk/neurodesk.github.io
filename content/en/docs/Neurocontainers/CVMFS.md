---
title: "Neurocontainers"
linkTitle: "Neurocontainers"
weight: 4
description: >
  Singularity Containers on CVMFS
---

## Automatic container building and testing

The containers can be used in combination with our [transparent singularity](https://github.com/NeuroDesk/transparent-singularity/) or [neurocommand](https://github.com/NeuroDesk/neurocommand/) tool, that wrap the executables inside a container to make them easily available for pipelines:

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



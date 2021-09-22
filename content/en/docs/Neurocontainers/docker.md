---
title: "Docker"
linkTitle: "Docker"
weight: 4
description: >
  Neurodesk Docker containers
---

Our containers are automatically built in https://github.com/NeuroDesk/neurocontainers/ and hosted on [dockerhub](https://hub.docker.com/orgs/vnmd/repositories) or on [github](https://github.com/NeuroDesk/neurocontainers/packages)

## Pull Docker containers
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


## Transparent Singularity
The containers can be used in combination with our [transparent singularity](https://github.com/NeuroDesk/transparent-singularity/) tool, that wrap the executables inside a container to make them easily available for pipelines.
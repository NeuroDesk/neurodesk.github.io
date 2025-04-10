---
title: "Docker"
linkTitle: "Docker"
aliases:
- /docs/getting-started/neurocontainers/docker
description: >
  Neurodesk Docker containers
---

Our containers are automatically built in https://github.com/NeuroDesk/neurocontainers/ and hosted on [dockerhub](https://hub.docker.com/u/vnmd) and on [github](https://github.com/NeuroDesk/neurocontainers/packages)

## Pull Docker containers
e.g. for a julia container
docker
```bash
docker pull vnmd/julia_1.6.1
```

You an also build singularity images from dockerhub
```bash
singularity build julia_1.6.1.simg docker://vnmd/julia_1.6.1
```

Replace `julia_1.6.1` with your selected application. You can find the available containers here: https://www.neurodesk.org/applications/

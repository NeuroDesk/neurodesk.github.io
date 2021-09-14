---
title: "Neurocontainers"
linkTitle: "Neurocontainers"
weight: 4
description: >
  What neurocontainers are about
---

Neurocontainers is our collection of neuro containers hosted on dockerhub (https://hub.docker.com/orgs/vnmd/repositories) or github (https://github.com/NeuroDesk/neurocontainers/packages)

# pull containers
docker
```
docker pull vnmd/julia_1.6.1
```

build singularity image from dockerhub
```
singularity build julia_1.6.1.simg docker://vnmd/julia_1.6.1
```


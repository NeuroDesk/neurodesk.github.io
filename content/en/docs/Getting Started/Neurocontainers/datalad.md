---
title: "DataLad"
linkTitle: "DataLad"
aliases:
- /docs/getting-started/neurocontainers/datalad
description: >
  Use Neurodesktop containers with DataLad and ReproNim's containerized workflows.
---

# Using Neurodesk Containers with DataLad
This page explains how to use [DataLad](https://www.datalad.org/) and the [ReproNim containers](https://github.com/ReproNim/containers) with Neurodesk tools.

## Install DataLad, datalad-container, and the ReproNim containers repository
```bash
conda install datalad
pip install datalad_container
datalad install https://github.com/ReproNim/containers.git
cd containers
```

## List all default available containers
```bash
datalad containers-list
```

## Download and run the latest container version
```bash
datalad containers-run -n neurodesk-romeo
```

## Change version of container
You can change which version of a container is used in two ways:

### Option 1: change version in .datalad/config
```bash
vi .datalad/config
# now change the version of the container you like
# all available containers can be seen via `ls images/neurodesk`
datalad save -m 'downgraded version of romeo to x.x.x'
datalad containers-run -n neurodesk-romeo
```

### Option 2: change version using freeze_versions script
```bash
# all available containers can be seen via `ls images/neurodesk`
scripts/freeze_versions neurodesk-romeo=3.2.4
datalad save -m 'downgraded version of romeo to 3.2.4'
datalad containers-run -n neurodesk-romeo
```

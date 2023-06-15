---
title: "DataLad"
linkTitle: "DataLad"
aliases:
- /docs/getting-started/neurocontainers/datalad
description: >
  Neurodesktop containers can be used with datalad
---

## install datalad, datalad-containers, and ReproNim containers repo
```bash
conda install datalad
pip install datalad_container
datalad install https://github.com/ReproNim/containers.git
cd containers
```

## get a list of all available default containers
```bash
datalad containers-list
```

## download and run the latest container version
```bash
datalad containers-run -n neurodesk-romeo
```

## Change version of container

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


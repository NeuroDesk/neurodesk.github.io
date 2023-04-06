---
title: "Datalad"
linkTitle: "Datalad"
description: >
  Neurodesktop containers can be used in datalad container run
---

## install datalad, datalad-containers, ReproNim containers repo
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

## download and run latest container version
```bash
datalad containers-run -n neurodesk-romeo
```

## Change version of container
```bash
vi .datalad/config
# now change the version of the container you like
# all available containers can be seen via `ls images/neurodesk`
datalad save -m 'downgraded version of romeo to x.x.x'
datalad containers-run -n neurodesk-romeo
```


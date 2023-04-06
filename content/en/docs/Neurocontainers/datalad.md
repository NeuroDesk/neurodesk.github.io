---
title: "Datalad"
linkTitle: "Datalad"
description: >
  Neurodesktop containers can be used in datalad container run
---

# install datalad, datalad-containers, ReproNim containers repo
```bash
conda install datalad
pip install datalad_container
datalad install https://github.com/ReproNim/containers.git
cd containers
```

# get a list of all available containers
```bash
datalad containers-list
```

# download and run latest container version
```bash
datalad containers-run -n neurodesk-romeo
```

# Change version of container
```bash
vi .datalad/config
```


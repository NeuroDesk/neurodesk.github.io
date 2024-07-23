---
title: "Singularity"
linkTitle: "Singularity"
aliases:
- /docs/getting-started/neurocontainers/singularity
description: >
  Neurodesk Singularity Containers
---

Our docker containers are converted to singularity containers and stored on Object storage.

## Download Singularity Containers
First get an overview of which containers are available as Singularity containers:
https://github.com/NeuroDesk/neurocommand/blob/main/cvmfs/log.txt
```shell
curl -s https://raw.githubusercontent.com/NeuroDesk/neurocommand/main/cvmfs/log.txt
```

assign the container name to a variable:
```shell
export container=itksnap_3.8.0_20201208
```

Then download the containers. One way is to use CURL:
```shell
curl -X GET https://neurocontainers.neurodesk.org/$container.simg -O
```

## Singularity Containers and GPUs
Some of our containers contain GPU-accelerated applications. Here is an example that tests the GPU accelerated program eddy in FSL:

```shell
curl -X GET https://neurocontainers.neurodesk.org/fsl_6.0.5.1_20221016.simg -O
git clone https://github.com/neurolabusc/gpu_test.git
singularity shell --nv fsl_6.0.5.1_20221016.simg
cd gpu_test/etest/
bash runme_gpu.sh
```

## Transparent Singularity
The singularity containers can be also be used in combination with our [Transparent Singularity Tool](/developers/architecture/transparent_singularity), which wraps the executables inside a container to make them easily available for pipelines. More information can be found here: 

one example to do this is:
```shell
curl -s https://raw.githubusercontent.com/NeuroDesk/neurocommand/main/cvmfs/log.txt
export container=itksnap_3.8.0_20201208
git clone https://github.com/NeuroDesk/transparent-singularity ${container}
cd ${container}
./run_transparent_singularity.sh ${container}
```

---
title: "Singularity"
linkTitle: "Singularity"
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

Then download the containers. An easy way is to use CURL (e.g. downloading from the US location):
```shell
curl -X GET https://objectstorage.us-ashburn-1.oraclecloud.com/n/sd63xuke79z3/b/neurodesk/o/${container}.simg -O
```
or from australia
```shell
curl -X GET https://objectstorage.ap-sydney-1.oraclecloud.com/n/sd63xuke79z3/b/neurodesk/o/${container}.simg -O
```
or from europe
```shell
curl -X GET https://objectstorage.eu-frankfurt-1.oraclecloud.com/n/sd63xuke79z3/b/neurodesk/o/${container}.simg -O
```


A faster way is pulling from multiple storage locations at once using aria2: 
```shell
aria2c https://objectstorage.us-ashburn-1.oraclecloud.com/n/sd63xuke79z3/b/neurodesk/o/${container}.simg https://objectstorage.eu-frankfurt-1.oraclecloud.com/n/sd63xuke79z3/b/neurodesk/o/${container}.simg https://objectstorage.ap-sydney-1.oraclecloud.com/n/sd63xuke79z3/b/neurodesk/o/${container}.simg 
```

## Singularity Containers and GPUs
Some of our containers contain GPU-accelerated applications. Here is an example that tests the GPU accelerated program eddy in FSL:

```
curl -X GET https://objectstorage.ap-sydney-1.oraclecloud.com/n/sd63xuke79z3/b/neurodesk/o/fsl_6.0.5.1_20221016.simg -O
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

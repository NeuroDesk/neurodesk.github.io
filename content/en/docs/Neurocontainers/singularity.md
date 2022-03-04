---
title: "Singularity"
linkTitle: "Singularity"
description: >
  Neurodesk Singularity Containers
---

Our docker containers are converted to singularity containers and stored on Object storage.

## Download Singularity Containers
First get an overview which containers are available as Singularity containers:
https://github.com/NeuroDesk/neurodesk/blob/master/cvmfs/log.txt
```shell
curl -s https://raw.githubusercontent.com/NeuroDesk/neurodesk/master/cvmfs/log.txt
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


A faster way is pulling from multiple storage locations at once using aria2: 
```shell
aria2c https://objectstorage.us-ashburn-1.oraclecloud.com/n/sd63xuke79z3/b/neurodesk/o/${container}.simg https://objectstorage.eu-frankfurt-1.oraclecloud.com/n/sd63xuke79z3/b/neurodesk/o/${container}.simg https://objectstorage.ap-sydney-1.oraclecloud.com/n/sd63xuke79z3/b/neurodesk/o/${container}.simg https://swift.rc.nectar.org.au/v1/AUTH_dead991e1fa847e3afcca2d3a7041f5d/neurodesk/${container}.simg
```

## Transparent Singularity
The singularity containers can be also be used in combination with our [Transparent Singularity Tool](/developers/transparent_singularity//)  tool, that wraps the executables inside a container to make them easily available for pipelines. More information can be found here: 

one example to do this is:
```shell
curl -s https://raw.githubusercontent.com/NeuroDesk/neurodesk/master/cvmfs/log.txt
export container=itksnap_3.8.0_20201208
git clone https://github.com/NeuroDesk/transparent-singularity ${container}
cd ${container}
./run_transparent_singularity.sh ${container}
```
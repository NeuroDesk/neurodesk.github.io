---
title: "Oracle Open Data"
linkTitle: "Oracle Open Data"
weight: 1
tags: ["Oracle Open Data"]
author: Steffen Bollmann
aliases:
- /tutorials/open_data/oracle
description: >
  Using Oracle Open Data to publish and access open data on OSF
---

> _This tutorial was created by Steffen Bollmannn._
>
> Github: @stebo85

Oracle Open Data is an open platform for scientific data

# Publish a dataset

To publish your data there you need to get in touch with Oracle and create a project. The upload then is done via the OCI command line tool. We for example uploaded one our datasets there: https://opendata.oraclecloud.com/ords/r/opendata/opendata/details?data_set_id=28&clear=RR,5


# Access a dataset

To download a dataset from Oracle Open data you can use curl or wget:
```Bash

wget https://objectstorage.us-ashburn-1.oraclecloud.com/n/idrvm4tkz2a8/b/TOMCAT/o/TOMCAT_DIB/sub-01/ses-01_7T/anat/sub-01_ses-01_7T_IV1_defaced.nii.gz
curl -OL https://objectstorage.us-ashburn-1.oraclecloud.com/n/idrvm4tkz2a8/b/TOMCAT/o/TOMCAT_DIB/sub-01/ses-01_7T/anat/sub-01_ses-01_7T_IV1_defaced.nii.gz

```

Or you can mount the object storage bucket inside NeuroDesk using rlcone (requires rclone v1.60.1 + this does not work on the hosted Neurodesk instances on play.neurodesk.org due to limited privileges):
```Bash
mkdir -p ~/TOMCAT
rclone mount opendata3p:TOMCAT ~/TOMCAT &
```

This assumes the following ~/.config/rclone/rclone.conf configuration (which is setup already for you inside Neurodesk):
```Bash
[opendata3p]
type = oracleobjectstorage
provider = no_auth
namespace = idrvm4tkz2a8
region = us-ashburn-1
```
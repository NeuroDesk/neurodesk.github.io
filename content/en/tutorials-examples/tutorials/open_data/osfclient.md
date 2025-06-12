---
title: "osfclient"
linkTitle: "osfclient"
weight: 1
tags: ["osfclient"]
author: Steffen Bollmann
aliases:
- /tutorials/open_data/osfclient
description: >
  Using osfclient to publish and access open data on OSF
---

> _This tutorial was created by Steffen Bollmannn._
>
> Github: @stebo85

<!-- Following line adds a link to getting set up with Neurodesk -->
{{< params/neurodesktop/getting_set_up >}}
<!-- -->

The osfclient is an open-source tool to publish and access open datasets on the Open Science Framework (OSF): http://osf.io/

# Setup an OSF token

You can generate an OSF token under your user [settings](https://osf.io/settings/tokens). Then, set the OSF token as an environment variable:
```Bash
export OSF_TOKEN=YOURTOKEN
```

# Publish a dataset

Here is an example how to publish a dataset on the OSF:
```Bash
cd /path/to/dataset
osf init
# enter your OSF credentials and project ID

# now copy your data into the directory, cd into the directory and then run:
osf upload -r ./data osfstorage/data

# beware, hidden files may need to be deleted

```

### Note for those who have used ORCID to create their account / log in

You can still use OSF to upload, but you need to use the TOKEN as the username in osf init (from testing, you don't need to export the OSF_TOKEN variable).
It won't ask you for a password. 

### Note on storage for OSF

The limits are now 5GB for private repo, 50gb for public repo as of 2025. 

# Access a dataset

To download a dataset from the OSF:
```Bash
osf -p PROJECTID_HERE_eg_y5cq9 clone .
```

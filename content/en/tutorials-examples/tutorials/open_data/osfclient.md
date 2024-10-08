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
osf init
# enter your OSF credentials and project ID

# now copy your data into the directory, cd into the directory and then run:
osf upload -r . osfstorage/data

```

# Access a dataset

To download a dataset from the OSF:
```Bash
osf -p PROJECTID_HERE_eg_y5cq9 clone .
```

---
title: "datalad"
linkTitle: "datalad"
weight: 1
tags: ["datalad"]
author: Steffen Bollmann
aliases:
- /tutorials/open_data/datalad
description: >
  Using datalad to publish and access open data on OSF
---

> _This tutorial was created by Steffen Bollmannn._
>
> Github: @stebo85

DataLad is an open-source tool to publish and access open datasets. In addition to many open data sources (OpenNeuro, CBRAIN, brainlife.io, CONP, DANDI, Courtois Neuromod, Dataverse, Neurobagel), it can also connect to the Open Science Framework (OSF): http://osf.io/

# Publish a dataset

First we have to create a DataLad dataset:
```Bash
datalad create my_dataset

# now add files to your project and then add save the files with datalad
datalad save -m "added new files"

```

Now we can create a token on OSF (Account Settings -> Personal access tokens -> Create token) and authenticate:
```Bash
datalad osf-credentials

```


Here is an example how to publish a dataset on the OSF:
```Bash

# create sibling
datalad create-sibling-osf --title best-study-ever -s osf

# push
datalad push --to osf

```

The last steps creates a DataLad dataset, which is not easily human readable.

If you would like to create a human-readable dataset (but without the option of downloading it as a datalad dataset later on):

```Bash

# create sibling
datalad create-sibling-osf --title best-study-ever-human-readable --mode exportonly -s osf-export

git-annex export HEAD --to osf-export-storage

```

# Access a dataset

To download a dataset from the OSF (if it was uploaded as a DataLad dataset before):
```Bash
datalad clone osf://ehnwz

cd ehnwz

# now get the files you want to download:
datalad get .
```

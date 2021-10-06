---
title: "fMRI BIDS Conversion"
linkTitle: "fMRI BIDS"
weight: 1
description: >
  Example workflow for fMRI BIDS
---

## Download demo data
Here we would also like to show how to combine tools from different containers using the module system. Open a terminal and run:
```
ml datalad/0.13.3 
cd /neurodesktop-storage/
datalad create bids-conversion
cd bids-conversion/
datalad clone --dataset . https://github.com/datalad/example-dicom-functional.git inputs/rawdata
```


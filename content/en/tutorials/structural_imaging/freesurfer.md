---
title: "FreeSurfer"
linkTitle: "FreeSurfer"
weight: 1
description: >
  Example workflow for FreeSurfer
---

## Download demo data
Open a terminal and run:
```
pip install osfclient
osf -p bt4ez fetch TOMCAT_DIB/sub-01/ses-01_7T/anat/sub-01_ses-01_7T_T1w_defaced.nii.gz /storage/sub-01_ses-01_7T_T1w_defaced.nii.gz
```

## FreeSurfer License file:
Before using Freesurfer you need to request a license here (https://surfer.nmr.mgh.harvard.edu/registration.html) and store it in your homedirectory as ~/.license

## FreeSurfer Example
Open FreeSurfer (Neurodesk -> Image Segmentation -> Freesurfer -> Freesurfer 7.1.1)

Setup FreeSurfer license (for example - replace with your license):
```
echo "Steffen.Bollmann@cai.uq.edu.au
> 21029
>  *Cqyn12sqTCxo
>  FSxgcvGkNR59Y" >> ~/.license

export FS_LICENSE=~/.license 
```

Setup FreeSurfer:
```
mkdir /storage/freesurfer-output
source /opt/freesurfer-7.1.1/SetUpFreeSurfer.sh
export SUBJECTS_DIR=/storage/freesurfer-output
```

Run Recon all pipeline:
```
recon-all -subject test-subject -i /storage/sub-01_ses-01_7T_T1w_defaced.nii.gz -all
```
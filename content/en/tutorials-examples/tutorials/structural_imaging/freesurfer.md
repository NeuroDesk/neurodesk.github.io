---
title: "FreeSurfer"
linkTitle: "FreeSurfer"
weight: 1
aliases:
- /tutorials/structural_imaging/freesurfer
description: >
  Example workflow for FreeSurfer
---

> _This tutorial was created by Steffen Bollmann._
>
> Github: [@stebo85](https://github.com/stebo85)
> Web: [mri.sbollmann.net](https://mri.sbollmann.net/)
> Twitter: [@sbollmann_MRI](https://twitter.com/sbollmann_MRI)

<!-- Following line adds a link to getting set up with Neurodesk -->
{{< params/neurodesktop/getting_set_up >}}
<!-- -->

## FreeSurfer Example using module load (e.g. on an HPC)
Download data:
```
osf -p bt4ez fetch osfstorage/TOMCAT_DIB/sub-01/ses-01_7T/anat/sub-01_ses-01_7T_T1w_defaced.nii.gz ./sub-01_ses-01_7T_T1w_defaced.nii.gz
```

Setup FreeSurfer:
```
ml freesurfer/7.3.2
export SUBJECTS_DIR=$PWD/freesurfer-output
mkdir $SUBJECTS_DIR
export SINGULARITYENV_SUBJECTS_DIR=$SUBJECTS_DIR
export APPTAINERENV_SUBJECTS_DIR=$SUBJECTS_DIR
```

Run Recon all pipeline:
```
recon-all -subject test-subject -i ~/sub-01_ses-01_7T_T1w_defaced.nii.gz -all
```

When using Freesurfer >8.0.0:
```
export FS_ALLOW_DEEP=1
export APPTAINERENV_FS_ALLOW_DEEP=$FS_ALLOW_DEEP
export SINGULARITYENV_FS_ALLOW_DEEP=$FS_ALLOW_DEEP
```

## Alternative instructions for using Freesurfer via the Neurodesk application menu
### Download demo data
Open a terminal and run:
```
pip install osfclient
osf -p bt4ez fetch TOMCAT_DIB/sub-01/ses-01_7T/anat/sub-01_ses-01_7T_T1w_defaced.nii.gz /neurodesktop-storage/sub-01_ses-01_7T_T1w_defaced.nii.gz
```

### FreeSurfer License file:
Before using Freesurfer you need to request a license here (https://surfer.nmr.mgh.harvard.edu/registration.html) and store it in your homedirectory as ~/.license

### FreeSurfer Example
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
mkdir /neurodesktop-storage/freesurfer-output
source /opt/freesurfer-7.1.1/SetUpFreeSurfer.sh
export SUBJECTS_DIR=/neurodesktop-storage/freesurfer-output
```

Run Recon all pipeline:
```
recon-all -subject test-subject -i /neurodesktop-storage/sub-01_ses-01_7T_T1w_defaced.nii.gz -all
```


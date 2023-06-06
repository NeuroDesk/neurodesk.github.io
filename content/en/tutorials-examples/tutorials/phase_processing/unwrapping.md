---
title: "Unwrapping"
linkTitle: "Unwrapping"
weight: 1
aliases:
- /tutorials/phase_processing/unwrapping
description: >
  MRI Phase Unwrapping
---

> _This tutorial was created by Steffen Bollmann._
>
> Github: [@stebo85](https://github.com/stebo85)
> Web: [mri.sbollmann.net](https://mri.sbollmann.net/)
> Twitter: [@sbollmann_MRI](https://twitter.com/sbollmann_MRI)

<!-- Following line adds a link to getting set up with Neurodesk -->
{{< params/neurodesktop/getting_set_up >}}
<!-- -->

## Download demo data
Open a terminal and run:
```
pip install osfclient
cd /neurodesktop-storage/
osf -p ru43c fetch 01_bids.zip /neurodesktop-storage/swi-demo/01_bids.zip

unzip /neurodesktop-storage/swi-demo/01_bids.zip -d /neurodesktop-storage/swi-demo/


mkdir /neurodesktop-storage/romeo-demo/

cp /neurodesktop-storage/swi-demo/01_bids/sub-170705134431std1312211075243167001/ses-1/anat/sub-170705134431std1312211075243167001_ses-1_acq-qsmPH00_run-1_phase.nii.gz /neurodesktop-storage/romeo-demo/phase.nii.gz

cp /neurodesktop-storage/swi-demo/01_bids/sub-170705134431std1312211075243167001/ses-1/anat/sub-170705134431std1312211075243167001_ses-1_acq-qsm_run-1_magnitude.nii.gz /neurodesktop-storage/romeo-demo/mag.nii.gz

gunzip /neurodesktop-storage/romeo-demo/mag.nii.gz
gunzip /neurodesktop-storage/romeo-demo/phase.nii.gz
```

### Using ROMEO for phase unwrapping
Open the ROMEO tool from the application menu and run:
```
romeo -p /neurodesktop-storage/romeo-demo/phase.nii -m /neurodesktop-storage/romeo-demo/mag.nii -k nomask -o /neurodesktop-storage/romeo-demo/
```
![Romeo](/MRIPhase_Tutorial/romeo.PNG 'Romeo')



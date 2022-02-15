---
title: "Unwrapping"
linkTitle: "Unwrapping"
weight: 1
description: >
  MRI Phase Unwrapping
---

## Download demo data
Open a terminal and run:
```
pip install osfclient
cd /storage/
osf -p ru43c fetch 01_bids.zip /storage/swi-demo/01_bids.zip

unzip /storage/swi-demo/01_bids.zip -d /storage/swi-demo/


mkdir /storage/romeo-demo/

cp /storage/swi-demo/01_bids/sub-170705134431std1312211075243167001/ses-1/anat/sub-170705134431std1312211075243167001_ses-1_acq-qsmPH00_run-1_phase.nii.gz /storage/romeo-demo/phase.nii.gz

cp /storage/swi-demo/01_bids/sub-170705134431std1312211075243167001/ses-1/anat/sub-170705134431std1312211075243167001_ses-1_acq-qsm_run-1_magnitude.nii.gz /storage/romeo-demo/mag.nii.gz

gunzip /storage/romeo-demo/mag.nii.gz
gunzip /storage/romeo-demo/phase.nii.gz
```

### Using ROMEO for phase unwrapping
Open the ROMEO tool from the application menu and run:
```
romeo -p /storage/romeo-demo/phase.nii -m /storage/romeo-demo/mag.nii -k nomask -o /storage/romeo-demo/
```
![Romeo](/MRIPhase_Tutorial/romeo.PNG 'Romeo')



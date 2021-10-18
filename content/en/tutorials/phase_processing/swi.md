---
title: "SWI"
linkTitle: "SWI"
weight: 1
description: >
  Example workflow for SWI processing
---

## Download demo data
Open a terminal and run:
```
pip install osfclient
cd /neurodesktop-storage/
osf -p ru43c fetch 01_bids.zip /neurodesktop-storage/swi-demo/01_bids.zip

unzip /neurodesktop-storage/swi-demo/01_bids.zip -d /neurodesktop-storage/swi-demo/
```

Open the CLEARSWI tool from the application menu:

paste this julia script in a julia file and execute:
```
cd /neurodesktop-storage/
vi clearswi.jl
```

hit a or i and then paste this:
```
using CLEARSWI

TEs = [20] 
nifti_folder = "/neurodesktop-storage/swi-demo/01_bids/sub-170705134431std1312211075243167001/ses-1/anat"
magfile = joinpath(nifti_folder, "sub-170705134431std1312211075243167001_ses-1_acq-qsm_run-1_magnitude.nii.gz")
phasefile = joinpath(nifti_folder, "sub-170705134431std1312211075243167001_ses-1_acq-qsmPH00_run-1_phase.nii.gz") 

mag = readmag(magfile);
phase = readphase(phasefile);
data = Data(mag, phase, mag.header, TEs);

swi = calculateSWI(data);
# mip = createIntensityProjection(swi, minimum); # minimum intensity projection, other Julia functions can be used instead of minimum
mip = createMIP(swi); # shorthand for createIntensityProjection(swi, minimum)

savenii(swi, "/neurodesktop-storage/swi-demo/swi.nii"; header=mag.header) 
savenii(mip, "/neurodesktop-storage/swi-demo/mip.nii"; header=mag.header)
```

hit SHIFT-Z-Z and run:
```
julia clearswi.jl
```

Open ITK snap from the Visualization Application's menu and inspect the results (the outputs are in swi-demo/swi.nii and mip.nii)
![image](https://user-images.githubusercontent.com/4021595/137708852-6b7dd2c7-3e6f-42fd-88e6-06afe87a72a9.png)

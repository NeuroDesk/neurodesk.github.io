---
title: "Statistical Parametric Mapping (SPM)"
linkTitle: "SPM"
weight: 1
tags: ["SPM", "functional imaging"]
author: Steffen Bollmann
description: > 
  A tutorial for running a functional MRI analysis in SPM.
---


> _This tutorial was created by Steffen Bollmann._ 
>
> Email: s.bollmannn@uq.edu.au
>
> Github: @stebo85
>
> Twitter: @sbollmann_MRI
>
<!-- Fill in your personal details above so that we can credit the tutorial to you. Feel free to add any additional contact details i.e. website, or remove those that are irrelevant -->

This tutorial is based on the excellent tutorial from Andy's Brain book: https://andysbrainbook.readthedocs.io/en/latest/SPM/SPM_Overview.html
Our version here is a shortened and adjusted version for using on the Neurodesk platform.

## Download data
First, let's download the data. We will use this open dataset: https://openneuro.org/datasets/ds000102/versions/00001/download

Open a terminal and use datalad to install the dataset:
```
cd neurodesktop-storage
datalad install https://github.com/OpenNeuroDatasets/ds000102.git

```
<img width="839" alt="image" src="https://user-images.githubusercontent.com/4021595/197097444-900ad262-fbca-4cac-adea-3c7b67a4ecc5.png">

We will use subject 08 as an example here, so we use datalad to download sub-08 and since SPM doesn't support compressed files, we need to unpack them:
```
cd ds000102
datalad get sub-08/
gunzip sub-08/anat/sub-08_T1w.nii.gz -f
gunzip sub-08/func/sub-08_task-flanker_run-1_bold.nii.gz -f
gunzip sub-08/func/sub-08_task-flanker_run-2_bold.nii.gz -f
chmod a+rw sub-08/ -R
```

The task used is described here: https://andysbrainbook.readthedocs.io/en/latest/SPM/SPM_Short_Course/SPM_02_Flanker.html

## Starting SPM and visualizing the data

Start spm12GUI from the Application Menu:
<img width="727" alt="image" src="https://user-images.githubusercontent.com/4021595/197098330-3c6611a1-8bbb-49da-b6fb-3752452322cc.png">

When the SPM menu loaded, click on fMRI and the full SPM interface should open up:
<img width="1039" alt="image" src="https://user-images.githubusercontent.com/4021595/197098528-aba8f46c-d837-4de5-80c5-07056b784c46.png">

For convenience let's change our default directory to our example subject. Click on `Utils` and select `CD`:
<img width="404" alt="image" src="https://user-images.githubusercontent.com/4021595/197101928-1bdf67a4-8945-43aa-8df3-877af03bf677.png">

Then navigate to sub-08 and select the directory in the right browser window:
<img width="508" alt="image" src="https://user-images.githubusercontent.com/4021595/197102015-2f646e54-0626-4139-b9ac-2ad2a77a2ab6.png">

Now let's visualize the anatomical T1 scan of subject 08 by clicking on Display and navigating and selecting the anatomical scan:
<img width="743" alt="image" src="https://user-images.githubusercontent.com/4021595/197100690-b8e7a0b8-6c0b-47fc-8c5f-46f317396361.png">

<img width="1041" alt="image" src="https://user-images.githubusercontent.com/4021595/197100737-02fdc59e-94df-4895-b756-fc78e5365cfd.png">

Now let's look at the functional scans. Use CheckReg and open run-01. Then right click and `Browse ...`. Then set frames to 1:146 and right click `Select All`

<img width="506" alt="image" src="https://user-images.githubusercontent.com/4021595/197101637-dc486f27-083a-4849-a5af-34666a21e7a4.png">

Now we get a slider viewer and we can investigate all functional scans:
<img width="609" alt="image" src="https://user-images.githubusercontent.com/4021595/197102121-07f1b9c1-3222-4c7c-ad03-eb41e1294460.png">


Let's check the alignment between the anatomical and the functional scans - use CheckReg and open the anatomical and the functional scan. They shouldn't align yet, because we haven't done any preprocessing yet:
<img width="1045" alt="image" src="https://user-images.githubusercontent.com/4021595/197103016-509387f1-4d7e-4237-b745-ae7e837dba11.png">



## Preprocessing the data

### Realignment
Select `Realign (Estimate)` from the SPM Menu:
<img width="416" alt="image" src="https://user-images.githubusercontent.com/4021595/197103347-315f6f03-cd67-4c2d-8e2c-f5d18ee10888.png">

Then select the functional run (important: Select frames from 1:146 again!) and leave everything else as Defaults. Then hit run:
<img width="702" alt="image" src="https://user-images.githubusercontent.com/4021595/197103705-47d0d4cf-10e2-4db1-b4b7-ffda1b49ad47.png">

As an output we should see the realignment parameters:
<img width="623" alt="image" src="https://user-images.githubusercontent.com/4021595/197106717-0850bb27-cb72-48b1-a532-90910e3267d4.png">


## Analyzing the data

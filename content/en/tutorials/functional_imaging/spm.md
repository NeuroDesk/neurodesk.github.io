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
Select `Realign (Est & Reslice)` from the SPM Menu (the third option):
<img width="1121" alt="image" src="https://user-images.githubusercontent.com/4021595/197304865-3560f16d-2950-48f4-9b19-b60f63737dc4.png">

Then select the functional run (important: Select frames from 1:146 again!) and leave everything else as Defaults. Then hit run:
<img width="1120" alt="image" src="https://user-images.githubusercontent.com/4021595/197304966-61159670-71ef-4542-996f-f88dab8bc1d4.png">


As an output we should see the realignment parameters:
<img width="623" alt="image" src="https://user-images.githubusercontent.com/4021595/197106717-0850bb27-cb72-48b1-a532-90910e3267d4.png">

### Slice timing correction
Click on `Slice timing` in the SPM menu to bring up the Slice Timing section in the batch editor:
<img width="1115" alt="image" src="https://user-images.githubusercontent.com/4021595/197303610-f0e989dc-8646-4c97-ae67-ac5a6b07d3e1.png">

Select the realigned images (use filter `rsub` and Frames 1:146) and then enter the parameters:
- Number of Slices = 40
- TR = 2
- TA = 1.95
- Slice order = [1:2:40 2:2:40]
- Reference Slice = 1

<img width="697" alt="image" src="https://user-images.githubusercontent.com/4021595/197303803-36496c19-66fe-46c9-9f7b-c80973f51bee.png">

### Coregistration
Now, we coregister the functional scans and the anatomical scan.

Click on `Coregister (Estimate & Reslice)` (the third option) in the SPM menu to bring up the batch editor:
<img width="1119" alt="image" src="https://user-images.githubusercontent.com/4021595/197304758-19293222-3256-4a32-8901-6741522e28ea.png">

Use the Mean image as the reference and the T1 scan as the source image and hit Play:
<img width="697" alt="image" src="https://user-images.githubusercontent.com/4021595/197305284-f57af4c3-cccc-4f6b-b138-8fbad9d6d51e.png">

Let's use CheckReg again and overlay a Contour (Right Click -> Contour -> Display onto -> all) to check the coregistration between the images:
<img width="621" alt="image" src="https://user-images.githubusercontent.com/4021595/197305422-8798294f-50ae-4207-b014-9c2f416a6721.png">


### Segmentation

Click the `Segmentation` button in the SPM menu:
<img width="697" alt="image" src="https://user-images.githubusercontent.com/4021595/197305608-08c0de6a-faf8-4ae9-ab07-664ce84df586.png">

Then change the following settings:
- Volumes = our coregistered anatomical scan rsub-08-T1w.nii
- Save Bias Corrected = Save Bias Correced
- Deformation Fields = Forward

and hit Play again.

### Apply normalization

Select `Normalize (Write)` from the SPM menu:
<img width="415" alt="image" src="https://user-images.githubusercontent.com/4021595/197305894-36020b36-5e0f-4b06-8e8c-015b7e3b0ba7.png">

For the Deformation Field select the y_rsub-08 file we created in the last step and for the Images to Write select the arsub-08 functional images (Filter ^ar and Frames 1:146):
<img width="515" alt="image" src="https://user-images.githubusercontent.com/4021595/197306004-284c02a8-f5b4-4278-9234-3d302e4dccb5.png">

Hit Play again.

### Checking the normalization

Use CheckReg to make sure that the functional scans (starting with w to indicate that they were warped: warsub-08) align with the template (found in /opt/spm12/spm12_mcr/spm12/spm12/canonical/avg305T1.nii):

<img width="621" alt="image" src="https://user-images.githubusercontent.com/4021595/197306204-c635b3f5-6e89-40de-9c04-5d94dfec10fc.png">

### Smoothing

Click the `Smooth` button in the SPM menu and select the warped functional scans:
<img width="514" alt="image" src="https://user-images.githubusercontent.com/4021595/197306354-60ee76e2-73ac-4fe8-8387-038d10580c99.png">

Then click Play.

You can check the smoothing by using CheckReg again:
<img width="624" alt="image" src="https://user-images.githubusercontent.com/4021595/197306424-8c407cd5-7ba9-4ae3-83ee-4fa8ec22e41f.png">


## Analyzing the data

Click on `Specify 1st-level` - then set the following options:
- Directory: Select the sub-08 top level directory
- Units for desing: Seconds
- Interscan interval: 2
- Data & Design: Click twice on New Subject/Session
- Select the smoothed, warped data from run 1 and run 2 for the two sessions respectively
- Create two Conditions per run and set the following:
- For Run 1:
- Name: Inc
- Onsets (you can copy from here and paste with CTRL-V):    0 10 20 52 88 130 144 174 236 248 260 274  
- Durations: 2 (SPM will assume that it's the same for each event)
- Name: Con
- Onsets: 32 42 64 76 102 116 154 164 184 196 208 222
- Durations: 2
- For Run 2:
- Name: Inc
- Onsets:   0 10 52 64 88 150 164 174 184 196 232 260
- Durations: 2 
- Name: Con
- Onsets: 20 30 40 76 102 116 130 140 208 220 246 274
- Durations: 2 

When done, click the green Play button.

We can Review the design by clicking on `Review` in the SPM menu and selecting the SPM.mat file in the model directory we specified earlier and it should look like this:
<img width="626" alt="image" src="https://user-images.githubusercontent.com/4021595/197309811-da1fb6d2-1eb3-4ed8-9fe7-560292b645a4.png">

### Estimating the model
Click on `Estimate` in the SPM menu and select the SPM.mat file, then hit the green Play button.

### Inference
Now open the `Results` section and select the SPM.mat file again. Then we can test our hypotheses:

Define a new contrast as:
- Name: Incongruent-Congruent
- Contrast weights vector: 0.5 -0.5 0.5 -0.5

<img width="518" alt="image" src="https://user-images.githubusercontent.com/4021595/197309988-5f09952a-fc3d-4a8b-9797-22dbdd165e12.png">

Then we can view the results. Set the following options:
- masking: none”
- p value adjustment to control: Click on “none”, and set the uncorrected p-value to 0.01. 
- extent threshold {voxels}: 10

<img width="622" alt="image" src="https://user-images.githubusercontent.com/4021595/197310053-cde3d7cb-9af1-4a5b-8923-6c26b7b2a5ee.png">



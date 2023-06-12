---
title: "Structural connectivity dMRI"
linkTitle: "Structural connectivity dMRI"
weight: 1
aliases:
- /tutorials/structural_imaging/structuralconnectivity
description: > 
  Example workflow for constructing strutural connectivity (Human connectome project: Single subject)
---


> _This tutorial was created by Joan Amos._ 
>
> Email: joan@std.uestc.edu.cn
> Github: @Joanone

<!-- Following line adds a link to getting set up with Neurodesk -->
{{< params/neurodesktop/getting_set_up >}}
<!-- -->

## References: 
The steps used for this tutorial were from:
- https://github.com/civier/HCP-dMRI-connectome
- https://andysbrainbook.readthedocs.io/en/latest/MRtrix/MRtrix_Course/MRtrix_00_Diffusion_Overview.html
- https://mrtrix.readthedocs.io/en/latest/quantitative_structural_connectivity/structural_connectome.html

## Data Description
### Reference: 
The single subject data (T1w structural and diffusion) used in this tutorial has been minimally preprocessed and was downloaded from:

https://db.humanconnectome.org/

### Download demo data:
- https://1drv.ms/u/s!AjZJgBZ_P9UO8nWvAFwQyKQnrroe?e=6qmRlQ 
- https://1drv.ms/u/s!AjZJgBZ_P9UO8nblYQyUVsibqggs?e=mkwLpQ


## Assumptions:
- You have neurodesk already running from your chrome browser.
- You have sufficient disk space to successfully implement the structural connectivity.
- The structural and diffusion sample data have been unzipped in the mounted storage directory.

### Sample Subject (100307) directory tree structure should include these input files:
- aparc+aseg.nii.gz
- T1w_acpc_dc_restore_brain.nii.gz
- bvals
- bvecs
- data.nii.gz


### Navigate to the mounted storage &rarr; more data &rarr; Create a new folder of your choice &rarr; copy the required input files into a folder &rarr; 100307

N/B: The subfolder used in this tutorial was tagged "Test"

Open a terminal in neurodesk and confirm your input files:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/01_start.png)



###  Activate mrtrix3, fsl and afni software versions of your choice in the neurodesk terminal
N/B: mrtrix3 (3.0.3), afni (21.2.00), fsl(6.0.5.1) versions were used in this tutorial. For reproducibility, the same versions can be maintained.

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/02_activate_softwares.png)



## Step 1: Further pre-processing
Extract data.nii.gz to enable memory-mapping. The extracted files are about 4.5GB:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/03_preproc.png)

Perform mrconvert:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/04_preproc.png)

Extract the response function. Uses stride 0,0,0,1:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/05_preproc.png)

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/06_preproc.png)


Generate mask:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/07_preproc.png)

Generate Fibre Orientation Distributions (FODs):

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/08_preproc.png)


Perform normalization:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/09_preproc.png)

Generate a 5 tissue image:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/10_preproc.png)

Convert the B0 and 5TT image to a compressed format:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/11_preproc.png)

Use "fslroi" to extract the first volume of the segmented dataset which corresponds to the Grey Matter Segmentation:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/12_preproc.png)

Use "flirt" command to perform coregisteration:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/13_preproc.png)


Convert the transformation matrix to a format readable by MRtrix3:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/14_preproc.png)

Coregister the anatomical image to the diffusion image:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/15_preproc.png)

Create the seed boundary which separates the grey from the white matter. The command "5tt2gmwmi" denotes (5 tissue type(segmentation) to grey matter/white matter interface):

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/16_preproc.png)

## Step 2: Tractogram construction

The probabilistic tractography which is the default in MRtrix is used in this tutorial. The default method is the iFOD2 algorithm. 
The number of streamlines used is 10 million, this was chosen to save computational time:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/17_tractogram.png)

Proceed to Step 3 when the process above is completed (100%).

## Step 3: SIFT2 construction
The generated streamlines can be refined with tcksift2 to counterbalance the overfitting. This creates a text file containing weights for each voxel in the brain:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/18_sift2.png)

## Step 4: Connectome construction
In constructing the connectome, the desikan-killany atlas which includes the cortical and sub-cortical regions (84 regions) was used.

Copy the "FreeSurferColorLUT.txt" file from the ml freesurfer 7.2.0 singularity container to the subject's folder:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/19_connectome.png)
![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/20_connectome.png)

Copy the "fs_default.txt" file from the ml mrtrix3 3.0.3 singularity container to the subject's folder:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/21_connectome.png)

The command labelconvert uses the parcellation and segmentation output of FreeSurfer to create a new parcellated file in .mif format:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/22_connectome.png)

Perform nodes co-registeration:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/23_connectome.png)


Create a whole-brain connectome which denotes the streamlines between each parcellation pair in the atlas. The "symmetric" option  makes the lower and upper diagonal the same, the "scale_invnodevol" option scales the connectome by the inverse of the size of the node:

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/24_connectome.png)

## Viewing the connectome

The generated nodes.csv file can be viewed outside neurodesk as a matrix in Matlab.

```
connectome=importdata('nodes.csv');
imagesc(connectome,[0 1])

```

![structuralconnectivity](/tutorials/structural_imaging/structuralconnectivity/25_connectome.png)


Congratulations on constructing a single subject's structural connectome with neurodesk! Running multiple subjects would require scripting. Kindly consult the references above.
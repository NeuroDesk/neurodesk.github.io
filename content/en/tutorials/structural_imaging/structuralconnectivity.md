---
title: "Structural connectivity dMRI"
linkTitle: "Structural connectivity dMRI"
weight: 1
description: > 
  Example workflow for constructing strutural connectivity (Human connectome project: Single subject)
---


> _This tutorial was created by Joan Amos._ 
>
> Email: joan@std.uestc.edu.cn
> Github: @Joanone

## References: 
The steps used for this tutorial were referenced from:
https://github.com/civier/HCP-dMRI-connectome
https://andysbrainbook.readthedocs.io/en/latest/MRtrix/MRtrix_Course/MRtrix_00_Diffusion_Overview.html
https://mrtrix.readthedocs.io/en/latest/quantitative_structural_connectivity/structural_connectome.html

## Data Description
### Reference: 
The single subject data used in this tutorial has been preprocessed and was downloaded from:

https://db.humanconnectome.org/

100307_3T_Structural_preproc.zip
100307_3T_Diffusion_preproc.zip

### Download demo data:
https://1drv.ms/u/s!AjZJgBZ_P9UO8nWvAFwQyKQnrroe?e=6qmRlQ - Diffusion data
https://1drv.ms/u/s!AjZJgBZ_P9UO8nblYQyUVsibqggs?e=mkwLpQ - Structural data

### Required structural preprocessed input files
aparc+aseg.nii.gz
T1w_acpc_dc_restore_brain.nii.gz
 
### Required diffusion preprocessed input files
bvals
bvecs
data.nii.gz

## Install Neurodesk on windows and mount external storage on your host computer 
References:
https://neurodesk.github.io/docs/neurodesktop/getting-started/windows/
https://neurodesk.github.io/docs/neurodesktop/storage/

N/B: Constructing the structural connectivity using dMRI HCP data is computationally intensive. Thus, ensure you have sufficient disk space (>100GB) and RAM size (16, 32GB)

Open the powershell terminal and run:

```

docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -v D:/moredata:/data -p 8080:8080 -h neurodesktop-20220222 vnmd/neurodesktop:20220222

```

## Navigate to the mounted storage-->more data-->Create a new folder of your choice--> copy the required input files into a folder->100307

N/B: The folder created in this tutorial was tagged "Test"

Open a terminal in neurodesk and run:

```

cd/data/Test/100307

```

## Activate mrtrix3 software in the neurodesk terminal

```

ml mrtrix3/3.0.3

```

N/B: The advantage neurodesk offers is the version of software can be selected from a range of others, which caters for reproducibility. The mrtrix3 (3.0.3) version was used in this tutorial.

## Step 1: Further pre-processing
Extract data.nii.gz to enable memory-mapping. The extracted files are about 4.5GB:

```
gunzip -c data.nii.gz > data.nii; 
mrconvert data.nii DWI.mif -fslgrad bvecs bvals -datatype float32 -stride 0,0,0,1 -force -info;
rm -f data.nii
```

Perform mrconvert:

```
dwibiascorrect ants DWI.mif DWI_bias_ants.mif -bias bias_ants_field.mif -force -info;

```

Extract the response function. Uses -stride 0,0,0,1:

```
dwi2response dhollander DWI_bias_ants.mif response_wm.txt response_gm.txt response_csf.txt -voxels RF_voxels.mif -force; 

```

```

dwiextract DWI_bias_ants.mif - -bzero | mrmath - mean meanb0.mif -axis 3 -force -info

```
Generate mask:

```

dwi2mask DWI_bias_ants.mif DWI_mask.mif -force -info;

```
Generate Fibre Orientation Distributions (FODs):

```
dwi2fod msmt_csd DWI_bias_ants.mif response_wm.txt wmfod.mif response_gm.txt gm.mif  response_csf.txt csf.mif -mask DWI_mask.mif -force -info;

```

Perform normalization:

```

mtnormalise wmfod.mif wmfod_norm.mif gm.mif gm_norm.mif csf.mif csf_norm.mif -mask DWI_mask.mif -check_norm mtnormalise_norm.mif -check_mask mtnormalise_mask.mif -force -info

```

Generate a 5 tissue image:

```
5ttgen fsl T1w_acpc_dc_restore_brain.nii.gz 5TT.mif -premasked 

```
Convert the B0 image:

```
mrconvert meanb0.mif mean_b0.nii.gz

```

Activate the fsl and afni softwares in the neurodesk terminal:

```
ml fsl/6.0.3
ml afni/21.0.0

```

Use "fslroi" to extract the first volume of the segmented dataset which corresponds to the Grey Matter Segmentation:

```
fslroi 5TT.nii.gz 5TT_vol0.nii.gz 0 

```
Use "flirt" command to coregister the two datasets:

```

flirt -in  mean_b0.nii.gz -ref  5TT_vol0.nii.gz -interp nearestneighbour -dof 6 -omat diff2struct_fsl.mat

```

Convert the transformation matrix to a format readble by MRtrix:

```

transformconvert diff2struct_fsl.mat mean_b0.nii.gz 5TT.nii.gz flirt_import diff2struct_mrtrix.txt

```
Coregister the anatomical image to the diffusion image:


```

mrtransform 5TT.mif -linear diff2struct_mrtrix.txt -inverse 5TT_coreg 

```
Create the seed boundary which sepearates the grey from the white matter. The command "5tt2gmwmi" denotes (5 tissue type(segmentation) to grey matter/white matter interface):

```

5tt2gmwmi 5TT_coreg.mif gmwmSeed_coreg.mif

```

## Step 2: Tractogram construction

The probabilistic tractography which is the default in MRtrix is used in this tutorial. The default method is the iFOD2 algorithm.
The number of streamlines used is 10 million, this was chosen  to save computational time:

```
tckgen -act 5TT_coreg.mif -backtrack -seed_gmwmi gmwmSeed_coreg.mif -nthreads 8 -minlength 5.0 -maxlength 300 -cutoff 0.06 -select 10000000 wmfod_norm.mif tracks_10M.tck -force

```

## Step 3: SIFT2 construction
The generated streamlines can be refined with tcksift2 to counterbalance the overfitting. This creates a text file containing weights for each voxel in the brain:

```
tcksift2 -act 5TT_coreg.mif -out_mu sift_mu.txt -out_coeffs sift_coeffs.txt -nthreads 8 tracks.tck wmfod_norm.mif sift_1M.txt -force

```

## Step 4: Connectome construction
In constructing the connectome, the desikan-killany atlas which includes the cortical and sub-cortical regions (84 regions) was used.

Copy the FreeSurferColorLUT.txt file from the ml freesurfer 7.2.0 singularity container to the subject's folder

```
cp /opt/freesurfer-7.2.0/FreeSurferColorLUT.txt /data/Test/100307

```

Copy the fs_default.txt file from the ml mrtrix3 3.0.3 singularity container to the subject's folder

```
cp /opt/mrtrix3-3.0.3/share/mrtrix3/labelconvert/fs-default.txt /data/Test/100307

```

The command labelconvert will use the parcellation and segmentation output of FreeSurfer to create a new parcellated file in .mif format:

```

labelconvert aparc+aseg.nii.gz FreeSurferColorLUT.txt fs_default.txt nodes.mif -force

```
Perform nodes co-registeration:

```
mrtransform nodes.mif -linear diff2struct_mrtrix.txt -inverse -datatype uint32 nodes_coreg.mif -force

```

Create a whole-brain connectome which denotes the streamlines between each parcellation pair in the atlas. The "symmetric" option  makes the lower and upper diagonal the same, the "scale_invnodevol" option scales the connectome by the inverse of the size of the node:

```
tck2connectome -symmetric -zero_diagonal -scale_invnodevol -tck_weights_in sift_1M.txt tracks.tck nodes_coreg.mif  nodes.csv -out_assignment  assignments_nodes.csv -force

```

## Viewing the connectome

The generated nodes.csv file can be viewed outside neurodesk as a matrix in Matlab.

```
connectome=importdata('nodes.csv');
imagesc(connectome,[0 1])

```

![Structural_connectivity](/Structural_connectivity_dMRI/Structural_connectivity.png 'Structural_connectivity') -->

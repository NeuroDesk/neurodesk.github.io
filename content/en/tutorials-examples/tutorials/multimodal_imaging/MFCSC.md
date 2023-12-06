---
title: "Using MFCSC"
linkTitle: "MFCSC"
weight: 1
tags: ["multimodal", "preprocessing"]
author: Oren Civier
description: > 
  A tutorial for using MFCSC to integrate connectomes from different modalities
---


> _This tutorial was created by Oren Civier._ 
>
> Github: [@civier]
> Email: orenciv@gmail.com
> Profile: https://anif.org.au/team/oren-civier/
>

----------

More details on MFCSC and this tutorial can be found in the following paper:

> Civier O, Sourty M, Calamante F (2023) MFCSC: Novel method to calculate mismatch between functional and structural brain connectomes, and its application for detecting hemispheric functional specialisations. Scientific Reports
https://doi.org/10.1038/s41598-022-17213-z

In short, MFCSC calculates the mismatch between connectomes generated from different imaging modalities. It does it by normalising the connectomes to a common space calculated at group level, and taking into account the role of indirect connectivity in shaping the functional connectomes.


**TUTORIAL FOR CONNECTOMES FROM fMRI AND dMRI** 

1. Download the "input" folder from the OSF repository (https://osf.io/d7j9n/files/osfstorage)

2. Launch mfcsc from either "Neurodesk"-->"Diffusion Imaging --> mfsc --> mfcsc 1.1" or "Neurodesk"-->"Functional Imaging --> mfcsc --> mfcsc 1.1" in the start menu. 

3. Run the following command with **input** being the directory where the input data was downloaded to, and **outputdir** being the directory where the output should be written to:
```
    mfcsc input/FC_SC_list.txt input/FC input/SC outputdir
```

4. After MFCSC finishes running, the content of **outputdir** should be identical to the "output" folder in the OSF repository (https://osf.io/d7j9n/files/osfstorage)
   It contains connectomes that encode the mismatch between functional and structural connectivity (mFCSC) for every connection.


**TUTORIAL FOR CONNECTOMES FROM MEG AND dMRI** 

1. Use the MEG connectivity tutorial to generate functional connectomes from your MEG data using MNE tools on Neurodesk (Tutorial in progress: https://github.com/benmslade/neurodesk.github.io/blob/main/content/en/tutorials/electrophysiology/meg_connectivity.md)
   
2. Use the structul connectivity tutorial to generate structural connectomes from your dMRI data using MRtrix tools on Neurodesk (https://www.neurodesk.org/tutorials-examples/tutorials/structural_imaging/structuralconnectivity/)

3. Launch mfcsc from either "Neurodesk"-->"Diffusion Imaging --> mfsc --> mfcsc 1.1" or "Neurodesk"-->"Functional Imaging --> mfcsc --> mfcsc 1.1" in the start menu. 

4. Copy the MEG connectomes into input/MEG and the structural connectomes into input/SC

5. Create an input/MEG_SC_list.txt file that lists the pairing between MEG and structural connectomes

6. Run the following command with **input** being the directory where the input data was downloaded to, and **outputdir** being the directory where the output should be written to:
```
    mfcsc input/MEG_SC_list.txt input/MEG input/SC outputdir
```

7. After MFCSC finishes running, **outputdir** will  contains connectomes that encode the mismatch between MEG and structural connectivity (mFCSC) for every connection.


----------

**CITATIONS**

When using MFCSC, authors should cite:

> Civier O, Sourty M, Calamante F (2023) MFCSC: Novel method to calculate mismatch between functional and structural brain connectomes, and its application for detecting hemispheric functional specialisations. Scientific Reports
https://doi.org/10.1038/s41598-022-17213-z
 
> Rubinov M, Sporns O (2010) Complex network measures of brain
connectivity: Uses and interpretations. NeuroImage 52:1059-69.

When using the structural connectivity matrices from OSF, authors should cite:

> Civier O, Smith RE, Yeh CH, Connelly A, Calamante F (2019) Is removal of weak connections necessary for graph-theoretical analysis of dense weighted structural connectomes from diffusion MRI? NeuroImage http://doi.org/10.1016/j.neuroimage.2019.02.039

... and include the following acknowledgment:

> Data were provided by the Human Connectome Project, WU-Minn Consortium (Principal Investigators: David Van Essen and Kamil Ugurbil; 1U54MH091657) funded by the 16 NIH Institutes and Centers that support the NIH Blueprint for Neuroscience Research; and by the McDonnell Center for Systems Neuroscience at Washington University, St. Louis, MO.

	
When using the functional connectivity matrices from OSF, authors should cite:
	

> Civier O, Sourty M, Calamante F (2023) MFCSC: Novel method to calculate mismatch between functional and structural brain connectomes, and its application for detecting hemispheric functional specialisations. Scientific Reports https://doi.org/10.1038/s41598-022-17213-z

... and include the following acknowledgment:

> Data were provided by the Human Connectome Project, WU-Minn Consortium (Principal Investigators: David Van Essen and Kamil Ugurbil; 1U54MH091657) funded by the 16 NIH Institutes and Centers that support the NIH Blueprint for Neuroscience Research; and by the McDonnell Center for Systems Neuroscience at Washington University, St. Louis, MO.

-----------------

**ACKNOWLEDGMENTS**
    
National Health and Medical Research Council of Australia (grant numbers APP1091593 andAPP1117724)

Australian Research Council (grant number DP170101815)

National Imaging Facility (NIF), a National Collaborative Research Infrastructure Strategy (NCRIS) capability at Swinburne Neuroimaging, Swinburne University of Technology.

Victorian Government’s Operational Infrastructure Support

Melbourne Bioinformatics at the University of Melbourne (grant number UOM0048)

Sydney Informatics Hub and the University of Sydney’s high performance computing cluster Artemis

Australian Electrophysiology Data Analytics PlaTform (AEDAPT); Australian Research Data Commons




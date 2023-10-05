---
title: "Quantitative Susceptibility Mapping"
linkTitle: "QSM"
weight: 1
aliases:
- /tutorials/phase_processing/qsm
description: >
  Example workflow for Quantitative Susceptibility Mapping
---
> _This tutorial was created by Steffen Bollmann and Ashley Stewart._
>
> Github: [@stebo85](https://github.com/stebo85); [@astewartau](https://github.com/astewartau)
> Web: [mri.sbollmann.net](https://mri.sbollmann.net/)
> Twitter: [@sbollmann_MRI](https://twitter.com/sbollmann_MRI)

<!-- Following line adds a link to getting set up with Neurodesk -->
{{< params/neurodesktop/getting_set_up >}}
<!-- -->

> _An example notebook can be found here:_
> https://github.com/NeuroDesk/example-notebooks/blob/main/books/structural_imaging/qsmxt_example.ipynb
>

## Quantitative Susceptibility Mapping in Neurodesk with QSMxT

Neurodesk provides [QSMxT](https://github.com/QSMxT/QSMxT/), an end-to-end pipeline that automates the reconstruction, segmentation and analysis of QSM data across large groups of participants, from scanner images (DICOMs) through to susceptibility maps and quantitative outputs.

QSMxT provides pipelines implemented in Python that:

1. Automatically convert unorganised DICOM or NIfTI data to the Brain Imaging Data Structure (BIDS)
2. Automatically reconstruct QSM, including steps for:
   1. Masking
   2. Phase unwrapping
   3. Background field removal
   4. Dipole inversion
   5. Multi-echo combination
3. Automatically generate a common group space for the cohort, as well as average magnitude and QSM images that facilitate group-level analyses.
4. Automatically segment T1w data and register them to the QSM space to extract quantitative values in anatomical regions of interest.
5. Export quantitative data to CSV for all subjects using the automated segmentations, or a custom segmentation in the group space (we recommend ITK-SNAP to perform manual segmenations).

For a list of algorithms QSMxT uses, see the [Reference List](https://github.com/QSMxT/QSMxT/#references-and-algorithm-list) on the GitHub page.

## Open QSMxT

Start QSMxT v1.3.3 from the applications menu in the desktop (*Neurodesk* > *Quantitative Imaging* > *qsmxt*)


## Download test DICOMs

Start by downloading the test DICOM data we provide for QSMxT:

```bash
osf -p ru43c clone qsmxt-demo
unzip qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub1/GR_M_5_QSM_p2_1mmIso_TE20.zip -d qsmxt-demo/0_dicoms
unzip qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub1/GR_P_6_QSM_p2_1mmIso_TE20.zip -d qsmxt-demo/0_dicoms
unzip qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub2/GR_M_5_QSM_p2_1mmIso_TE20.zip -d qsmxt-demo/0_dicoms
unzip qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub2/GR_P_6_QSM_p2_1mmIso_TE20.zip -d qsmxt-demo/0_dicoms
```

## Convert DICOMs to BIDS

Next, we need to sort the DICOMs into the structure QSMxT expects (by subject, session, and series), and then convert to the [Brain Imaging Data Structure (BIDS)](https://bids.neuroimaging.io/) by running the following:

```bash
cd qsmxt-demo
run_0_dicomSort.py 0_dicoms 1_dicoms_sorted
run_1_dicomConvert.py 1_dicoms_sorted 2_bids
```
    
The conversion to BIDS will prompt you to enter which sequence matches your QSM data. For the demo data, you can simply enter `1` when prompted:

![Enter '1' when prompted for the acquisition relevant for QSM](https://i.imgur.com/C8XhhEU.png)

The demo data comes without a structural scan (automatically recognised if `t1w` is in the protocol name.

## Run QSM pipeline

Finally, we can run the QSM pipeline using:

```bash
run_2_qsm.py 2_bids 3_qsm
```

You will first be prompted to choose an initial premade pipeline. Simply press ENTER to use the default pipeline, or choose one of the other premade pipelines (e.g. `fast` for QSMxT's fastest reconstruction pipeline):

![QSMxT prompts the user to select a pipeline](https://i.imgur.com/6jmXSYf.png)

QSMxT then allows you to adjust any relevant reconstruction settings. The defaults should be fine for this data, so simply enter 'run':

![QSMxT prompts the user to adjust any settings](https://i.imgur.com/TVNc2Cm.png)

The reconstruction may take some time, though QSMxT will attempt to run various processes in parallel wherever possible. 

## View QSM results

When the processing is finished, you can open a viewer (Visualization -> mricrogl -> mricroglGUI) and you can find the QSM outputs in /neurodesktop-storage/qsmxt-demo/3_qsm:

![QSM results in a medical image viewer](https://user-images.githubusercontent.com/4021595/155106388-72a691a4-c0a4-4cc6-a2ac-c9271888b82d.png)

> Please note that the demo dataset does not have a T1w scan for anatomical segmentation, and therefore the subsequent steps in QSMxT (e.g. `run_3_segment.py 2_bids 4_segmentation`) will NOT work.


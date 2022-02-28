---
title: "Quantitative Susceptibility Mapping"
linkTitle: "QSM"
weight: 1
description: >
  Example workflow for Quantitative Susceptibility Mapping
---
> _This tutorial was created by Steffen Bollmann._
>
> Github: [@stebo85](https://github.com/stebo85)
> Web: [mri.sbollmann.net](https://mri.sbollmann.net/)
> Twitter: [@sbollmann_MRI](https://twitter.com/sbollmann_MRI)
## Quantitative Susceptibility Mapping in QSMxT

Neurodesk includes QSMxT, a complete and end-to-end QSM processing and analysis framework that excels at automatically reconstructing and processing QSM for large groups of participants. 

QSMxT provides pipelines implemented in Python that:

1. Automatically convert DICOM data to the Brain Imaging Data Structure (BIDS)
2. Automatically reconstruct QSM, including steps for:
   1. Robust masking without anatomical priors
   2. Phase unwrapping (Laplacian based)
   3. Background field removal + dipole inversion (`tgv_qsm`)
   4. Multi-echo combination
3. Automatically generate a common group space for the whole study, as well as average magnitude and QSM images that facilitate group-level analyses.
4. Automatically segment T1w data and register them to the QSM space to extract quantitative values in anatomical regions of interest.
5. Export quantitative data to CSV for all subjects using the automated segmentations, or a custom segmentation in the group space (we recommend ITK snap).

If you use QSMxT for a study, please cite https://doi.org/10.1101/2021.05.05.442850 (for QSMxT) and http://www.ncbi.nlm.nih.gov/pubmed/25731991 (for TGVQSM)



## Download demo data
Open a terminal and run:
```
pip install osfclient
export PATH=$PATH:~/.local/bin
cd /neurodesktop-storage/
osf -p ru43c clone /neurodesktop-storage/qsmxt-demo
unzip /neurodesktop-storage/qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub1/GR_M_5_QSM_p2_1mmIso_TE20.zip -d /neurodesktop-storage/qsmxt-demo/dicoms
unzip /neurodesktop-storage/qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub1/GR_P_6_QSM_p2_1mmIso_TE20.zip -d /neurodesktop-storage/qsmxt-demo/dicoms
unzip /neurodesktop-storage/qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub2/GR_M_5_QSM_p2_1mmIso_TE20.zip -d /neurodesktop-storage/qsmxt-demo/dicoms
unzip /neurodesktop-storage/qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub2/GR_P_6_QSM_p2_1mmIso_TE20.zip -d /neurodesktop-storage/qsmxt-demo/dicoms
```

## QSMxT Usage
Start QSMxT (in this demo we used 1.1.9) from the applications menu in the desktop (*Neurodesk* > *Quantitative Imaging* > *qsmxt*)

1. Convert DICOM data to BIDS:
    ```bash
    cd /neurodesktop-storage/qsmxt-demo
    python3 /opt/QSMxT/run_0_dicomSort.py /neurodesktop-storage/qsmxt-demo/dicoms 00_dicom
    python3 /opt/QSMxT/run_1_dicomConvert.py 00_dicom 01_bids
    ```
    
This will bring up an interactive question to ask you which sequence your QSM data are. It will automatically detect the QSM sequence if it has qsm or t2star in the protocol name or you can use the command line argument `--t2starw_series_patterns` to specify. This demo data comes without a structural scan (automatically recognized with t1w in the name, or specified with `--t1w_series_patterns`, so hit Enter to continue when it asks you to identify which scan the T1w scan is:

![{DE1B0DF7-49B8-47F8-ACFF-B205F70BE58B}](https://user-images.githubusercontent.com/4021595/155911430-d2b7e904-6a8a-426c-bc27-e2167dd03a4d.png)


2. Run QSM pipeline:
    ```bash
    python3 /opt/QSMxT/run_2_qsm.py 01_bids 02_qsm_output
    ```
Then you can open a viewer (Visualization -> mricrogl -> mricroglGUI) and you can find the QSM outputs in /neurodesktop-storage/qsmxt-demo/02_qsm_output/qsm_final/_run_run-1/

for example: sub-170705-134431-std-1312211075243167001_ses-1_run-1_part-phase_T2starw_scaled_qsm_000_composite_average.nii

![image](https://user-images.githubusercontent.com/4021595/155106388-72a691a4-c0a4-4cc6-a2ac-c9271888b82d.png)

> Please note that the demo dataset does not have a T1w scan for anatomical segmentation and therefore the subsequent steps in QSMxT (e.g. `python3 /opt/QSMxT/run_3_segment.py 01_bids 03_segmentation`) will NOT work.

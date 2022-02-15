---
title: "Quantitative Susceptibility Mapping"
linkTitle: "QSM"
weight: 1
description: >
  Example workflow for Quantitative Susceptibility Mapping
---

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

If you use QSMxT for a study, please cite https://doi.org/10.1101/2021.05.05.442850.


## Download demo data
Open a terminal and run:
```
pip install osfclient
cd /storage/
osf -p ru43c clone /storage/qsmxt-demo
unzip /storage/qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub1/GR_M_5_QSM_p2_1mmIso_TE20.zip -d /storage/qsmxt-demo/dicoms
unzip /storage/qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub1/GR_P_6_QSM_p2_1mmIso_TE20.zip -d /storage/qsmxt-demo/dicoms
unzip /storage/qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub2/GR_M_5_QSM_p2_1mmIso_TE20.zip -d /storage/qsmxt-demo/dicoms
unzip /storage/qsmxt-demo/osfstorage/GRE_2subj_1mm_TE20ms/sub2/GR_P_6_QSM_p2_1mmIso_TE20.zip -d /storage/qsmxt-demo/dicoms
```

## QSMxT Usage
Start QSMxT (in this demo we used 1.1.6) from the applications menu in the desktop (*Neurodesk* > *Quantitative Imaging* > *qsmxt*)

1. Convert DICOM data to BIDS:
    ```bash
    cd /storage/qsmxt-demo
    python3 /opt/QSMxT/run_0_dicomSort.py /storage/qsmxt-demo/dicoms 00_dicom
    python3 /opt/QSMxT/run_1_dicomToBids.py 00_dicom 01_bids
    ```
After this step check if the data were correctly recognized and converted to BIDS. Otherwise make a copy of /opt/QSMxT/bidsmap.yaml - adjust based on provenance example in 01_bids/code/bidscoin/bidsmap.yaml (see for example what it detected under extra_files) - and run again with the parameter `--heuristic bidsmap.yaml`. If the data were acquired on a GE scanner the complex data needs to be corrected by applying an FFT shift, this can be done with `python /opt/QSMxT/run_1_fixGEphaseFFTshift.py 01_bids/sub*/ses*/anat/*_run-1_*.nii.gz` . 

2. Run QSM pipeline:
    ```bash
    python3 /opt/QSMxT/run_2_qsm.py 01_bids 02_qsm_output
    ```

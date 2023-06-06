---
title: "PhysIO"
linkTitle: "PhysIO"
weight: 1
aliases:
- /tutorials/functional_imaging/physio
description: >
  Example workflow for the PhysIO Toolbox
---

> _This tutorial was created by Lars Kasper._
>
> Github: @mrikasper
>
> Twitter: @mrikasper

<!-- Following line adds a link to getting set up with Neurodesk -->
{{< params/neurodesktop/getting_set_up >}}
<!-- -->

## Origin

The PhysIO Toolbox implements ideas for robust physiological noise modeling in fMRI, outlined in this paper:

1. Kasper, L., Bollmann, S., Diaconescu, A.O., Hutton, C., Heinzle, J., Iglesias, 
S., Hauser, T.U., Sebold, M., Manjaly, Z.-M., Pruessmann, K.P., Stephan, K.E., 2017. 
*The PhysIO Toolbox for Modeling Physiological Noise in fMRI Data*. 
Journal of Neuroscience Methods 276, 56-72. https://doi.org/10.1016/j.jneumeth.2016.10.019

PhysIO is part of the open-source [TAPAS Software Package](https://translationalneuromodeling.github.io/tapas/) for Translational Neuromodeling and Computational Psychiatry, introduced in the following paper:

2. Frässle, S., Aponte, E.A., Bollmann, S., Brodersen, K.H., Do, C.T., Harrison, O.K., Harrison, S.J., Heinzle, J., Iglesias, S., Kasper, L., Lomakina, E.I., Mathys, C., Müller-Schrader, M., Pereira, I., Petzschner, F.H., Raman, S., Schöbi, D., Toussaint, B., Weber, L.A., Yao, Y., Stephan, K.E., 2021. *TAPAS: an open-source software package for Translational Neuromodeling and Computational Psychiatry*. Frontiers in Psychiatry 12, 857. https://doi.org/10.3389/fpsyt.2021.680811

Please cite these works if you use PhysIO and see the [FAQ](https://gitlab.ethz.ch/physio/physio-doc/-/wikis/FAQ#3-how-do-i-cite-physio) for details.

NeuroDesk offers the possibility of running PhysIO without installing Matlab or requiring a Matlab license. The functionality should be equivalent, though debugging and extending the toolbox, as well as unreleased development features, will only be available in the Matlab version of PhysIO, which is exclusively hosted on the [TAPAS GitHub](https://github.com/translationalneuromodeling/tapas).

More general info about PhysIO besides NeuroDesk usage is found in the [README](https://github.com/translationalneuromodeling/tapas/tree/master/PhysIO#readme) on GitHub.


## Purpose

The general purpose of the PhysIO toolbox is model-based physiological noise correction of fMRI data using peripheral measures of respiration and cardiac pulsation (respiratory bellows, ECG, pulse oximeter/plethysmograph).

It incorporates noise models of
- cardiac/respiratory phase (RETROICOR, Glover et al. 2000), as well as
- heart rate variability and respiratory volume per time (cardiac response function, Chang et. al, 2009, respiratory response function, Birn et al. 2006),
- and extended motion models (e.g., censoring/scrubbing)

While the toolbox is particularly well integrated with SPM via the Batch Editor GUI, its  output text files can be incorporated into any major neuroimaging analysis package for nuisance regression, e.g., within a GLM.

Core design goals for the toolbox were: flexibility, robustness, and quality assurance to enable physiological noise correction for large-scale and multi-center studies.

Some highlights:

-  Robust automatic preprocessing of peripheral recordings via iterative peak detection, validated in noisy data and patients, and extended processing of respiratory data (Harrison et al., 2021)
- Flexible support of peripheral data formats (BIDS, Siemens, Philips, GE, BioPac, HCP, ...) and noise models (RETROICOR, RVHRCOR).
- Fully automated noise correction and performance assessment for group studies.
- Integration in fMRI pre-processing pipelines as SPM Toolbox (Batch Editor GUI).

The accompanying technical paper about the toolbox concept and methodology can be found at: https://doi.org/10.1016/j.jneumeth.2016.10.019


## Download Example Data

The example data should already be present in NeuroDesk in the following folder `/opt/spm12`

If you cannot find the example data there:
1. Download the latest version from the [location mentioned in the TAPAS distribution](https://github.com/translationalneuromodeling/tapas/blob/master/misc/log_tapas.txt)
    - e.g., https://www.tapas.tnu-zurich.com/examples_v5.0.0.zip
2. Follow the instructions for copying your own data in the next section

## Copy your own data

- On Windows, the folder `C:\neurodesktop-storage` should have been automatically created when starting NeuroDesk
- This is your direct link to the NeuroDesk environment, and anything you put in there should end up within the NeuroDesk desktop in `/neurodesktop-storage/` and on your desktop under `storage`


## Example: Running PhysIO in the GUI
1. Open the PhysIO GUI (Neurodesk -> Functional Imaging -> physio -> physioGUI r7771, see screenshot:

![PhysIO GUI in NeuroDesk](/FunctionalImaging_Tutorial/physio_screenshot1.jpg 'physio_screenshot')

2. SPM should automatically open up (might take a while). Select 'fMRI' from the modality selection screen.
3. Press the "Batch Editor" button (see screenshot with open Batch Editor, red highlights)

![NeuroDesk with SPM Batch Editor PhysIO](/FunctionalImaging_Tutorial/physio_screenshot2.jpg 'physio_screenshot2')

    - NB: If you later want to create a new PhysIO batch with all parameters, from scratch or explore the options, select from the Batch Editor Menu top row, SPM -> Tools -> TAPAS PhysIO Toolbox (see screenshot, read highlights)

4. For now, load an existing example (or previously created SPM Batch File) as follows: It is most convenient to change the working directory of SPM to the location of the physiological logfiles
    - In the Batch Editor GUI, lowest row, choose 'CD' from the 'Utils..' dropdown menu
    - Navigate to any of the example folders, e.g., `/opt/spm12/examples/Philips/ECG3T/` and select it
    - NB: you can skip this part, if you later manually update all input files in the Batch Editor window (resp/cardiac/scan timing and realignment parameter file further down)
    - Any other example should also work the same way, just CD to its folder before the next step
5. Select File -> Load Batch from the top row menu of the Batch Editor window
    - make sure you select the matlab batch file `*_spm_job.<m|mat>`, (e.g., `philips_ecg3t_spm_job.m` and `philips_ecg3t_spm_job.mat` are identical, either is fine), but not the script.
6. Press The green "Play" button in the top icon menu row of the Batch Editor Window
7. Several output figures should appear, with the last being a grayscale plot of the nuisance regressor design matrix

![Output Nuisance Regressor Matrix PhysIO](/FunctionalImaging_Tutorial/physio_screenshot3.jpg 'physio_screenshot3')

8. Congratulations, your first successful physiological noise model has been created! If you don't see the mentioned figure, chances are certain input files were not found (e.g., wrong file location specified). You can always check the text output in the "bash" window associated with the SPM window for any error messages.

## Further Info on PhysIO

Please check out the [README](https://github.com/translationalneuromodeling/tapas/tree/master/PhysIO#readme) and [FAQ](https://gitlab.ethz.ch/physio/physio-doc/-/wikis/FAQ)

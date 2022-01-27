---
title: "Release History"
linkTitle: "Release History"
weight: 10
description: >-
     Previous releases of neurodesktop
---

## Development
- update of spinalcordtoolbox to 5.5


## 20220121
- MNE Python 0.23.4 container including VScode and extensions
- VScode container including Python/Julia Extensions and singularity to test "Inception Mode" (Running singularity containers withtin singularity containers)
- update of fsl to 6.0.5.1
- added CAT12 (a software that allows estimation of tissue volumes (and additional surface parameters such as cortical thickness, gyrification or fractal dimension) for different volume and surface-based atlas maps)

## 20220111
- a deep learning based vessel segmentation algorithm "vesselapp" was added in version 0.3.1
- palm - Permutation Analysis of Linear Models - was added in version alpha119
- niistat running in octave was added with version 1.0.20191216
- MRIcroGL was updated to a version with included python support, so the scripting is now working
- rabies - Rodent Automated Bold Improvement of EPI Sequences was added with version 0.3.5
- oshyx was updated to 0.3

## 20211220
- neurodesktop can now be accessed via native RDP client as well (e.g. for multi-monitor support): https://neurodesk.github.io/docs/neurodesktop/getting-started/windows/#using-an-rdp-client
- there is a new Help button in the menu :)
- updates of ants 2.3.4 (now includes Scripts as well, including antsCookTemplatePriors.sh) + newly added version 2.3.5
- new version of QSMxT 1.1.9 20211219
- new version of Spinal Cord Toolbox 5.4
- new tools: MRIcroGL and surfice - fantastic viewers for neuroimaging data


## 20211207
- Physio toolbox compiled and added to SPM + update of SPM
- added brainstorm 
- new neurodesktop container management scripts for Linux, Mac and Windows: https://github.com/NeuroDesk/neurodesktop 
- added fieldtrip 
- Datalad is now in the main image, so datalad run should work
- added Oshy-X segmentation tool
- updated freesurfer 7.2.0

## 20211028
- added EEGLAB

## 20211018
- added Rstudio, R and multiple R packages (plotly, car, tidyverse, ...)
- added ClearSWI and ROMEO for MRI phase processing (including new Tutorials: https://neurodesk.github.io/tutorials/phase_processing/)
- added more categories in applications menu (Body, Electrophysiology, Hippocampus, Phase Processing, Rodent Imaging, Shape Analysis, Spine, Statistics)
- bugfix: improved startup time of the desktop container (miniconda in homedirectory was causing chmod slowdown)
- bugfix: ssh, vnc and rdp servers are now restarted in case the container was stopped and started again (e.g. on Standby)


## 20210929
- fixed naming of aidmri to aidamri and added new category "Rodent Imaging"
- updated all tool icons and updated neurodesk icon including background image
- VScode now stores settings in persistent storage /neurodesktop-storage and with this keeps extensions and settings across different neurodesktop versions
- docker layers are now cached, so updating the desktop to the next version is very fast and consumes less disk space locally
- default theme of terminal changed from Solarized to Tango as the old theme was hiding information in tools like htop (same font colour on same background...)


## 20210923
- removed faulty mriqc 0.15.2 container
- neurodesk.github.io is now starting page in firefox browser

## 20210918
- added mriqc 0.16.1 and mrtrix 3.0.3

## 20210917
- included more tools for connecting to cloud storage services (rclone, owncloud, nextcloud, davfs2, globus). For more info: [Storage](/docs/neurodesktop/storage)
- styling of desktop interface, including background wallpaper and colour scheme in terminal window
- new categories in menu system (visualization) and added more categories to tools

## 20210916
- This is the first version of the newly renamed and rebuild neurodesktop (previously vnm and neuromachine)
- containers are mounted by default from CVMFS, but this can be deactivated by adding `-e CVMFS_DISABLE=true` to the docker call


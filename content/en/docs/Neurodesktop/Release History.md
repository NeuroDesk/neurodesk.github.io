---
title: "Release History"
linkTitle: "Release History"
weight: 10
description: >-
     Previous releases of neurodesktop
---

<!-- don't forget to copy addition to blog/releases -->

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


---
title: "What's in the box?"
linkTitle: "What's in the box?"
weight: 3
description: >-
     The software available in neurodesktop
---

Neurodesktop comes with the essential software required for neuroimaging data analysis pre-installed. Each release is built with the most recent version of these packages available at the build date. Some example packages include:
* Editors and Programming (can be found in menu, or launched from command line by typing their name):
     * code (Visual Studio Code)
     * gedit (simple visual editor)
     * emacs
     * vim
     * python
     * git
* Workflow systems:
     * Nipype (including GraphVis)
* Data Synchronisation tools: (See our Storage section for more information: [Storage](/docs/neurodesktop/storage))
     * Rsync
     * Rclone https://rclone.org/
     * Nextcloud client
     * Owncloud client
     * Globus personal connect https://docs.globus.org/how-to/globus-connect-personal-linux/
          * installed in /opt/globusconnectpersonal/
* System Management:
     * Lmod (including Lua)
     * Singularity
     * Htop
* Misc
     * Imagemagic
     * Firefox
     * OpenSSH client

The neurodesktop environment is built to be light and fast to download and start-up. Most additional programs are therefore downloaded when they are first used. A list of these packages can be found [here](https://www.neurodesk.org/applications/)

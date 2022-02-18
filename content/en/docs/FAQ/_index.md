---
title: "Neurodesk FAQ"
linkTitle: "FAQ"
weight: 1
description: >
  Frequently Asked Questions.
---

## What is Neurodesk?
Neurodesk provides a containerised data analysis environment to facilitate reproducible analysis of neuroimaging data. Analysis pipelines for neuroimaging data typically rely on specific versions of packages and software, and are dependent on their native operating system. These dependencies mean that a working analysis pipeline may fail or produce different results on a new computer, or even on the same computer after a software update. Neurodesk provides a platform in which anyone, anywhere, using any computer can reproduce your original research findings given the original data and analysis code. 

More information: [A Neurodesk Overview](/docs/overview/)
A 2 minute video explaining what Neurodesk is: [Neurodesk in 2 minutes](https://www.youtube.com/watch?v=JLv_5fycugw)
A 15 minute video explaining what Neurodesk is: [Neurodesk in 15 minutes](https://youtu.be/2ATgTOsiGdY)
A 35 minute video explaining the technical details of Neurodesk: [Neurodesk in 35 minutes - behind the scenes](https://youtu.be/V5gAA9NiX_s)


## Can I run Neurodesk on an HPC without Docker?
Yes, our project aims to run on the hardware you have access to. However, without docker support you cannot use our desktop interface [NeuroDesktop](/docs/Neurodesktop) but you can still use the command line interface [NeuroCommand on HPC](https://neurodesk.github.io/docs/neurocommand/getting-started/linux/#command-line-mode-eg-running-on-an-hpc-or-cvl). This works well for batch processing on HPCs once you developed your pipeline in our desktop interface. If your HPC provides a desktop interface you can use all our graphical applications without any issues and the GUIs even work via SSH x-forwarding - it's not the most performant experience, but it works well enough.

## Is there reduced performance when using containers?
If you are running containers on Linux there is no performance penalty - on an HPC with a Lustre filesystem it can even be faster to run our containers than running natively on the filesystem (because meta data operations are shifted to the compute node - more information can be found here: Rioux, Pierre, Gregory Kiar, Alexandre Hutton, Alan C. Evans, and Shawn T. Brown. ‘Deploying Large Fixed File Datasets with SquashFS and Singularity’. ArXiv:2002.06129 [Cs], 14 February 2020. http://arxiv.org/abs/2002.06129.). However, running Neurodesktop on Windows and Mac will have a performance penality, because Linux runs in a Hypervisor on these systems.   

# How can I see how much resources Neurodesk containers need?
In Linux the containers run as normal processes and you can use htop and top to inspect the resource footprint. For Windows and Mac this is a bit intransparent and we wrote some information here: [Troubleshooting](https://neurodesk.github.io/docs/neurodesktop/troubleshooting/#i-got-an-error-message-x-killed)


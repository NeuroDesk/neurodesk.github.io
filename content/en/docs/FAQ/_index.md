---
title: "Neurodesk FAQ"
linkTitle: "FAQ"
weight: 1
menu:
  main:
    weight: 1
description: >
  Frequently Asked Questions.
---

## What is Neurodesk?
Neurodesk provides a containerised data analysis environment to facilitate reproducible analysis of neuroimaging data. Analysis pipelines for neuroimaging data typically rely on specific versions of packages and software, and are dependent on their native operating system. These dependencies mean that a working analysis pipeline may fail or produce different results on a new computer, or even on the same computer after a software update. Neurodesk provides a platform in which anyone, anywhere, using any computer can reproduce your original research findings given the original data and analysis code. 

More information: 
- [A Neurodesk Overview](/docs/overview/)
- A 2 minute video explaining what Neurodesk is: [Neurodesk in 2 minutes](https://www.youtube.com/watch?v=JLv_5fycugw)
- An online interactive demo you can try RIGHT NOW in your browser: https://neurodesk.github.io/docs/neurodesktop/getting-started/play/

In-depth information:
- A 15 minute video explaining what Neurodesk is: [Neurodesk in 15 minutes](https://youtu.be/2ATgTOsiGdY)
- A 35 minute video explaining the technical details of Neurodesk: [Neurodesk in 35 minutes - behind the scenes](https://youtu.be/V5gAA9NiX_s)

## How should I cite the tools I am using and Neurodesk itself?
[See here](/docs/how-to-cite-us)

## Can I run Neurodesk on an HPC without Docker?
Yes, our project aims to run on the hardware you have access to. However, without docker support you cannot use our desktop interface [NeuroDesktop](/docs/neurodesktop/getting-started) but you can still use the command line interface [NeuroCommand on HPC](https://www.neurodesk.org/docs/neurocommand/getting-started/linux/#command-line-mode-eg-running-on-an-hpc-or-cvl). This works well for batch processing on HPCs once you developed your pipeline in our desktop interface. If your HPC provides a desktop interface you can use all our graphical applications without any issues and the GUIs even work via SSH x-forwarding - it's not the most performant experience, but it works well enough.

## Is there reduced performance when using containers?
If you are running containers on Linux there is no performance penalty - on an HPC with a Lustre filesystem it can even be faster to run our containers than running natively on the filesystem (because meta data operations are shifted to the compute node - more information can be found here: Rioux, Pierre, Gregory Kiar, Alexandre Hutton, Alan C. Evans, and Shawn T. Brown. ‘Deploying Large Fixed File Datasets with SquashFS and Singularity’. ArXiv:2002.06129 [Cs], 14 February 2020. http://arxiv.org/abs/2002.06129.). However, running Neurodesktop on Windows and Mac will have a performance penalty, because Linux runs in a Hypervisor on these systems.   

## How can I see how much resources Neurodesk containers need?
In Linux the containers run as normal processes and you can use htop and top to inspect the resource footprint. For Windows and Mac the information is not readily available and we wrote some information here: [Troubleshooting](https://www.neurodesk.org/docs/neurodesktop/troubleshooting/#i-got-an-error-message-x-killed)

## How do I get my files in there?
It depends where you are running Neurodesk and where your files are. We provide many different ways from drag-and-drop, to cloud storage to file mounts. An overview about Storage can be found here: [Storage in Neurodesk](https://www.neurodesk.org/docs/neurodesktop/storage/)

## What applications are included in Neurodesk?
We provide certain applications as part of the Neurodesktop image (https://www.neurodesk.org/docs/neurodesktop/whatsinthebox/) - these are applications that don't work well in containers. The majority of applications are provided via containers and a full list can be found here: https://www.neurodesk.org/applications/

## Freeview 7.2.0 crashes when I open files
Freeview (and Freesurfer!) needs a valid license to work and we are not allowed to distribute a license with Neurodesk!

So here is how you can run freeview 7.2.0 and open your files:

1) apply for a license (https://surfer.nmr.mgh.harvard.edu/registration.html) and paste this license in ~/.license

then run
```
echo "export FS_LICENSE=~/.license" >> ~/.bashrc
then start freeview 7.2.0 and it should all work perfectly.
```

## Can I just use the plain containers?
Yes, there are multiple ways of using the containers directly and we provide an overview here: https://www.neurodesk.org/docs/neurocontainers/

## How can I contribute new containers?
We are still working on making this easier, but the current workflow to add new applications is described here: https://www.neurodesk.org/developers/new_tools/add_tool/

## I couldn't find the information I was looking for. Where can I get additional assistance?
Open a Github account, and post your question on the Neurodesk forum:
https://github.com/orgs/NeuroDesk/discussions

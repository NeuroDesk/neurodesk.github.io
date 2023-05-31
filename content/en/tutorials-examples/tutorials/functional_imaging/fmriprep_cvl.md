---
title: "Using fmriprep with neurodesk on an HPC"
linkTitle: "fmriprep"
weight: 1
tags: ["fmriprep", "documentation", "preprocessing"]
author: Kelly G. Garner
aliases:
- /tutorials/functional_imaging/fmriprep_cvl
description: > 
  A brief guide to using fmriprep with neurodesk, using data from the STRIAVISE project.
---


> _This tutorial was created by Kelly G. Garner._ 
>
> Github: [@kel_github](https://github.com/kel-github)
>
> Twitter: [@garnertheory](https://twitter.com/garner_theory)
>

> This workflow documents how to use fmriprep with neurodesk and provides some details that may help you troubleshoot some common problems I found along the way. 

---

# Assumptions

- [ ] Your data is already in BIDS format
- [ ] You plan to run fmriprep using Neurodesk
- [ ] You have a local copy of the freesurfer license file (freesurfer.txt)

---

# Steps

## Open fmriprep 

From the applications go Neurodesk -> Functional Imaging -> fmriprep and select the latest version of fmriprep. This should take you to a terminal window with fmriprep loaded.

## Setting up fmriprep command

If you like, you can enter the following fmriprep command straight into the command line in the newly opened terminal. However, as with increasing options and preferences the command can get rather verbose, I instead opted to create an executable bash script that I can run straight from the command line, with minimal editing between runs. If you're not interested in this option you can skip straight to copying/adjusting the code from `fmriprep` to `-v` below.

- open a new file in your editor of choice but really you know it should be Visual Studio Code
- save that file with your chosen name without an extension, e.g. run_fmriprep
- paste in the following and update with your details

```bash
#!/bin/bash
#
# written by A. Name - the purpose of this code is to run fmriprep with neurodesk

export ITK_GLOBAL_DEFAULT_NUMBER_OF_THREADS=6 # specify the number of threads you want to use

fmriprep /path/to/your/data \ # this is the top level of your data folder
         /path/to/your/data/derivatives \ # where you want fmriprep output to be saved
         participant \ # this tells fmriprep to analyse at the participant level
         --fs-license-file /path/to/your/freesurfer.txt \ # where the freesurfer license file is
         --output-spaces T1w MNI152NLin2009cAsym fsaverage fsnative \ 
         --participant-label 01 \ # put what ever participant labels you want to analyse
         --nprocs 6 --mem 10000 \ # fmriprep can be greedy on the hpc, make sure it is not
         --skip_bids_validation \ # its normally fine to skip this but do make sure your data are BIDS enough
         -v # be verbal fmriprep, tell me what you are doing
```
To make the file executable, navigate to this file via the command line in terminal and type

```bash
chmod u+x run_fmriprep # this tells the system to make your new file executable
```

Then to run your new executable, return to your terminal window for fmriprep (that opened when you navigated to fmriprep) and type:

```bash
./run_fmriprep
```
fmriprep should now be merrily working away on your data :)

---

## Some common pitfalls I have learned from my mistakes (and sometimes from others)

1. If fmriprep hangs it could well be that you are out of disk space. Sometimes this is because fmriprep created a work directory in your home folder which is often limited on the HPC. Make sure fmriprep knows to use a work drectory in your scratch. you can specify this in the fmriprep command by using -w /path/to/the/work/directory/you/made

2. I learned this from TomCat (@thomshaw92) - fmriprep can get confused between subjects when run in parallel. Parallelise with caution.

3. If running on a HPC, make sure to set the processor and memory limits, if not your job will get killed because it hogs all the resources.

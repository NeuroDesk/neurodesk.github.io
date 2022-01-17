---
title: "Using mriqc with neurodesk on HPC"
linkTitle: "mriqc"
weight: 1
tags: ["mriqc", "documentation", "preprocessing"]
author: Kelly G. Garner
description: > 
  A brief guide to using mriqc with neurodesk, using data from the STRIAVISE project.
---


> _This tutorial was created by Kelly G. Garner._ 
>
> Email: [getkellygarner@gmail.com](mailto:getkellygarner@gmailc.om)
>
> Github: [@kel_github](https://github.com/kel-github)
>
> Twitter: [@garnertheory](https://twitter.com/garner_theory)
>

> This workflow documents how to use mriqc with neurodesk and provides some details that may help you troubleshoot some common problems I found along the way. 

---

# Assumptions

- [ ] Your data is already in BIDS format
- [ ] You plan to run mriqc using Neurodesk

---

# Steps

## Open mriqc 

From the applications go Neurodesk -> Functional Imaging -> mriqc and select the latest version of mriqc. This should take you to a terminal window with mriqc loaded. <p>

![mriqc terminal](/neurodesk.github.io/static/mriqc_cvl/mriqc_terminal.png)

## Setting up mriqc command

If you like, you can enter the following mriqc commands straight into the command line in the newly opened terminal. However, as with increasing options and preferences the command can get rather verbose, so I instead opted to create executable bash scripts that I can run straight from the command line, with minimal editing inbetween runs. I made one for running mriqc at the participant level, and one for running at the group level (for the group report, once all the participants are done). If you're not interested in this option you can skip straight to copying/adjusting the code from `mriqc` to `-v` below.

- open a new file in your editor of choice (e.g. Visual Studio Code)
- save that file with your chosen name without an extension, e.g. run_mriqc_participant or run_mriqc_group
- paste in the following and update with your details

```go
#!/bin/bash
#
# written by A. Name - the purpose of this code is to run mriqc with neurodesk

export ITK_GLOBAL_DEFAULT_NUMBER_OF_THREADS=6 # specify the number of threads you want to use

mriqc /path/to/your/data \ # this is the top level of your data folder
         /path/to/your/data/derivatives \ # where you want mriqc output to be saved
         participant \ # this tells mriqc to analyse at the participant level
         --participant-label 01 \ # put what ever participant labels you want to analyse
         --work-dir /path/to/work/directory \ #useful to specify so your home directory definitely doesnt get clogged
         --nprocs 6 --mem_gb 10000 \ # mriqc can be greedy on the hpc, make sure it is not
         -v # be verbal mriqc, tell me what you are doing
```


OR: if you have run all the participants and you just want the group level report, use these mriqc commands instead:

```
mriqc /path/to/your/data \ # this is the top level of your data folder
         /path/to/your/data/derivatives \ # where you want mriqc output to be saved. As you are running the group level analysis this folder should be prepopulated with the results of the participant level analysis
         group \ # this tells mriqc to agive you the group report
         -w /path/to/work/directory \ #useful to specify so your home directory definitely doesnt get clogged
         --nprocs 6 --mem_gb 10000 \ # mriqc can be greedy on the hpc, make sure it is not
         -v # be verbal mriqc, tell me what you are doing
```

To make either of yours files executable, navigate via the terminal to the same folder in which this file is saved. If you list the files in the folder by using the command `ls` you should see your file with the name printed in white. 

[mriqc command pre executable](/static/mriqc_cvl/pre_exec.png)

Now type the following command:

```go
chmod u+x run_mriqc_participant # this tells the system to make your new file executable
```
To know this worked, list the files again. If you have successfully made your file executable then it will be listed in green.

[mriqc command now executable](/static/mriqc_cvl/mriqc_post_exec.png)

Then to run your new executable, return to your terminal window for mriqc (that opened when you navigated to mriqc), navigate to the directory where your executable file is stored and type:

```go
./name_of_your_mriqc_file
```
mriqc should now be merrily working away on your data :)

---

## Some common pitfalls I have learned from my mistakes (and sometimes from others)

1. If running on a HPC, make sure to set the processor and memory limits, if not your job will get killed because mriqc hogs all the resources.
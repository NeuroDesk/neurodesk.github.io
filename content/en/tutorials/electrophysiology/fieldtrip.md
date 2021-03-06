---
title: "Analysing M/EEG Data with FieldTrip"
linkTitle: "fieldtrip"
weight: 1
tags: ["fieldtrip", "documentation"]
author: Judy D Zhu
description: > 
  A brief guide to using FieldTrip to analyse electrophysiological data within neurodesk.
---


> _This tutorial was created by Judy D Zhu._ 
>
> Email: judyzhud@gmail.com
>
> Github: @JD-Zhu
>
> Twitter: @JudyDZhu

---

Please note that this container uses a compiled version of FieldTrip to run scripts (without needing a Matlab license). Code development is not currently supported within the container and needs to be carried out separatedly in Matlab.  
<br/>

## Getting started

1. Navigate to Neurodesk->Electrophysiology->fieldtrip->fieldtrip20211114 in the menu:

![1_menu](/fieldtrip/1_menu.png '1_menu')

Once this window is loaded, you are ready to go:

![2_container](/fieldtrip/2_container.PNG '2_container')

<br/>

2. Type the following into the command window (replacing "yourscript.m" with the name of your custom script - note that you may also need to supply the full path):
```bash
run_fieldtrip.sh /opt/MCR/v99 yourscript.m
```
For example, here we ran a script to browse some raw data:

![3_running](/fieldtrip/3_running.PNG '3_running')

The fieldtrip GUI is displayed automatically and functions as it normally would when running inside Matlab.

NOTES:
1. The script specified in the command line can call other scripts
2. The script and the scripts it calls can use all the MATLAB toolboxes included in the compiled version of FieldTrip. If additional MATLAB toolboxes are needed, they need to be put in a filesystem accessible to the FieldTrip container (/neurodesktop-storage, /home/user, etc.), and the path should be added to the MATLAB search path with the addpath function (https://www.mathworks.com/help/matlab/ref/addpath.html)

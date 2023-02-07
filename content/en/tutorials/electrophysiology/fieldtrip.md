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

2. Type the following into the command window (replacing "./yourscript.m" with the name of your custom script - if the script is in the current folder, use "./" before the script name like in the example; otherwise, please supply the full path):
```bash
run_fieldtrip.sh /opt/MCR/v99 ./yourscript.m
```
For example, here we ran a script to browse some raw data:

![3_running](/fieldtrip/3_running.PNG '3_running')

The fieldtrip GUI is displayed automatically and functions as it normally would when running inside Matlab.

NOTES:
1. The script can only call FieldTrip and SPM functions (these are the only functions in the search path, and the search path cannot be altered using addpth)
2. The script cannot include internal functions
3. The script can use all the MATLAB toolboxes included in the compiled version of FieldTrip

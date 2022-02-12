---
title: "Analysing M/EEG Data with FieldTrip"
linkTitle: "FieldTrip"
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


## Getting started

1. Navigate to Neurodesk->Electrophysiology->fieldtrip->fieldtrip20211114 in the menu:

![1_menu](/static/fieldtrip/1_menu.png '1_menu')

Once the window below is loaded, you are ready to go:

![2_container](/static/fieldtrip/2_container.png '2_container')


2. Type the following into the command window (replacing "yourscript.m" with the name of your custom script - note that you may also need to supply the full path):
```bash
run_fieldtrip.sh /opt/MCR/v99 yourscript.m
```
Here we ran an example script to browser some raw data:

![3_running](/static/fieldtrip/3_running.png '3_running')

The GUI functions as it normally would when running inside Matlab.

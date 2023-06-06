---
title: "Connectome Workbench"
linkTitle: "Connectome Workbench"
weight: 1
tags: ["Connectome Workbench", "functional imaging"]
author: Fernanda L. Ribeiro
aliases:
- /tutorials/functional_imaging/connectomeWorkbench
description: > 
  A tutorial for accessing and visualizing the 7T HCP Retinotopy Dataset on Connectome Workbench.
---


> _This tutorial was created by Fernanda L. Ribeiro._ 
>
> Email: fernanda.ribeiro@uq.edu.au
>
> Github: @felenitaribeiro
>
> Twitter: @NandaRibeiro93/home/aswin/workspace/neurodesk/neurodesk.github.io/layouts/partials
>
<!-- Fill in your personal details above so that we can credit the tutorial to you. Feel free to add any additional contact details i.e. website, or remove those that are irrelevant -->

This tutorial documents how to use Connectome Workbench on NeuroDesk for visualizing the 7T HCP Retinotopy Dataset. 

{{< params/neurodesktop/getting_set_up >}}

## Download data

1. First, make sure you register for the Human Connectome Project Open Access Data: https://www.humanconnectome.org/study/hcp-young-adult/data-use-terms


2. Register to the BALSA database: https://balsa.wustl.edu/. 

![1_balsa](/connectomeWorkbench/1_balsa.png '1_balsa')

3. Login and download the scene files containing the retinotopic maps available at: https://balsa.wustl.edu/study/9Zkk. 

![2_balsa](/connectomeWorkbench/2_balsa.png '2_balsa')


These files include preprocessed collated data from 181 participants, including retinotopic, curvature, midthickness, and myelin maps. 

4. Finally, unzip the S1200_7T_Retinotopy_9Zkk.zip file.

![3_unzip](/connectomeWorkbench/3_unzip.png '3_unzip')


## Visualizing scene files

Using Connectome Workbench, you can load ".scene" files and visualize all individuals' retinotopic maps. 
To do so, follow the next steps:

1. In the application menu, navigate to Neurodesk → functional imaging → connectomeworkbench → connectomeworkbench 1.5.0

![4_appmenu](/connectomeWorkbench/4_appmenu.png '4_appmenu')

2. On the terminal shell that pops up, type in:

```bash
wb_view
```

![5_wbview](/connectomeWorkbench/5_wbview.png '5_wbview')


3. Click on "Open Other"

![6_openother](/connectomeWorkbench/6_openother.png '6_openother')

and search for a scene file

![7_scenefile](/connectomeWorkbench/7_scenefile.png '7_scenefile')

in the path where your data is

![8_path](/connectomeWorkbench/8_path.png '8_path')

Finally, select the desired file and open it:

![9_file](/connectomeWorkbench/9_file.png '9_file')

4. On the 'Scenes' window that will pop up, select the first option.

![10_scene](/connectomeWorkbench/10_scene.png '10_scene')

The default images are the average maps. 

![11_loadedscene](/connectomeWorkbench/11_loadedscene.png '11_loadedscene')

5. To change the displayed images for an individual’s data instead, click on the first ticked dropdown menu 

![12_fileselection](/connectomeWorkbench/12_fileselection.png '12_fileselection')

and select "S1200_7T_Retinotopy181.All.Fit1_PolarAngle_MSMALL.32k_fs_LR.dscalar.nii":

![13_polarAngleALL](/connectomeWorkbench/13_polarAngleALL.png '13_polarAngleALL')

6. Now, you should be able to select specific maps from the dropdown menu on the right. For example, here we have the first individual polar angle map (top left):

![14_index1](/connectomeWorkbench/14_index1.png '14_index1')

Now we have the fifth:

![14_index5](/connectomeWorkbench/14_index5.png '14_index5')

7. You can do the same for the other functional maps by navigating through the tabs at the top.

![15_tabs](/connectomeWorkbench/15_tabs.png '15_tabs')
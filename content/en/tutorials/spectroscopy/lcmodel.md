---
title: "Spectroscopy with lcmodel"
linkTitle: "lcmodel"
weight: 1
tags: ["lcmodel"]
author: Steffen Bollmann
description: >
  Using lcmodel, you can analyze MR spectroscopy data.
---

> _This tutorial was created by Steffen Bollmann._
>
> Github: [@stebo85](https://github.com/stebo85)
> Web: [mri.sbollmann.net](https://mri.sbollmann.net/)
> Twitter: [@sbollmann_MRI](https://twitter.com/sbollmann_MRI)


Open lcmodel from the menu: Applications -> Spectroscopy -> lcmodel -> lcmodel 6.3

run 
```
setup_lcmodel.sh
```

then run
```
lcmgui
```

We packed example data into the container (https://zenodo.org/record/3904443/) and we will use this to show a basic analysis.

The example data comes in the Varian fid format, so click on Varian:

<img width="522" alt="image" src="https://user-images.githubusercontent.com/4021595/155111509-967055c2-7ee1-4bf5-b645-6a0b1eee3328.png">


and then select the fid data in: /opt/datasets/Spectra_hippocampus(rat)_TE02/s_20131015_03_BDL106_scan0/isise_01.fid

<img width="751" alt="image" src="https://user-images.githubusercontent.com/4021595/155111715-305678e9-0c60-4154-bdf3-3aa5ccfd7da1.png">


Then Change BASIS and select the appropriate basis set in /opt/datasets/Spectra_hippocampus(rat)_TE02/Control_files_Basis_set

<img width="753" alt="image" src="https://user-images.githubusercontent.com/4021595/155111920-9df07a57-beb1-4507-ab7e-2c260a52d91d.png">


Then hit Run LCModel:

<img width="812" alt="image" src="https://user-images.githubusercontent.com/4021595/155112027-11350513-7616-4158-aca7-d5c0b07397d0.png">


and confirm:

<img width="199" alt="image" src="https://user-images.githubusercontent.com/4021595/155112122-1b93ff25-7469-4997-8aa6-e96a6784defa.png">


then wait a couple of minutes until the analyzed spectra appear - by closing the window you can go through the results:

<img width="893" alt="image" src="https://user-images.githubusercontent.com/4021595/155112432-c91bbdef-4701-4fee-a37a-b3bf8f847843.png">

the results are also saved in ~/.lcmodel/saved/


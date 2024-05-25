---
title: "Matlab"
linkTitle: "Matlab"
weight: 1
tags: ["matlab", "programming"]
author: Fernanda L. Ribeiro
aliases:
- /tutorials/programming/matlab
description: > 
  A tutorial for setting up your matlab license on Neurodesk.
---


> _This tutorial was created by Fernanda L. Ribeiro._ 
>
> Email: fernanda.ribeiro@uq.edu.au
>
> Github: @felenitaribeiro
>
> Twitter: @NandaRibeiro93
>
<!-- Fill in your personal details above so that we can credit the tutorial to you. Feel free to add any additional contact details i.e. website, or remove those that are irrelevant -->

<!-- Following line adds a link to getting set up with Neurodesk -->
{{< params/neurodesktop/getting_set_up >}}
<!-- -->

This tutorial documents how to set up your matlab license on Neurodesk. 

## Matlab license

0. Note: You need your own Matlab license to use Matlab in Neurodesk. You can either login to your matlab account or you can provide an institutional network license server if your neurodesk runs within your institution network and ran reach your license server.

1. a) Institutional network license
run the following command once and replace the address of your license server and the license number
```bash
mkdir -p /home/jovyan/Downloads && echo -e "SERVER rtlicense1.university.edu D1234560F6 27007\nUSE_SERVER" > /home/jovyan/Downloads/network.lic
```

1. b) Mathworks account: In the application menu, navigate to Neurodesk → Programming → matlab → matlabGUI 2022a

![1_menu](/static/tutorials-examples/tutorials/programming/matlab/0_appmenu.png '1_menu')

2. Select “Activate automatically using the internet” and hit next. 

![2_matlabgui](/static/tutorials-examples/tutorials/programming/matlab/1_matlabgui.png '2_matlabgui')

Then, add your email address and password from your MathWorks account (which you can set up using your university credentials if they provide a license for staff and students).

![2_login](/static/tutorials-examples/tutorials/programming/matlab/2_login.png '2_login')

3. Hit next after you select the appropriate license.

![3_license](/static/tutorials-examples/tutorials/programming/matlab/3_license.png '3_license')

4. Do not change the login name and hit next.

![4_username](/static/tutorials-examples/tutorials/programming/matlab/4_username.png '4_username')

5. Hit confirm, and you are all set!

![5_confirm](/static/tutorials-examples/tutorials/programming/matlab/5_confirm.png '5_confirm')

6. To launch the GUI, navigate through the application menu to Neurodesk → Programming → matlab → matlabGUI 2022a

## Calling Neurodesk tools from within Matlab
This is a new feature and doesn't work yet on Neurodesk for Apple Silicon. Make sure to run the latest version of Neurodesk and hit the update Button in the Application menu to ensure this works. You can use Neurodesk software within Matlab by adding the specific Neurodesk container to your execution Path. For the example of adding the FSL package, this can be done as follows in Matlab:

```
setenv("PATH",getenv("PATH") + ":/cvmfs/neurodesk.ardc.edu.au/containers/fsl_6.0.7.4_20231005");
```

Now you can, for example, use fslmaths in Matlab scripts:
<img width="1477" alt="image" src="https://github.com/NeuroDesk/neurodesk.github.io/assets/4021595/c98957ff-2bbc-4e6e-b7f5-313ed8ce4132">

Let us know if this works well for you, and we would be very keen to hear if there is a better way of integrating the lmod system in Matlab.

## Changing Matlab Keyboard Shortcuts
By default, Matlab uses the emacs keyboard shortcuts in Linux, which might not be what most users expect. To change the keyboard shortcuts to a more common pattern, follow the next steps:

Open the Preferences menu:

<img width="952" alt="image" src="https://github.com/NeuroDesk/neurodesk.github.io/assets/4021595/570c1ab4-2388-4f11-a8b4-939c5438a792">

Navigate to Keyboard -> Shortcuts and change the active settings from "Emacs Default Set" to "Windows Default Set":

<img width="656" alt="image" src="https://github.com/NeuroDesk/neurodesk.github.io/assets/4021595/59642792-2146-4ede-9bfa-90dffee7e85a">

---
title: "Analysing EEG Data with MNE"
linkTitle: "MNE-Python: EEG"
weight: 1
description: >
  Use mne-python to load, pre-process, and plot example EEG data in a jupyter notebook through vscode. 
---

## Getting started

Open Visual Studio Code:

![EEGtut1](/EEG_Tutorial/EEGtut1.png 'EEGtut1')

Open the folder: “/home/user/Desktop/neurodesktop-storage” or a subfolder in which you would like to store this demo. In this folder, create a new file named “EEGDemo.ipynb” or something similar:

![EEGtut2](/EEG_Tutorial/EEGtut2.png 'EEGtut2')

If this is your first time opening a Jupyter notebook on vscode in neurodesktop, you will see the following popup. If so, click “install” to install the vscode extensions for Jupyter.

![EEGtut3](/EEG_Tutorial/EEGtut3.png 'EEGtut3')

## Set up an environment

> Coming soon! Neurodesktop will soon feature a number of built in conda environments for standard analyses of behavioural, physiological, and encephalographic data. 

From the top menu in vscode, select Terminal->New Terminal, or hit [Ctrl]+[Shift]+[`]. From this terminal, create and activate a new conda environment in which to run mne-python. 

```
conda create --name=mne --channel=conda-forge mne python=3 jupyter nb_conda_kernels 
conda activate mne
```

Once your new environment is activated, in the top right corner of your empty jupyter notebook, click “Select Kernel”:

![EEGtut4](/EEG_Tutorial/EEGtut4.png 'EEGtut4')

Then, select the instance of Python associated with the environment you have just created (“mne”). If your new environment does not appear in the list, you may need to restart vscode:

![EEGtut5](/EEG_Tutorial/EEGtut5.png 'EEGtut5')

At this point you may also be prompted to install the vscode packages for python. Once you have installed these, you’re ready to rumble!

## Download sample data

In the terminal, input the following code to download some BIDS formatted sample EEG data:

```
pip install osfclient
osf -p C689U fetch Data_sample.zip /neurodesktop-storage/EEGDEMO/Data_sample.zip
unzip Data_sample.zip 
```

This is a small dataset with only 5 EEG channels from a single participant. The participant is viewing a frequency tagged display and is cued to attend to dots tagged at one frequency or another (6 Hz, 7.5 Hz) for long, 15 s trials. To read more about the dataset, click [here]( https://osf.io/c689u/)

## Plotting settings
To make sure our plots retain their interactivity, set the following line at the top of your notebook:
```
%matplotlib qt
```
This will mean your figures pop out as individual, interactive plots that will allow you to explore the data, rather than as static, inline plots. You can switch “qt” to “inline” to switch back to default, inline plotting. 

## Loading and processing data
> NOTE: MNE has many helpful tutorials which delve into data processing and analysis using MNE-python in much further detail. These can be found [here]( https://mne.tools/stable/auto_tutorials/index.html)

Begin by importing the necessary modules and creating a pointer to the data:
```
# Interactive plotting
%matplotlib qt

# Import modules
import os
import numpy as np
import mne

# Load data
sample_data_folder = '/home/user/Desktop/neurodesktop-storage/EEGDemo/Data_sample'
sample_data_raw_file = os.path.join(sample_data_folder, 'sub-01', 'eeg',
                                    'sub-01_task-FeatAttnDec_eeg.vhdr')
raw = mne.io.read_raw_brainvision(sample_data_raw_file , preload=True)
```

the raw.info structure contains information about the dataset:
```
# Display data info
print(raw)
print(raw.info)
```

This data file did not include a montage. Lets create one using standard values for the electrodes we have:
```
# Create montage
montage = {'Iz':  [0, -110, -40],
            'Oz': [0, -105, -15],
            'POz': [0,   -100, 15],
            'O1': [-40, -106, -15],
            'O2':  [40, -106, -15],
 }

montageuse = mne.channels.make_dig_montage(ch_pos=montage, lpa=[-82.5, -19.2, -46], nasion=[0, 83.2, -38.3], rpa=[82.2, -19.2, -46]) # based on mne help file on setting 10-20 montage
```

Next, lets visualise the data. 
```
raw.plot()
```

This should open an interactive window in which you can scroll through the data. See the MNE documentation for help on how to customise this plot. 

![EEGtut6](/EEG_Tutorial/EEGtut6.png 'EEGtut6')

If, upon visual inspection, you decide to exclude one of the channels, you can specify this in raw.info[‘bads’] now. For example:
```
raw.info['bads'] = ['POz']
```

Next, we’ll extract our events. The trigger channel in this file is incorrectly scaled, so we’ll correct that before we extract our events:
```
# Correct trigger scaling
trigchan = raw.pick('TRIG').copy()
trigchan._data = trigchan._data*1000000

# Extract events
events = mne.find_events(trigchan, stim_channel='TRIG', consecutive=True, initial_event=True, verbose=True)
print('Found %s events, first five:' % len(events))
print(events[:5])

# Plot events
mne.viz.plot_events(events, raw.info['sfreq'], raw.first_samp)
```

![EEGtut7](/EEG_Tutorial/EEGtut7.png 'EEGtut7')

Now that we’ve extracted our events, we can extract our EEG channels and do some simple pre-processing:
```
# select
eeg_data = raw.copy().pick_types(eeg=True, exclude=['TRIG'])

# Set montage
eeg_data.info.set_montage(montageuse)

# Interpolate
eeg_data_interp = eeg_data.copy().interpolate_bads(reset_bads=True) 

# Filter Data
eeg_data_interp.filter(l_freq=1, h_freq=45, h_trans_bandwidth=0.1)
```

Let’s visualise our data again now that it’s cleaner:
```
#plot results again, this time with some events and scaling. 
eeg_data_interp.plot(events=events, duration=10.0, scalings=dict(eeg=0.00005), color='k', event_color='r')
```

![EEGtut8](/EEG_Tutorial/EEGtut8.png 'EEGtut8')

That’s looking good! We can even see hints of the frequency tagging. It’s about time to epoch our data. 
```
# Epoch to events of interest
event_id = {'attend 6Hz K': 23, 'attend 7.5Hz K':  27}  

# Extract 15 s epochs relative to events, baseline correct, linear detrend, and reject 
# epochs where eeg amplitude is > 400
epochs = mne.Epochs(eeg_data_interp, events, event_id=event_id, tmin=0,
                    tmax=15, baseline=(0, 0), reject=dict(eeg=0.000400), detrend=1)  

# Drop bad trials
epochs.drop_bad()
```

We can average these epochs to form Event Related Potentials (ERPs):
```
# Average erpochs to form ERPs
attend6 = epochs['attend 6Hz K'].average()
attend75 = epochs['attend 7.5Hz K'].average()

# Plot ERPs
evokeds = dict(attend6=list(epochs['attend 6Hz K'].iter_evoked()),
               attend75=list(epochs['attend 7.5Hz K'].iter_evoked()))
mne.viz.plot_compare_evokeds(evokeds, combine='mean')
```

![EEGtut9](/EEG_Tutorial/EEGtut9.png 'EEGtut9')

From this point, we can export our data to numpy arrays or keep it in the MNE data format for any further analyses we would like to run. 

Congratulations! You’ve run your first analysis of EEG data in neurodesktop.

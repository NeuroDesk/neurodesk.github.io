---
title: "Bunya"
linkTitle: "Bunya"
weight: 2
description: >
  Use Neurodesk on Bunya
---


<!-- markdown-link-check-disable -->
Neurodesk is already installed at UQ's Bunya supercomputer. To access neurodesk tools you need to be in an interactive job (so either start a virtual desktop via Open On-Demand: https://bunya-ondemand.rcc.uq.edu.au/pun/sys/dashboard) or run:
```
salloc --nodes=1 --ntasks-per-node=1 --cpus-per-task=1 --mem=5G --job-name=TinyInteractive --time=01:00:00 --partition=debug --account=REPLACE_THIS_WITH_YOUR_AccountString srun --export=PATH,TERM,HOME,LANG --pty /bin/bash -l
```
<!-- markdown-link-check-enable -->

Then load the neurodesk modules:
```
module use /sw/local/rocky8/noarch/neuro/software/neurocommand/local/containers/modules/
export APPTAINER_BINDPATH=/scratch,/QRISdata
```

Now you can list all modules (Neurodesk modules are the first ones in the list):
```
ml av
```

Or you can module load any tool you need:
```
ml qsmxt/6.4.1
```

If you want to use GUI applications (fsleyes, afni, suma, ...) you need to overwrite the temporary directory to be /tmp (otherwise you get an error that it cannot connect to the DISPLAY):
```
export TMPDIR=/tmp 
```

If you are missing an application, please contact mail.neurodesk@gmail.com and ask for the neurodesk installation to be updated on Bunya :)

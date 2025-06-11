---
title: "How to cite us"
linkTitle: "Citation Guide"
weight: 2
aliases:
- /docs/how-to-cite-us
description: >
  How to cite Neurodesk and the tools used through the platform.
---

If you used Neurodesk in your research or teaching, please cite our main paper and the relevant containerized tools to ensure reproducibility and proper attribution.

## Citing Neurodesk
Please cite the [Neurodesk paper](https://www.nature.com/articles/s41592-023-02145-x). You can also access it via the [open access link](https://rdcu.be/eqro7) or refer to the [preprint version](https://www.biorxiv.org/content/10.1101/2022.12.23.521691v2).

If you used **Neurodesktop**, please include the version used (e.g., `v{{< params/neurodesktop/jupyter_neurodesk_version >}}`). See [examples below](#examples).

**Full citation:** 
Renton, A.I., Dao, T.T., Johnstone, T., Civier, O., Sullivan, R. P., White, D. J., ... Narayanan, A. & Bollmann, S. Neurodesk: an accessible, flexible and portable data analysis environment for reproducible neuroimaging. Nat Methods (2024). https://doi.org/10.1038/s41592-023-02145-x

**BibTeX:**
```
 @article{Renton2024,
            author = {Renton, Angela I and Dao, Thuy T and Johnstone, Tom and Civier, Oren and Sullivan, Ryan P and White, David J and Lyons, Paris and Slade, Benjamin M and Abbott, David F and Amos, Toluwani J and Bollmann, Saskia and Botting, Andy and Campbell, Megan E J and Chang, Jeryn and Close, Thomas G and D{\"{o}}rig, Monika and Eckstein, Korbinian and Egan, Gary F and Evas, Stefanie and Flandin, Guillaume and Garner, Kelly G and Garrido, Marta I and Ghosh, Satrajit S and Grignard, Martin and Halchenko, Yaroslav O and Hannan, Anthony J and Heinsfeld, Anibal S and Huber, Laurentius and Hughes, Matthew E and Kaczmarzyk, Jakub R and Kasper, Lars and Kuhlmann, Levin and Lou, Kexin and Mantilla-Ramos, Yorguin-Jose and Mattingley, Jason B and Meier, Michael L and Morris, Jo and Narayanan, Akshaiy and Pestilli, Franco and Puce, Aina and Ribeiro, Fernanda L and Rogasch, Nigel C and Rorden, Chris and Schira, Mark M and Shaw, Thomas B and Sowman, Paul F and Spitz, Gershon and Stewart, Ashley W and Ye, Xincheng and Zhu, Judy D and Narayanan, Aswin and Bollmann, Steffen},
            doi = {10.1038/s41592-023-02145-x},
            issn = {1548-7105},
            journal = {Nature Methods},
            number = {5},
            pages = {804--808},
            title = {{Neurodesk: an accessible, flexible and portable data analysis environment for reproducible neuroimaging}},
            url = {https://doi.org/10.1038/s41592-023-02145-x},
            volume = {21},
            year = {2024}
        }
```


## Citing specific tools
For reproducibility, please include the **tool name**, **version number**, and **build date** for any containerized application used in Neurodesk. This information is available in our [application list](https://www.neurodesk.org/docs/overview/applications/). 

In addition to citing Neurodesk, please remember to cite any original publication associated with each tool you use. Citation details can be found: 
- in the tool's ```README.md``` under [neurocontainers/recipes](https://github.com/NeuroDesk/neurocontainers/tree/master/recipes)
- Or in the tool’s interface within Neurodesktop


{{< alert title="Citing EEG/MEG related tools" >}}If you used any EEG/MEG/electrophysiology tools, please also cite the AEDAPT project.{{< /alert >}}


## Examples
Here are some example excerts of how to cite Neurodesk:

“TGV QSM (v1.0.0_20210629, Langkammer et al, 2015) was run in Neurodesk (v{{< params/neurodesktop/jupyter_neurodesk_version >}}, Renton et al, 2022)”

**EEG example:** "EEGlab (2020.0_20211026, Delorme & Makeig, 2004) was run in Neurodesk (v{{< params/neurodesktop/jupyter_neurodesk_version >}}, Renton et al, 2022) part of the AEDAPT project.”

### References
1. Langkammer, C; Bredies, K; Poser, BA; Barth, M; Reishofer, G; Fan, AP; Bilgic, B; Fazekas, F; Mainero; C; Ropele, S. Fast Quantitative Susceptibility Mapping using 3D EPI and Total Generalized Variation. Neuroimage. 2015 May 1;111:622-30. doi: [10.1016/j.neuroimage.2015.02.041](https://doi.org/10.1016/j.neuroimage.2015.02.041)
2. Renton, A.I., Dao, T.T., Johnstone, T., Civier, O., Sullivan, R. P., White, D. J., ... Narayanan, A. & Bollmann, S. Neurodesk: an accessible, flexible and portable data analysis environment for reproducible neuroimaging. Nat Methods (2024). [10.1038/s41592-023-02145-x](https://doi.org/10.1038/s41592-023-02145-x)
3. Delorme A & Makeig S (2004) EEGLAB: an open-source toolbox for analysis of single-trial EEG dynamics, Journal of Neuroscience Methods 134:9-21. doi: [10.1016/j.jneumeth.2003.10.009](https://doi.org/10.1016/j.jneumeth.2003.10.009)

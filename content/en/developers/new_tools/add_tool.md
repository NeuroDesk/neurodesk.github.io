---
title: "Add tools"
linkTitle: "Add tools"
weight: 1
description: >
  Add a tool to neurodesktop
---

The goal of *neurodesk* is to provide users with a large choice of tools to use in their pipelines.
Use the guide below to add a tool to *neurodesktop* or *neurocontainers*. 

## Guiding principles 
To decide if a tool should be packaged in a singularity container in *neurocontainers* or be installed in the *neurodesktop* container we are currently following these guiding principles:
1) *neurodesk* is not a package manager. This means we are not distributing tools in containers that can easily be installed via a standard package manager 
2) *neurodesk* allows users to have multiple versions of tools in parallel via [lmod]( https://lmod.readthedocs.io/en/latest/), this means that if different versions of a tool can't be installed in parallel we package the tool inside a container.
3) *neurodesk* aims to provide tooling to link tools from different containers (such as workflow managers like nipype or nextflow). This means that if a tool is required to coordinate various container-tools, it should be in the *neurodesktop* container.


Examples:
|            | easy install | coordinates containers | small in size | latest version is ok | useful more most users | Conclusion                     |
|------------|--------------|------------------------|---------------|----------------------|------------------------|--------------------------------|
| git        | yes          | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| lmod       | no           | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| nipype     | yes          | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| vscode     | yes          | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| itksnap    | yes          | no                     | yes           | yes                  | yes                    | container?                     |
| convert3D  | yes          | no                     | yes           | no                   | no                     | container                      |
| fsl        | no           | no                     | no            | no                   | no                     | container                      |
| mrtrix     | no           | no                     | no            | no                   | no                     | container                      |
| freesurfer | no           | no                     | no            | no                   | no                     | container                      |


## Build container
To build a container:
1) Add recipe to neurodocker if relevant (https://github.com/NeuroDesk/neurodocker) and create a pull request to neurodocker
2) Build the container [https://github.com/NeuroDesk/neurocontainers](https://github.com/NeuroDesk/neurocontainers)
3) Test the container, and if successful add the container to the apps.json file: https://github.com/NeuroDesk/neurocommand/blob/main/neurodesk/apps.json

## Advanced section
### Menu entry
As we want to propose several versions of the tools, each piece of software should have its own submenu under `VNM Neuroimaging`.
To do so, you first have to add a submenu to `menus/vnm-applications.menu` by adding:
```xml
<!-- [[Tool Name]] submenu -->
<Menu>
    <Name>[[Tool Name]]</Name>
    <Directory>vnm-[[tool-name]].directory</Directory>
    <Include>
        <And>
            <Category>[[Tool-Name]]</Category>
        </And>
    </Include>
</Menu> <!-- End [[Tool Name]] -->
```
The following table shows the formatting rules to follow:

Placeholder | Rule | Example
------------|------|---------
`[[Tool name]]` | Capitalized, spaces | `ITK snap`
`[[tool-name]]` | Lower case, no spaces (use `-` instead) | `itk-snap` or `itksnap`
`[[Tool-name]]` | Capitalized, no spaces (use `-` instead) | `ITK-snap`

Next, we have to create the submenu itself as we referenced it by `vnm-[[tool-name]].directory`. To do so, create the file `menus/submenus/vnm-[[tool-name]].directory` and add the following information inside:
```ini
[Desktop Entry]
Name=[[Tool Name]]
Comment=[[Tool Name]]
Icon=/home/neuro/.config/lxpanel/LXDE/icons/[[icon-name]].png
Type=Directory
```
If a specific icon is available in the `menus/icons` directory, replace `[[icon-name]]` by its name. Otherwise, use `vnm`.

### Create the application

Finally, we have to create the actual application by creating the file `menus/applications/vnm-[[tool-name]]-[[0.0.0]].desktop`. The name of this file must contain the version of the tool (once again to allow multiple versions to live inside the same directory). Add the following description to this file:
```ini
[Desktop Entry]
Name=[[Tool Name]] [[0.0.0]] [[(Install only)]]
GenericName=[[Tool Name]] [[0.0.0]]
Comment=The description of what clicking on this application does. # This will be the tooltip of the application.
Exec=The command used to run the application.
Icon=/home/neuro/.config/lxpanel/LXDE/icons/[[icon-name]].png
Type=Application
Categories=[[Tool-name]]
Terminal=true # or false
```

The important part here is the value of `Exec`. If the tool is in the form of a singularity image, you should run the following command:
```shell
bash /usr/share/fetch_and_run.sh [[tool-name]] [[0.0.0]] [[YYYYMMDD]] [[cmd]] [[args]]
```
What `fetch_and_run.sh` does is check if the image is already installed as a module. If not, it checks whether it can be installed or not (return `1` if not possible). After that, it installs the image as a module.
If `[[cmd]]` is specified, once the image is installed, it runs the command by giving the arguments from `[[args]]`.
Here are two examples for FreeSurfer and FreeView. This first one only installs the image as a module:
```shell
bash /usr/share/fetch_and_run.sh freesurfer 6.0.1 20200506
```
And this does the same but runs FreeView afterward:
```shell
bash /usr/share/fetch_and_run.sh freesurfer 6.0.1 20200506 freeview
```

The resulting `.desktop` file corresponding to FreeView contains:
```ini
[Desktop Entry]
Name=FreeView 6.0.1
GenericName=FreeView 6.0.1
Comment=Start FreeView 6.0.1
Exec=bash /usr/share/fetch_and_run.sh freesurfer 6.0.1 20200506 freeview
Icon=/home/neuro/.config/lxpanel/LXDE/icons/run.png
Type=Application
Categories=FreeSurfer
Terminal=true
```
---
title: "Add tool"
linkTitle: "Add tool"
weight: 4
description: >
  Add tool
---

The goal of *VNM* is to provide users with a large choice of tools to use in their pipelines.
Here is how you can add a tool to *VNM*. 

To decide if a tool should be packaged in a singularity container, or being installed in the main VNM container we are currently following these guiding principles:
1) VNM is not a package manager. This means we are not distribution tools in containers that can easily be installed via a standard package manager 
2) VNM allows users to have multiple versions of tools in parallel via lmod, this means that if different versions of tool can't be installed in parallel we package it inside a container.
3) VNM aims to provide simple tooling to link tools from different containers. This means that if a tool if required to coordinate container-tools, it should be in the main image.

Examples:
|            | easy install | coordinates containers | small in size | latest version is ok | useful more most users | Conclusion                     |
|------------|--------------|------------------------|---------------|----------------------|------------------------|--------------------------------|
| git        | yes          | yes                    | yes           | yes                  | yes                    | base                           |
| lmod       | no           | yes                    | yes           | yes                  | yes                    | base                           |
| nipype     | yes          | yes                    | yes           | yes                  | yes                    | base                           |
| vscode     | yes          | yes                    | yes           | yes                  | yes                    | base                           |
| itksnap    | yes          | no                     | yes           | yes                  | yes                    | container -> could be in base? |
| matlab     | yes          | yes                    | no            | no                   | no                     | container due to size?         |
| convert3D  | yes          | no                     | yes           | no                   | no                     | container                      |
| fsl        | no           | no                     | no            | no                   | no                     | container                      |
| mrtrix     | no           | no                     | no            | no                   | no                     | container                      |
| freesurfer | no           | no                     | no            | no                   | no                     | container                      |


Build container:
1) add recipe to neurodocker if relevant https://github.com/NeuroDesk/neurodocker and create pull request to neurodocker
2) build container here https://github.com/NeuroDesk/caid
3) test container and if successful add container to Readme table here https://github.com/NeuroDesk/neurodesk


As we want to propose several versions of the tools, each peace of software should have its own submenu under `VNM Neuroimaging`.
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
The following table showns what to replace by what:

Placeholder | Rule | Example
------------|------|---------
`[[Tool name]]` | Capitalized, spaces | `ITK snap`
`[[tool-name]]` | Lower case, no spaces (use `-` instead) | `itk-snap` or `itksnap`
`[[Tool-name]]` | Capitalized, no spaces (use `-` instead) | `ITK-snap`

Next, we have to create the submenu itself as we referenced it by `vnm-[[tool-name]].directory`. To do so, create the file `menus/submenus`vnm-[[tool-name]].directory` and add the following information inside:
```ini
[Desktop Entry]
Name=[[Tool Name]]
Comment=[[Tool Name]]
Icon=/home/neuro/.config/lxpanel/LXDE/icons/[[icon-name]].png
Type=Directory
```
If a specific icon is available in the `menus/icons` directory, replace `[[icon-name]]` by its name. Otherwise, use `vnm`.

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

The important part here is the value of `Exec`. If the tool is in the form of a singularity image, you should the following command:
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
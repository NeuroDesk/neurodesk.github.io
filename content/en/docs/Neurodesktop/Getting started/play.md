---
title: "Play"
linkTitle: "Play"
description: >
  Run neurodesktop _without_ installing anything
---

The Neurodesk project provides the following two publicly available services (Play and Lab) to run Neurodesk straight from the browser. Both services run inside a JupyterLab environments and are powered by Oracle cloud resources

## Neurodesk Play

Neurodesk Play requires no authentication to access. Recommended for quick access and trialling

Choose the link below closest to your location:
- [Australia East](https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main)
- [US West](https://play-phoenix.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main)
- [Germany Central](https://play-frankfurt.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main)
- [US East](https://play-ashburn.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main)

{{< alert color="warning">}}
Neurodesk Play does not preserve files from exited sessions
{{< /alert >}}

## Neurodesk Lab

Neurodesk Lab uses GitHub authentication. Recommended for processing data across multiple sessions

Choose the link below closest to your location:
- [Asia/Pacific](https://bhsydney.neurodesk.org/)
- [North America](https://bhnam.neurodesk.org/)
- [Europe](https://bheurope.neurodesk.org/)

{{< alert color="info">}}
Neurodesk Lab home directories will persist across sessions attached to each GitHub account
{{< /alert >}}

## How to transfer data onto Neurodesk Play and Lab

You can upload data to the desktop by simply drag-and-dropping files on the browser window. Data uploaded during your session are stored on Oracle Cloud, and will be automatically deleted at the end of the session. To download your files before deletion: You need to open the guacamole settings by pressing CTRL-ALT-SHIFT (Control-Command-Shift on Mac). This will open a menu on the side:

![{A12EDB8A-3D01-4524-A7B5-24E5E94FB418}](https://user-images.githubusercontent.com/4021595/160577828-0f8ba04e-aed7-4c26-a8d2-baf6c4be317a.png)


where you can click on "Shared Drive":

![{645953A1-5D11-48C7-9DFB-25D4339EEA34}](https://user-images.githubusercontent.com/4021595/160577926-06e48896-9301-426a-b7d5-9d3b2df14504.png)

and a click (or double clink on Mac) on the file will start the download.

You can browse into folders in the shared drive by clicking (double clicking on Mac) on them. To get back to the base of the shared drive, press on the drive icon in the top left of the side menu (just below the "Shared Drive" title).

To close the side menu, click on CTRL-ALT-SHIFT once more (Control-Command-Shift on Mac).


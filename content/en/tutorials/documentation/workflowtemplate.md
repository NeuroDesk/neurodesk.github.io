---
title: "Template for workflow creation"
linkTitle: "Workflow template"
weight: 1
tags: ["template", "documentation"]
author: Angela I. Renton
description: > 
  Follow this template to contribute your own workflow to the Neurodesk documentation.
---
<!--
Begin setting up your tutorial by filling in the details in the description above. This controls how your tutorial is named and displayed in the Neurodesk documentation. The details are as follows:

title: A title for your workflow
linkTitle: A shortened version of the title for the menu
weight: This controls where in the menu your tutorial will appear; you can leave this set to 1 for default sorting 
tags: List any number of tags to help others find this tutorial. i.e. "eeg", "mvpa", "statistics"
description: > a short description of your workflow. This will form the subheading for the tutorial page. 

Once you've filled out those details, you can delete this comment block. 
-->

> _This tutorial was created by Name P. Namington._ 
>
> Email: n.namington@institution.edu.au
>
> Github: @Namesgit
>
> Twitter: @Nameshandle
>
<!-- Fill in your personal details above so that we can credit the tutorial to you. Feel free to add any additional contact details i.e. website, or remove those that are irrelevant -->

Welcome to the workflow template, which you can use to contribute your own neurodesk workflow to our documentation. We aim to collect a wide variety of workflows representing the spectrum of tools available under the neurodesk architechture and the diversity in how researchers might apply them. Please add plently of descriptive detail and make sure that all steps of the workflow work before submitting the tutorial. 

You can embelish your text in this tutorial using markdown conventions; text can be **bold**, _italic_, or ~~strikethrough~~. You can also add [Links](https://neurodesk.github.io/).

## Level 2 heading

You can organise your tutorial with headers, starting at level 2 (the page title is a level 1 header). You can also include progressively smaller subheadings:

### Level 3 heading
Some more detailed information. 

#### Level 4 heading
Even more detailed information. 

## Code blocks

You can add codeblocks to your tutorial as follows:

```
# Some example code
import numpy as np
a = np.array([1, 2])
b = np.array([3, 4])
print(a+b)
```

Or add syntax highlighting to your codeblocks:
```go
# Some example code
import numpy as np
a = np.array([1, 2])
b = np.array([3, 4])
print(a+b)
```

You can also add code snippets, e.g. `var foo = "bar";`, which will be shown inline.

## Images

To add screenshots to your tutorial, create a subfolder in `neurodesk.github.io/static` with the same link name as your tutorial. Add your screenshot to this folder, keeping in mind that you may want to adjust your screenshot to a reasonable size before uploading. You can then embed these images in your tutorial using the following convention: 

![EEGtut1](/EEG_Tutorial/EEGtut1.png 'EEGtut1') <!-- ![filename without extension](/subfolder_name/filename.png '[filename without extension')  -->

## Alets and warnings

You can grab reader's attention to particularly important information with quoteblocks, alerts and warnings:

> This is a quoteblock

{{< alert >}}This is an alert.{{< /alert >}}
{{< alert title="Note" >}}This is an alert with a title.{{< /alert >}}
{{< alert color="warning" >}}This is a warning.{{< /alert >}}
{{< alert color="warning" title="Warning" >}}This is a warning with a title.{{< /alert >}}

You can also segment information as follows:

----------------

There's a horizontal rule above and below this.

----------------

Of add page information:
{{% pageinfo %}}
This is a placeholder. Replace it with your own content.
{{% /pageinfo %}}

## Tables

You may want to order information in a table as follows:

| Neuroscientist           | Notable work                                         | Lifetime  |
|--------------------------|------------------------------------------------------|-----------|
| Santiago Ramón y Cajal   | Investigations on microscopic structure of the brain | 1852–1934 |
| Rita Levi-Montalcini     | Discovery of nerve growth factor (NGF)               | 1909–2012 |
| Anne Treisman            | Feature integration theory of attention              | 1935–2018 |

## Lists

You may want to organise information in a list as follows:

Here is an unordered list:

* Rstudio
* JASP
* SPSS

And an ordered list:

1. Collect data
2. Try to install analysis software
3. Cry a little

And an unordered task list:

- [x] Install Neurodesktop
- [x] Analyse data
- [ ] Take a vacation

And a "mixed" task list:

- [ ] writing
- ?
- [ ] more writing probably

And a nested list:

* EEG file extensions
  * .eeg, .vhdr, .vmrk
  * .edf
  * .bdf
  * .set, .fdt
  * .smr
* MEG file extensions
  * .ds
  * .fif
  * .sqd
  * .raw
  * .kdf

## Thanks 

Thanks so much for taking the time to contribute your workflow to the Neurodesk community! If you have any feedback on the process, please let us know on [github discussions](https://github.com/NeuroDesk/neurodesk.github.io/discussions).
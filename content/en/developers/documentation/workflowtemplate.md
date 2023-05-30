---
title: "Template for tutorial creation"
linkTitle: "Tutorial template"
weight: 1
tags: ["template", "documentation"]
author: Angela I. Renton
description: > 
  Follow this template to contribute your own tutorial to the Neurodesk documentation.
---
<!--
Begin setting up your tutorial by filling in the details in the description above. This controls how your tutorial is named and displayed in the Neurodesk documentation. The details are as follows:

title: A title for your tutorial
linkTitle: A shortened version of the title for the menu
weight: This controls where in the menu your tutorial will appear; you can leave this set to 1 for default sorting 
tags: List any number of tags to help others find this tutorial. i.e. "eeg", "mvpa", "statistics"
description: > a short description of your tutorial. This will form the subheading for the tutorial page. 

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

Welcome to the workflow (tutorial) template, which you can use to contribute your own neurodesk workflow to our documentation. We aim to collect a wide variety of workflows representing the spectrum of tools available under the neurodesk architecture and the diversity in how researchers might apply them. Please add plenty of descriptive detail and make sure that all steps of the workflow work before submitting the tutorial. 

## How to contribute a new workflow

Begin by creating a copy of our documentation that you can edit:
1. Visit the github repository for the Neurodesk documentation (https://github.com/NeuroDesk/neurodesk.github.io ).
2. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository.
- _You should now have your own copy of the documentation, which you can alter without affecting our official documentation. You should see a panel stating "This branch is up to date with Neurodesk:main." If someone else makes a change to the official documentation, the statement will change to reflect this. You can bring your repository up to date by clicking "Fetch upstream"._ 

Next, create your workflow:
1. [Clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) your forked version of our documentation to a location of your choice on your computer. 
2. In this new folder, navigate to "neurodesk.github.io/content/en/tutorials" and then navigate to the subfolder you believe your workflow belongs in (e.g. "/functional_imaging"). 
3. Create a new, appropriately named markdown file to house your workflow. (e.g. "/physio.md")
4. Open this file in the editor of your choice (we recommend [vscode](https://code.visualstudio.com)) and populate it with your workflow! Please use this template as a style guide, it can be located at "neurodesk.github.io\content\en\tutorials\documentation\workflowtemplate.md". You're also welcome to have a look at other the workflows already documented on our website for inspiration. 

Finally, contribute your new workflow to the official documentation!:
1. Once you are happy with your workflow, make sure you [commit](https://github.com/git-guides/git-commit) all your changes and [push](https://github.com/git-guides/git-push) these local commits to github.
2. Navigate to your forked version of the repository on github.
3. Before you proceed, make sure you are up to date with our upstream documentation, you may need to [fetch upstream changes](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).
4. Now you can preview the changes before contributing them upstream. For this click on the "Actions" tab and enable the Actions ("I understand my workflows..."). The first build will fail (due to a bug with the Github token), but the second build will work.
5. Then you need to open the settings of the repository and check that Pages points to gh-pages and when clicking on the link the site should be there.
6. To contribute your changes, click "Contribute", and then ["Open pull request"](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).
7. Give your pull request a title (e.g. "Document PhysIO workflow"), leave a comment briefly describing what you have done, and then create the pull request. 
8. Someone from the Neurodesk team will review and accept your workflow and it will appear on our website soon!. 

Thanks so much for taking the time to contribute your workflow to the Neurodesk community! If you have any feedback on the process, please let us know on [github discussions](https://github.com/orgs/NeuroDesk/discussions).

## Formatting guidelines

You can embelish your text in this tutorial using markdown conventions; text can be **bold**, _italic_, or ~~strikethrough~~. You can also add [Links](https://www.neurodesk.org), and you can organise your tutorial with headers, starting at level 2 (the page title is a level 1 header):

## Level 2 heading

You can also include progressively smaller subheadings:

### Level 3 heading

Some more detailed information. 

#### Level 4 heading

Even more detailed information. 

### Code blocks

You can add codeblocks to your tutorial as follows:

```none
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

Advanced code or command line formatting using this html snippet:
```bash
# Some example code
import numpy as np
a = np.array([1, 2])
b = np.array([3, 4])
print(a+b)
[4 6]
```

You can also add code snippets, e.g. `var foo = "bar";`, which will be shown inline.

### Images

To add screenshots to your tutorial, create a subfolder in `neurodesk.github.io/static` with the same link name as your tutorial. Add your screenshot to this folder, keeping in mind that you may want to adjust your screenshot to a reasonable size before uploading. You can then embed these images in your tutorial using the following convention: 

```
![EEGtut1](/EEG_Tutorial/EEGtut1.png 'EEGtut1') <!-- ![filename without extension](/subfolder_name/filename.png '[filename without extension')  -->
```
![EEGtut1](/EEG_Tutorial/EEGtut1.png 'EEGtut1') <!-- ![filename without extension](/subfolder_name/filename.png '[filename without extension')  -->

### Alerts and warnings

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

Or add page information:
{{% pageinfo %}}
This is a placeholder. Replace it with your own content.
{{% /pageinfo %}}

### Tables

You may want to order information in a table as follows:

| Neuroscientist           | Notable work                                         | Lifetime  |
|--------------------------|------------------------------------------------------|-----------|
| Santiago Ramón y Cajal   | Investigations on microscopic structure of the brain | 1852–1934 |
| Rita Levi-Montalcini     | Discovery of nerve growth factor (NGF)               | 1909–2012 |
| Anne Treisman            | Feature integration theory of attention              | 1935–2018 |

### Lists

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


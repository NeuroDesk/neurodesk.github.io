---
title: "Contribute to Neurodesk.org"
linkTitle: "Contribute Content"
weight: 2
author: Angela I. Renton, updated by Michèle Masson-Trottier
aliases:
- /tutorials/tutorial-template
tags: ["template", "documentation"]
description: >
  A brief guide for contributing new content in Markdown through Github.
---

This applies if you with to submit a new tutorial or amend content on a page. Our website is mostly written in Markdown (.md files). We include the basics of writing in Markdown on this page.

## Table of contents

* [Create your own copy of *NeuroDesk/neurodesk.github.io* repository](#create-your-own-copy-of-neurodeskneurodeskgithubio-repository-where-you-will-be-able-to-make-modifications)
* [Create your content or make your modifications](#create-your-content-or-make-your-modifications)
* [Contribute your new content to the official documentation](#contribute-your-new-content-to-the-official-documentation)
* [Formatting guidelines](#formatting-guidelines)
* [Code blocks](#code-blocks)
* [Images](#images)
* [Alerts and warnings](#alerts-and-warnings)
* [Tables](#tables)
* [Lists](#lists)

### Create your own copy of *NeuroDesk/neurodesk.github.io* repository where you will be able to make modifications


Begin by creating a copy of our documentation that you can edit:
1. Visit the GitHub repository for the [Neurodesk documentation](https://github.com/NeuroDesk/neurodesk.github.io).
2. [**Fork**](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository.


![1_fork](/static/tutorials-examples/tutorials/tutorial-template/1_fork.png 'Repo fork')


{{< alert title="Why fork the repository?" >}} You will now have your own copy of the documentation that you can alter without affecting our official documentation. You will see a panel stating _"This branch is up to date with Neurodesk:main."_ If someone else makes a change to the official documentation, the statement will change to reflect this. You can bring your repository up to date by clicking _"Sync fork"._ {{< /alert >}}

![2_syncfork](/static/tutorials-examples/tutorials/tutorial-template/2_syncFork.png 'Sync fork')


![3_synced](/static/tutorials-examples/tutorials/tutorial-template/3_synced.png 'Sync status')

----------------
### Create your content or make your modifications
1. [**Clone**](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) your forked version of our documentation to a location of your choice on your computer. 

This step is the same for macOS, Windows, and Linux.

#### Using SSH
```bash
git clone --recurse-submodules git@github.com:NeuroDesk/neurodesk.github.io.git
```
or 
#### Using HTTPS
```bash
git clone --recurse-submodules https://github.com/NeuroDesk/neurodesk.github.io.git
```

#### If you cloned without --recurse-submodules

Run the following command to pull submodules

```bash
git submodule update --init --recursive --remote
```

The URL for the repository can be copied by clicking on the button highlighted below:

![4_clone](/static/tutorials-examples/tutorials/tutorial-template/4_clone.png 'Repo URL')

<!-- markdown-link-check-disable -->


2. Now, you can open your copy of `neurodesk.github.io` using the editor of your choice (we recommend [vscode](https://code.visualstudio.com/)). Before making changes to the current repository, the best practice is to create a new [branch](https://www.atlassian.com/git/tutorials/using-branches) for avoiding version conflicts. 
<!-- markdown-link-check-enable -->

  - Create a branch:
```bash
git branch tutorial-template
```
  - Checkout the branch you want to use for the addition or changes you'd like to make
```bash
git checkout tutorial-template
```
  - Confirm you are in the right branch:
```bash 
git branch
```
![5_branch](/static/tutorials-examples/tutorials/tutorial-template/5_branch.png 'Branch check')
  

3. Within your cloned environment, navigate to where you'd like to make your changes. 

For example, if you'd like to create new tutorial content, go in `neurodesk.github.io/content/en/tutorials-examples/tutorials/` and then navigate to the subfolder you believe your tutorial belongs in (e.g. "/functional_imaging")

4. Create a new, appropriately named markdown file to house your content (e.g. for a tutorial about physiology, you might call it "physio.md"). Images need to be stored in the [```/static```](https://github.com/neurodesk/neurodesk.github.io/tree/main/static) directory - please mirror the same directory structure as for your markdown files.

5. Open this file and populate it with your content! You're also welcome to look at other tutorials already documented on our website for inspiration.

----------------
### Contribute your new content to the official documentation

1. Once you are happy with your content, to avoid merge conflicts, rebase your branch with the *main* branch, which should be synced with *NeuroDesk/neurodesk.github.io:main* (on GitHub check if your repo is synced and locally checkout the *main* branch and run *git pull*).

```bash
git rebase main
```

You might have to correct some merge conflicts, but [vscode](https://learn.microsoft.com/en-us/visualstudio/version-control/git-resolve-conflicts?view=vs-2022) makes it easy.

2. [Commit](https://github.com/git-guides/git-commit) all your changes  and [push](https://github.com/git-guides/git-push) these local commits to GitHub.

3. Navigate to your forked version of the repository on GitHub and switch branches for the one with your additions.

![6_branchswitch](/static/tutorials-examples/tutorials/tutorial-template/6_switchbranch.png 'Switching branches')

4. Now, you can preview the changes before contributing them upstream. For this, if this is your first time to run the Action build, click on the "Actions" tab and enable the Actions ("I understand my tutorials..."). The first build will fail (due to a bug with the Github token), but the second build will work. You can run the workflow if clicking on each of them in the left sidebar.

![7_run_github_workflow](/static/tutorials-examples/tutorials/tutorial-template/7_run_github_workflow.png 'Contribute')

5. Then you need to open the settings of the repository and check that Pages points to gh-pages, and when clicking on the link, the site should be there.

6. To contribute your changes, click "Compare & pull request" and then ["Create pull request"](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

![8_contribute](/static/tutorials-examples/tutorials/tutorial-template/8_contribute.png 'Contribute')


7. Give your pull request a title (e.g. "Document PhysIO tutorial"), leave a comment briefly describing what you have done, and then create the pull request. 

8. Someone from the Neurodesk team will review and accept your changes, which will appear on our website soon! 

Thanks so much for taking the time to contribute content to the Neurodesk community! If you have any feedback on the process, please let us know on [github discussions](https://github.com/orgs/NeuroDesk/discussions).

----------------
### Formatting guidelines

As seen throughout this tutorial, you can embellish your text using markdown conventions; text can be **bold**, _italic_, or ~~strikethrough~~. You can also add [Links](https://www.neurodesk.org/), and you can organise your content with headers, starting at level 2 (the page title is a level 1 header):

## Level 2 heading

You can also include progressively smaller subheadings:

### Level 3 heading

Some more detailed information. 

#### Level 4 heading

Even more detailed information. 

### Code blocks

You can add codeblocks to your content as follows:

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

----------------
### Images

To add screenshots and images to your content, create a subfolder in [`/static`](https://github.com/neurodesk/neurodesk.github.io/tree/main/static) with the same file structure as in your content markdown file. Add your screenshot to this folder, keeping in mind that you may want to adjust your screenshot to a reasonable size before uploading. You can then embed these images in your tutorial using the following convention: 

For a `filename.png` in a `/content/en/tutorials-examples/subject/tutorial1/markdownfile.md` use
```
![filename](/static/...<fullpathhere>.../filename.png '[filename')
```
For example: `EEGtut1.png` in `/content/en/tutorials-examples/tutorials/electrophysiology/eeg_mne-python.md` would be
```
![EEGtut1](/static/tutorials-examples/tutorials/electrophysiology/eeg_mne-python/EEGtut1.png 'EEGtut1')
```
![EEGtut1](/static/tutorials-examples/tutorials/electrophysiology/eeg_mne-python/EEGtut1.png 'EEGtut1') <!-- ![filename without extension](/subfolder_name/filename.png '[filename without extension')  -->

----------------
### Alerts and warnings

You can grab the reader's attention to particularly important information with quoteblocks, alerts, and warnings:

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

----------------
### Tables

You may want to order information in a table as follows:

| Neuroscientist           | Notable work                                         | Lifetime  |
|--------------------------|------------------------------------------------------|-----------|
| Santiago Ramón y Cajal   | Investigations on microscopic structure of the brain | 1852–1934 |
| Rita Levi-Montalcini     | Discovery of nerve growth factor (NGF)               | 1909–2012 |
| Anne Treisman            | Feature integration theory of attention              | 1935–2018 |

----------------
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

## Need Help?

If you have questions or would like feedback before submitting:

- Open a [discussion](https://github.com/NeuroDesk/neurodesk.github.io/discussions)

We appreciate your contribution to the Neurodesk community and reproducible science.
---
title: "Contribute Tutorials"
linkTitle: "Contribute tutorials"
weight: 1
author: Angela I. Renton, updated by Michèle Masson-Trottier
aliases:
- /tutorials/tutorial-template
tags: ["template", "documentation"]
description: >
  A brief guide for contributing new tutorials.
---

We welcome tutorials that walk users through using tools or workflows available in Neurodesk. These tutorials are valuable learning resources that support accessible, reproducible neuroimaging.

Tutorials are written in Markdown and hosted in the [`neurodesk.github.io:tutorials`](https://github.com/Neurodesk/neurodesk.github.io/tree/main/content/en/tutorials-examples/tutorials) repository, where they appear as part of the documentation site.

---

## Getting Started

To contribute a new tutorial, follow the steps below:

### 1. Start from the template

Download the [tutorial Markdown template](https://github.com/Neurodesk/neurodesk.github.io/blob/main/.github/content-templates/tutorial-template.md) file from GitHub and edit it locally with your own content. 


The template includes:

- A frontmatter block with `title`, `linkTitle`, `description`, and other metadata
- A placeholder author attribution block
- Section headings and content structure for a clear tutorial layout

### 2. Follow best practices

- Use clear, descriptive section headers
- Include step-by-step instructions with commands and screenshots
- Store images in the appropriate `/static/` folder and link them with full paths
- Write in plain Markdown, using Hugo formatting where needed

See existing [tutorial examples](/tutorials-examples/tutorials/) for reference.

---
## Saving and Submitting

Follow the steps for [contributing content to Neurodesk.org](/developers/documentation/creating-website-content)

1. Place your completed `.md` file in the appropriate subfolder under:

   [`/content/en/tutorials-examples/tutorials/`](https://github.com/NeuroDesk/neurodesk.github.io/tree/main/content/en/tutorials-examples/tutorials)

2. Store any images in a matching subfolder in `/static/tutorials-examples/tutorials/`

3. Open a pull request in the [neurodesk.github.io repository](https://github.com/NeuroDesk/neurodesk.github.io)

4. In your pull request, include:
   - A short summary of your tutorial
   - Your name and GitHub handle (if you'd like to be credited)

---

## Attribution

All tutorial contributors are acknowledged on the [Contributors page](/developers/contributors/).  
To be listed, include your name and a short description in your pull request using [this format](https://github.com/NeuroDesk/neurodesk.github.io/blob/main/.github/content-templates/contributor-format.md).

---

## Need Help?

If you have questions or would like feedback before submitting:

- Open a [discussion](https://github.com/NeuroDesk/neurodesk.github.io/discussions)

We appreciate your contribution to the Neurodesk community and reproducible science.
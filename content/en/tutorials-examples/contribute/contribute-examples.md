---
title: "Contribute Example Notebooks"
linkTitle: "Contribute examples"
weight: 1
aliases:
  - /tutorials/tutorial-template
description: >
  A brief guide for contributing new example notebooks.
---

We welcome example notebooks that demonstrate how to use tools within Neurodesk. These notebooks serve as valuable learning resources and promote reproducible workflows across the neuroimaging community.

Example notebooks are hosted in the [`neurodesk/example-notebooks`](https://github.com/Neurodesk/example-notebooks) repository and are intended to be lightweight, self-contained, and easy to follow.

---

## Getting Started

To contribute a new notebook, follow the steps below:

### 1. Start from the template

Use the official [example notebook template](https://github.com/Neurodesk/example-notebooks/blob/main/template.ipynb) as a starting point. It includes guidance on formatting, structure, metadata, and citation instructions.

Each notebook should contain:

- A clear title and short description
- An overview of the tool or workflow demonstrated
- The container/tool version used
- Code cells with explanatory comments
- Example data (or guidance on how to access it)

### 2. Follow best practices

- Keep notebooks self-contained and executable top to bottom. Before being published, a Github Action will confirm the Notebook is working.
- Avoid hardcoded file paths where possible
- Use publicly accessible datasets
- Include inline comments and Markdown cells for explanation

For more detail, consult the [README in the example-notebooks repository](https://github.com/Neurodesk/example-notebooks#readme).

---

## Saving and Submitting

1. Add your completed notebook to the appropriate folder under:

   [`/books/`](https://github.com/Neurodesk/example-notebooks/tree/main/books)

2. Open a pull request in the [example-notebooks repository](https://github.com/Neurodesk/example-notebooks)

3. In your pull request, include:
   - A short description of your notebook
   - Any dependencies or expected output

---

## Attribution

All notebook contributors are acknowledged on the Neurodesk [Contributors page](/developers/contributors/).  
Please include your name and a short description in your pull request using [this format](https://github.com/NeuroDesk/neurodesk.github.io/blob/main/.github/content-templates/contributor-format.md).

Each example notebook receives a DOI for formal citation via Zenodo, ensuring your work is citable in academic contexts.

---

## Need Help?

If you have questions or would like feedback before submitting:

- Open a [discussion](https://github.com/orgs/neurodesk/discussions)

We look forward to your contributions and thank you for supporting open and reproducible neuroimaging.

---
title: "Contribute Tutorials and Example Notebooks"
linkTitle: "Contribute"
weight: 3
aliases:
- /tutorials/tutorial-template
description: >
  A brief guide for contributing new tutorials and example notebooks.
---

Neurodesk welcomes community-contributed content. We aim to collect a wide variety of tutorials and examples representing the spectrum of tools available under the Neurodesk architecture and the diversity in how researchers might apply them. Sharing your expertise helps others learn and supports reproducible research.
- A **tutorial**: Markdown-based, concise step-by-step documentation integrated into the website, for using specific neuroimaging software on neurodesk with screenshots for visual aid
- An **example notebook**: Jupyter notebooks that illustrate tool usage or analysis pipelines are stored in a separate repository. These notebooks can be interactive and are ideal for showcasing scripts, visualizations, or code-driven workflows.


---

## How to Contribute

To contribute a new tutorial or example notebook:

1. **Start from the template**  
   Use the [tutorial template](https://github.com/neurodesk/neurodesk.github.io/blob/main/.github/content-templates/tutorial-template.md) or the [example notebook template](https://github.com/Neurodesk/example-notebooks/blob/main/template.ipynb) as a starting point. They include recommended formatting and structure.

2. **Follow the documentation style**  
   Write clearly and concisely. Include any necessary prerequisites, commands, and expected outputs.  
   - Tutorials should use Markdown with well-formatted headings, lists, and code blocks  
   - Notebooks should be well-commented and executable from start to finish

3. **Save your content**  
   - For **tutorials**: add your Markdown file to the 
     [Github neurodesk.github.io: tutorials folder](https://github.com/NeuroDesk/neurodesk.github.io/tree/main/content/en/tutorials-examples/tutorials)

   - For **example notebooks**: add your `.ipynb` file to the 
     [Github example-notebooks: books folder](https://github.com/Neurodesk/example-notebooks/tree/main/books)


4. **Submit your contribution**  
   - Open a pull request to the appropriate repository  
   - Include a brief summary of what your tutorial or notebook covers  
   - Check that any links, figures, or code blocks are working and properly rendered
---

## Tips for Good Tutorials

- Focus on a specific tool or workflow
- Include sample commands and outputs
- Keep it as reproducible by using open dataset
- Link to any relevant containers, documentation, or datasets

---

## Attribution

We credit all tutorial contributors on the [Contributors page](/developers/contributors/).  
If you would like to be listed, please include your name and a short description in your pull request, following [this format](https://github.com/NeuroDesk/neurodesk.github.io/blob/main/.github/content-templates/contributor-format.md).

In addition, each example notebook receives a DOI for formal attribution through Zenodo. This ensures that your contribution is citable and can be referenced in academic publications.

---

## Need Help?

If you have questions or would like feedback before submitting, feel free to open a [discussion](https://github.com/NeuroDesk/neurodesk.github.io/discussions).

Thank you for helping build a more accessible and collaborative neuroimaging community.
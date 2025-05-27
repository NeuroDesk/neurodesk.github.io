# CONTRIBUTING

- [CONTRIBUTING](#contributing)
    - [Repo map](#repo-map)
    - [How to Contribute](#how-to-contribute)
        - [Prerequisites](#prerequisites)
            - [node.js](#nodejs)
            - [Hugo](#hugo)
        - [Clone repo and its submodules](#clone-repo-and-its-submodules)
        - [Install javascripts dependencies](#install-javascripts-dependencies)
        - [Serve the website locally](#serve-the-website-locally)


Thank you for your interest in contributing to the Neurodesk documentation and developer site!

This repository contains the source code for the [Neurodesk developer documentation website](https://www.neurodesk.org). It is built with [Hugo](https://gohugo.io/) and the [Docsy theme](https://www.docsy.dev/).

We welcome contributions to:

- Correct or improve existing documentation
- Update release histories or contributor lists

## Repo map

```bash
├── .github               # For continuous integration and issue / PR templates
│   └── content-templates # Internal templates (e.g., release history, contributor format)
│   └── workflows         # GitHub Actions workflows for CI/CD
├── assets                # JavaScript and SCSS for custom styling
│   ├── js
│   └── scss
├── content               # Website content written in Markdown
│   └── en
│       ├── admins        # Folders use layout from "layouts/" or "themes/docsy/layouts/"
│       ├── docs         
│       └── tutorials
├── data                  # Site configuration data used in templates or shortcodes
├── layouts               # Custom HTML layout overrides
│   ├── admins
│   ├── blog
│   ├── shortcodes        # Custom shortcodes for content components
│   │   ├── blocks
│   │   └── params
│   └── tutorials
└── themes
    └── docsy             # docsy theme submodule: DO NOT TOUCH
        ├── assets
        ├── .git
        ├── i18n
        ├── images
        ├── layouts
        ├── static
        └── userguide
```

## How to Contribute

1. **Fork the repository** to your Github profil
2. **Clone your fork** and create a new branch for your changes
3. Make your edits in Markdown files under `content/en/`
4. Preview the site locally (see `[Local Hugo Docsy page](https://www.neurodesk.org/developers/documentation/local-hugo-docsy/)` for more detailed instructions)
5. Submit a Pull Request

Please follow our [content formatting templates](https://github.com/NeuroDesk/neurodesk.github.io/tree/main/.github/templates) when adding:
- Release history sections
- Contributor acknowledgments
- Tool submission documentation (COMING SOON)

## Build locally

### Prerequisites

#### node.js

A quick version (for Mac and Linux) that will also allow to manage different version of node
is to install node via the "node version manager".

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

open a new terminal or source your .bashrc and then:
```bash
nvm install node
```

#### Hugo

- [See the install page](https://gohugo.io/getting-started/installing/)

one example for Linux or for the [Windows Sub-system for Linux](https://docs.microsoft.com/en-us/windows/wsl/install):
```bash
wget https://github.com/gohugoio/hugo/releases/download/v0.92.2/hugo_extended_0.92.2_Linux-64bit.tar.gz
tar xfz hugo_extended_0.92.2_Linux-64bit.tar.gz
echo "export PATH=`pwd`:\$PATH" >> ~/.bashrc
source ~/.bashrc
which hugo
```

### Clone repo and its submodules

```
git clone --recurse-submodules https://github.com/brainhackorg/brainhack_cloud
cd brainhack_cloud
```

If you have only cloned the repo and did not get all the submodules (`docsy` and `docsy`'s own subdmodules),
simply run

```
git submodule update --init --recursive && git submodule update --recursive
```

### Install javascripts dependencies

```
npm install
```

### Serve the website locally
```
hugo server -D
```

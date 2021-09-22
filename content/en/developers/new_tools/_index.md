---
title: "How to add new tools"
linkTitle: "How to add new tools"
weight: 2
description: >
  Developer guide
---

## Developing neurodesk.github.io

### Clone repository
Using SSH

`git clone --recurse-submodules git@github.com:NeuroDesk/neurodesk.github.io.git`

or Https:

`git clone --recurse-submodules https://github.com/NeuroDesk/neurodesk.github.io.git`


### Download Hugo binary

Hugo releases are on https://github.com/gohugoio/hugo/releases

Download latest version of hugo extended

e.g. for windows: https://github.com/gohugoio/hugo/releases/download/v0.88.1/hugo_extended_0.88.1_Windows-64bit.zip


### Start local hugo server

Extract hugo binary (hugo.exe) to your neurodesk.github.io dir

Run server for windows: `.\hugo.exe server --disableFastRender`

Once started, dev website will be accessible via http://localhost:1313


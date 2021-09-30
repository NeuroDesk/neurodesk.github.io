---
title: "Neurodestkop Release Process"
linkTitle: "Release Process"
weight: 1
description: >
  A description of what to do to create new release of our Neurodesktop
---

1. Check if the last automated build ran OK: https://github.com/NeuroDesk/neurodesktop/actions
2. Run this build date and test if everything is ok and no regression happened
3. Check what changes where made since the last release: https://github.com/NeuroDesk/neurodesktop/commits/main
4. Summarize the main changes and copy this to the Release History and the news section:
- https://neurodesk.github.io/docs/neurodesktop/release-history/
- https://neurodesk.github.io/blog/releases/
5. Change the version of the latest desktop in https://github.com/NeuroDesk/neurodesk.github.io/blob/hugo-docsy/data/neurodesktop.toml
6. Commit all changes
7. Tweet a quick summary of the changes and announce new version: https://twitter.com/neuro_desk
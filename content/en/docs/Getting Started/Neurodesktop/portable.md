---
title: "Portable Unprivileged NeuroDesktop"
linkTitle: "Portable"
weight: 1
aliases:
- /docs/getting-started/neurodesktop/portable/
description: >
  An unprivileged option for running NeuroDesktop without Docker or Podman.
---

{{< alert color="info" >}}
Installing TinyRange manually is for advanced users only. These instructions should be used as a supplement to running NeurodeskApp.
{{< /alert >}}

### Minimum System Requirements

1. At least 5GB free space for neurodesktop base image
2. At least 8GB of RAM

## Downloading TinyRange

TinyRange (https://github.com/tinyrange/tinyrange) is a lightweight runtime for running Virtual Machines and Containers. It runs without admin privileges and doesn't need Docker or Podman installed to work.

Downlaod the latest version of TinyRange from: https://github.com/tinyrange/tinyrange/releases/latest

{{< alert color="info" >}}
**Windows on ARM:** TinyRange is not currently supported on Windows for ARM (Copilot+ Laptops with ARM64/Snapdragon CPUs)
{{< /alert >}}

## Installing TinyRange

- Unzip the archive to some local path on your computer. It's recommended not to extract it to a network drive.
- Open a terminal in the extracted archive and run `./tinyrange login` or `tinyrange login` on Windows.
- Once you see the `tinyrange:~#` type `exit`.

## Enabling Hardware Acceleration

- **Windows:** This might require admin privileges in some cases. Search in your start menu for "Turn Windows features on or off.". Find "Hyper-V Hypervisor" or "Windows Hypervisor Platform" and make sure it's enabled. Alternatively, run `dism /online /enable-feature /featurename:"HypervisorPlatform"` in an Administrator shell. Then restart your computer. To test if it's working correctly run: `tinyrange.exe env check-hv`
- **Ubuntu/Other Linux:** It should already work out of the box. If not make sure your user account has permission to read/write `/dev/kvm`.
- **MacOS:** No extra steps required. It already works.

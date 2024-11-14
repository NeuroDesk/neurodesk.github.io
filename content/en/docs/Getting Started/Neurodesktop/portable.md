---
title: "Portable"
linkTitle: "Portable Unprivlaged NeuroDesktop"
weight: 1
aliases:
- /docs/getting-started/neurodesktop/portable/
description: >
  An experimental unprivlaged option for running NeuroDesktop without Docker or Podman.
---

### Minimum System Requirements

1. At least 5GB free space for neurodesktop base image
2. At least 8GB of RAM

## Downloading TinyRange

TinyRange (https://github.com/tinyrange/tinyrange) is a lightweight runtime 

- **Windows:** https://github.com/tinyrange/tinyrange/releases/download/v0.1.1/tinyrange-windows-amd64.zip
<!-- - **MacOS:** https://github.com/tinyrange/tinyrange/releases/download/v0.1.1/tinyrange-darwin-arm64.zip -->
- **Linux (x86_64):** https://github.com/tinyrange/tinyrange/releases/download/v0.1.1/tinyrange-linux-amd64.zip
<!-- - **Linux (arm64):** https://github.com/tinyrange/tinyrange/releases/download/v0.1.1/tinyrange-linux-arm64.zip -->

{{< alert color="info" >}}
**Windows on ARM:** TinyRange is not currently supported on Windows for ARM (Copilot+ Laptops with ARM64/Snapdragon CPUs)
{{< /alert >}}

## Downloading QEMU

- **Windows:** TinyRange already includes QEMU so you can skip this step.
- **Ubuntu:** `sudo apt install qemu-kvm`
<!-- - **MacOS:** `brew install qemu` -->

## Installing TinyRange

- Just unzip the archive to some local path on your computer. It's recomended not to extract it to a network drive.
- Open a terminal in the extracted archive and run `./tinyrange login`.
- Once you see the `tinyrange:~#` type `exit`.

## Running NeuroDesktop

- Just open a terminal in the TinyRange folder and run `./tinyrange login -c https://github.com/NeuroDesk/neurodesktop/raw/refs/heads/main/neurodesk.yml`
- The container will start up like normal.
- Use Control+C to exit.

### Folder Sharing

Use `--mount ~/neurodesktop-storage` to share `neurodesktop-storage`.

{{< alert color="info" >}}
The folder share is currently **Read-Only**.
{{< /alert >}}

### Changing CPU Cores, RAM, and/or Storage

- **CPU Cores:** Add `--cpu 8` to set the VM to 8 CPU cores.
- **RAM:** Add `--ram 8192` to set 8GB of RAM for the Virtual Machine.
- **Storage:** Add `--storage 16384` to allocate 16GB of disk for the Virtual MAchine.

### Enabling Hardware Acceleration

- **Windows:** This requires admin privilages. Search in your start menu for "Turn Windows features on or off.". Find "Hyper-V Hypervisor" or "Windows Hypervisor Platform" and make sure it's enabled. Then restart your computer.
- **Ubuntu/Other Linux:** It should already work out of the box. If not make sure your user account has permission to read/write `/dev/kvm`.
<!-- - **MacOS:** No extra steps required. It already works. -->
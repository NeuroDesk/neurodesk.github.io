---
title: "Portable Unprivileged NeuroDesktop"
linkTitle: "Portable"
weight: 1
aliases:
- /docs/getting-started/neurodesktop/portable/
description: >
  An experimental unprivileged option for running NeuroDesktop without Docker or Podman.
---

### Minimum System Requirements

1. At least 5GB free space for neurodesktop base image
2. At least 8GB of RAM

## Downloading TinyRange

TinyRange (https://github.com/tinyrange/tinyrange) is a lightweight runtime for running Virtual Machines and Containers. It runs without admin privileges and doesn't need Docker or Podman installed to work.

- **Windows:** https://github.com/tinyrange/tinyrange/releases/download/v0.1.4/tinyrange-windows-amd64.zip
- **MacOS:** https://github.com/tinyrange/tinyrange/releases/download/v0.1.4/tinyrange-darwin-arm64.zip
- **Linux (x86_64):** https://github.com/tinyrange/tinyrange/releases/download/v0.1.4/tinyrange-linux-amd64.zip
- **Linux (arm64):** https://github.com/tinyrange/tinyrange/releases/download/v0.1.4/tinyrange-linux-arm64.zip

{{< alert color="info" >}}
**Windows on ARM:** TinyRange is not currently supported on Windows for ARM (Copilot+ Laptops with ARM64/Snapdragon CPUs)
{{< /alert >}}

## Downloading QEMU

- **Windows:** TinyRange already includes QEMU so you can skip this step.
- **Ubuntu:** `sudo apt install qemu-kvm`
- **MacOS:** `brew install qemu`

## Installing TinyRange

- Unzip the archive to some local path on your computer. It's recommended not to extract it to a network drive.
- Open a terminal in the extracted archive and run `./tinyrange login` or `tinyrange login` on Windows.
- Once you see the `tinyrange:~#` type `exit`.

## Running NeuroDesktop

- Open a terminal in the TinyRange folder and run `./tinyrange login -c https://github.com/NeuroDesk/neurodesktop/raw/refs/heads/main/neurodesk.yml` or `tinyrange login -c https://github.com/NeuroDesk/neurodesktop/raw/refs/heads/main/neurodesk.yml` on Windows
- Neurodesktop will start up. Copy and paste the Jupyterhub link (starting with 127.0.0.1) at the end of the output to a browser.
- Use Control+C in the terminal to exit.

### Folder Sharing

Use `--mount ~/neurodesktop-storage` to share `neurodesktop-storage` (in Linux and MacOS)
Use `--mount C:/neurodesktop-storage` to share `C:/neurodesktop-storage` (in Linux and MacOS) 

The mounted directories will be visible under /shared inside Neurodesk. 

For example:
```
./tinyrange login -c https://github.com/NeuroDesk/neurodesktop/raw/refs/heads/main/neurodesk.yml --mount C:/neurodesktop-storage
```

{{< alert color="info" >}}
The folder share is currently **Read-Only**. This will be fixed in the next update. To exchange files use the Jupyter Filebrowser upload and download functionality for now.
{{< /alert >}}

### Changing CPU Cores, RAM, and/or Storage

- **CPU Cores:** Add `--cpu 8` to set the VM to 8 CPU cores.
- **RAM:** Add `--ram 8192` to set 8GB of RAM for the Virtual Machine.
- **Storage:** Add `--storage 16384` to allocate 16GB of disk for the Virtual MAchine.

### Enabling Hardware Acceleration

- **Windows:** This requires admin privileges. Search in your start menu for "Turn Windows features on or off.". Find "Hyper-V Hypervisor" or "Windows Hypervisor Platform" and make sure it's enabled. Then restart your computer.
- **Ubuntu/Other Linux:** It should already work out of the box. If not make sure your user account has permission to read/write `/dev/kvm`.
- **MacOS:** No extra steps required. It already works.

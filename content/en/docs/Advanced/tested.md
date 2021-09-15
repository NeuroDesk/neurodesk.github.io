---
title: "System Testing"
linkTitle: "System Testing"
weight: 4
description: >
  Tested and working Neurodesk setups
---

## Please test and add if working :)

|                                    | hypervisor   | container engine | build | client                  | who     |
|------------------------------------|--------------|------------------|-------|-------------------------|---------|
| windows 10 Enterprise, build 18363 | wsl2, hyperv | docker           | yes   | vnc, edge               | Steffen |
| windows 10 Pro                     | wsl2, hyperv | docker           | yes   |                         | Tom     |
| windows 10 Home, build 19041       | wsl2, hyperv | docker           | yes   | chrome                  | Geeta   |
| windows 10 Home, Docker toolbox    | virtualbox   | docker           | yes   | chrome                  | Geeta   |
| Debian Bullseye                    |              | docker           | yes   | firefox                 | Jakub   |
| Ubuntu 20.04                       |              | docker           | yes   | firefox                 | Martin  |
| macOS Catalina (10.15.5)           |              | docker           | yes   | firefox, safari, chrome | Jakub   |
| HPC Centos 6                       |              | singularity      | no    |                         | Steffen |
| Ubuntu 18.04 on OpenStack (NECTAR) |              | docker           | yes   | firefox                 | Oren    |


## Run Neurodesk VNM for free on cloud providers
* [Oracle OCI](https://mri.sbollmann.net/index.php/2020/12/08/run-neurodesk-on-oracle-cloud-free-tier)
* [Microsoft Azure](https://henryjburg.medium.com/neurodesk-running-on-azure-3e38c590a152)

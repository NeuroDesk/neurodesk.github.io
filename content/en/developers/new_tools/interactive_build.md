---
title: "Interactive Build"
linkTitle: "Interactive Build"
weight: 2
aliases:
- /developers/new_tools/contribute
description: >-
     How to contribute a new container.
---

## 1) Open an issue to get access to the interactive container build system
https://github.com/NeuroDesk/neurocontainers/issues/new

- describe which container you would like to add
- wait for a reply on your issue that your account has been setup

## 2) Access the container build system
https://labtokyo.neurodesk.org/

- authenticate with your github account
- select a CPU session or a GPU session (if your container requires a GPU)
- open a Neurodesktop session

## 3) Run the interactive build process

- open a Terminal session
- run:
```bash
cd ~
git clone https://github.com/NeuroDesk/neurocontainers.git
cd neurocontainers/interactive_builder/
git pull
./run_interactive_builder.sh
```

- Follow the instructions of the interactive build tool. After a couple of seconds where the base image gets updated you should see a "root@neurodesk-builder:~$>" shell. Now run the commands to get your tool to work. 
- Once the tool works, hit CTRL-D or type "exit"
- Then answer more questions in the build tool

{{< alert color="info">}}
## Note:
The builder container mounts the /home/jovyan/Desktop directory of the host system /root/Desktop. 
This allows you to interact with files from the host system in the builder container and vice versa. 
{{< /alert >}}

## 4) Submit the generated build.sh and Readme.md file as attachments to your issue
- once completed, download the build.sh and README.md file and submit them as attachments to your github issue

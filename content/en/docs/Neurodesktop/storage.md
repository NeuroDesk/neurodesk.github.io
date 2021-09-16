---
title: "Storage"
linkTitle: "Storage"
weight: 4
description: >
  Add storage to Neurodesktop
---

## Cloud-storage
The easiest way to get your data into Neurodesktop is to use a cloud storage provider like CloudStor, Dropbox, OneDrive and their sync tools like OwnCloud, Nextcloud or very flexible tools like rclone. Another good option could be to utilize Globus for large amounts of data. 

## Mounting network storage on your host-computer
The -v C:/neurodesk:/neurodesk part of the docker command links the directory “neurodesk” on the “C drive” of your Windows computer to the directory /neurodesk inside the Desktop environment. Everything you store in there will be available inside neurodesk and on the host computer. You can also mount additional directories by adding another -v parameter set (e.g. -v D:/moredata:/data) - this will mount the directory moredata from your D drive to /data inside neurodesktop. If you have network storage mounted in a similar way you can also pass this into the Neurodesktop tool.

## Mount volume using SSHFS
It is theoretically possible to mount an SSH target inside Neurodesktop, but it's not a very reliable way of mounting storage:
`sshfs -o allow_root USER@TARGET_HOST:TARGET_PATH SOURCE_PATH`



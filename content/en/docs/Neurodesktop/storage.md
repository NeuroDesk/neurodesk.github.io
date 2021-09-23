---
title: "Storage"
linkTitle: "Storage"
weight: 4
description: >
  Add storage to Neurodesktop
---

# Cloud-storage
The easiest way to get your data into Neurodesktop is to use a cloud storage provider like CloudStor, Dropbox, OneDrive and their sync tools like OwnCloud, Nextcloud or very flexible tools like rclone or davfs2. Another good option could be to utilize Globus for large amounts of data. 

## Nextcloud and Owncloud desktop clients
Under the menu item "Accessories" you can find "Nextcloud" and "ownCloud" desktop sync clients that you can configure with your cloud service accounts.

To connect for example to your AARNET cloudstor account you can start the ownCloud client and enter the Server Address: `https://cloudstor.aarnet.edu.au/plus/` 

Then generate an app-password here: https://cloudstor.aarnet.edu.au/plus/settings/personal?sectionid=security


## Mounting webdav storage using davfs2
Another option is to directly mount webdav storage. Here is an example how to mount CloudStor into Neurodesktop:

```shell
sudo mount -t davfs https://cloudstor.aarnet.edu.au/plus/remote.php/webdav/ /data/
```
It then asks you for a username and password, which you can generate here: https://cloudstor.aarnet.edu.au/plus/settings/personal?sectionid=security

## Rclone
Rclone is a command line tool that enables the interaction with various cloud services. Here is an example how to setup rclone with CloudStor Aarnet:

- start the configuration in a terminal window `rclone config`
- Create a new remote: `n`
- Provide a name for the remote: `CloudStor`
- For the “Storage” option choose: `webdav`
- As “url” set: `https://cloudstor.aarnet.edu.au/plus/remote.php/webdav/`
- As “vendor” set OwnCloud: `2`
- Set your CloudStor username after generating an access token https://cloudstor.aarnet.edu.au/plus/settings/personal?sectionid=security
- Choose to type in your own password: y
- Enter the Password / Token from the CloudStor App passwords page and confirm it again:
- Leave blank the bearer_token: `<hit Enter>`
- No advanced config necessary: `<hit Enter>`
- accept the configuration: `<hit Enter>`
- Quit the config: `q`
- Now we can download data to the HPC easily: `rclone copy --progress --transfers 8 CloudStor:/raw-data-for-science-paper .`
- or upload data to CloudStor: `rclone copy --progress --transfers 8 . CloudStor:/data-processed`

## Globus
We also provide the globus client, so you can transfer large amounts of data between globus endpoints and Neurodesktop. You can configure it by running:
```shell
/opt/globusconnectpersonal/globusconnectpersonal-*/globusconnectpersonal
```

Once authenticated you can go to the globus file-manager https://app.globus.org/file-manager and your neurodesktop instance will be an endpoint for globus.

# Mounting network storage on your host-computer
The -v C:/neurodesktop-storage:/neurodesktop-storage part of the docker command links the directory "neurodesktop-storage" on the “C drive” of your Windows computer to the directory /neurodesktop-storage inside the Desktop environment. Everything you store in there will be available inside the desktop and on the host computer. You can also mount additional directories by adding another -v parameter set (e.g. -v D:/moredata:/data) - this will mount the directory moredata from your D drive to /data inside neurodesktop. If you have network storage mounted in a similar way you can also pass this into the Neurodesktop tool.

# Mount volume using SSHFS
It is theoretically possible to mount an SSH target inside Neurodesktop, but it's not a very reliable way of mounting storage:
```shell
sshfs -o allow_root USER@TARGET_HOST:TARGET_PATH SOURCE_PATH
```

A better option is to use `scp` and copy data from an SSH endpoint:
```shell
scp /neurodesk/myfile user@remoteserver:/data/
```



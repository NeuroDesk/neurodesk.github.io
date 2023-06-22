---
title: "Data Storage"
linkTitle: "Data Storage"
weight: 6
aliases: 
- /docs/neurodesktop/storage/
- /docs/getting-started/storage
description: >
  Add storage to Neurodesktop
---

## Drag and Drop

### Uploading files
You can drag-and-drop files into the browser window to get files into Neurodesktop. This will then start a file upload:

![{538BB51E-0FEB-46EA-B1B8-FDF122776735}](https://user-images.githubusercontent.com/4021595/160577507-b5159bae-13c0-4fbf-85da-0ce55fd481f3.png)

### Downloading files
To download files from the desktop using the same mechanism you will need to open the guacamole settings by pressing CTRL-ALT-SHIFT (Control-Command-Shift on Mac). This will open a menu on the side:

![{A12EDB8A-3D01-4524-A7B5-24E5E94FB418}](https://user-images.githubusercontent.com/4021595/160577828-0f8ba04e-aed7-4c26-a8d2-baf6c4be317a.png)


where you can click on "Shared Drive":

![{645953A1-5D11-48C7-9DFB-25D4339EEA34}](https://user-images.githubusercontent.com/4021595/160577926-06e48896-9301-426a-b7d5-9d3b2df14504.png)

a click (or double click on Mac) on the file will start the download.

You can browse into folders in the shared drive by clicking (double clicking on Mac) on them. To get back to the base of the shared drive, press on the drive icon in the top left of the side menu (just below the "Shared Drive" title).

To close the side menu, click on CTRL-ALT-SHIFT once more (Control-Command-Shift on Mac).

Note that it is only possible to download one file at a time through this interface. If you have multiple files in a directory we recommend opening a terminal and zipping the files and then downloading one zip archive:

```bash
zip files.zip files/
```

## Local storage
If you are running Neurodesktop on your own hardware there will be a direct connection between the "Storage" folder on the Destkop, which is a link between "/neurodesktop-storage" in neurodesktop and the "neurodesktop-storage" folder on your C-drive (Windows) or home directory (Mac/Linux). This connection can be used for data processing and data transfer.

### Mounting external storage on your host-computer
The -v C:/neurodesktop-storage:/neurodesktop-storage part of the docker command links the directory "neurodesktop-storage" on the “C drive” of your Windows computer to the directory /neurodesktop-storage inside the Desktop environment. Everything you store in there will be available inside the desktop and on the host computer. You can also mount additional directories by adding another -v parameter set (e.g. -v D:/moredata:/data) - this will mount the directory moredata from your D drive to /data inside neurodesktop. Important: the mountpoint inside neurodesktop should be named /data (or anything from this list: https://github.com/NeuroDesk/neurocontainers/blob/master/recipes/globalMountPointList.txt) - otherwise most of the tools will not be able to access the data.

Here is an example for Windows adding another storage directory:
```cmd
docker run --shm-size=1gb -it --privileged --user=root --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -v D:/moredata:/data -p 8888:8888 -e NEURODESKTOP_VERSION={{< params/neurodesktop/jupyter_neurodesk_version >}} vnmd/neurodesktop:{{< params/neurodesktop/jupyter_neurodesk_version >}}
```

## Cloud storage
Another way to get your data into Neurodesktop is to use a cloud storage provider like CloudStor, Dropbox, OneDrive and their sync tools like OwnCloud, Nextcloud or very flexible tools like rclone or davfs2. Another good option could be to utilize Globus for large amounts of data. 

### Nextcloud and Owncloud desktop clients
Under the menu item "Accessories" you can find "Nextcloud" and "ownCloud" desktop sync clients that you can configure with your cloud service accounts.

To connect for example to your AARNET cloudstor account you can start the ownCloud client and enter the Server Address: 
```none
https://cloudstor.aarnet.edu.au/plus/
``` 

Then generate an app-password here: https://cloudstor.aarnet.edu.au/plus/settings/personal?sectionid=security


### Mounting webdav storage using davfs2
Another option is to directly mount webdav storage. Here is an example how to mount CloudStor into Neurodesktop:

```bash
sudo mount -t davfs https://cloudstor.aarnet.edu.au/plus/remote.php/webdav/ /data/
```
It then asks you for a username and password, which you can generate here: https://cloudstor.aarnet.edu.au/plus/settings/personal?sectionid=security

### Rclone
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

### Globus
We also provide the globus client, so you can transfer large amounts of data between globus endpoints and Neurodesktop. You can configure it by running the following commands in the Neurodesktop environment:
```bash
ml globus
# First run the setup:
globusconnectpersonal -setup

#Follow the instructions in the terminal: 
#1) copy the URL into a browser and generate the Native App Authorization Code
#2) then copy this code and paste it in the terminal
#3) then name the endpoint, e.g. Neurodesktop

# Then start the GUI:
globusconnectpersonal -gui

# If the connection fails, reset the permissions on the key file:
chmod 600 /home/jovyan/.globusonline/lta/relay-anonymous-key.pem
```

Then add the directories you want to share with globus, by opening File -> Preferences:

<img width="256" alt="image" src="https://github.com/NeuroDesk/neurodesk.github.io/assets/4021595/c6c7b912-a113-43df-b6d9-233fb92c4ea0">

and then add the paths required and hit Save:

<img width="448" alt="image" src="https://github.com/NeuroDesk/neurodesk.github.io/assets/4021595/daa8c036-4548-4da2-98f1-8ac39b7e8317">

Then you can go to the globus file-manager https://app.globus.org/file-manager and your neurodesktop instance will be an endpoint for globus. You can change the path to any location you specified in the Preferences:

<img width="2847" alt="image" src="https://github.com/NeuroDesk/neurodesk.github.io/assets/4021595/35dcfc7a-2975-4fcc-8c49-dbe9c43b6433">




### Mount volume using SSHFS
It is theoretically possible to mount an SSH target inside Neurodesktop, but it's not a very reliable way of mounting storage:
```bash
sshfs -o allow_root USER@TARGET_HOST:TARGET_PATH SOURCE_PATH
```

A better option is to use `scp` and copy data from an SSH endpoint:
```bash
scp /neurodesk/myfile user@remoteserver:/data/
```

An alternative is to mount the SSHFS target into a parent directory on your local machine or VM and then use the -v option in the docker run command to bind the parent directory of the SSHFS mount. NOTE: the SSHFS *has* to be mounted to a subdirectory inside a parent directory which is then bound to the docker container. If you directly bind to the mounted directory itself, your Neurodesktop container will stop being able to access it if the SSHFS mount disconnects and will not be able to access it again without restarting the Neurodesktop container.

For example, on a local Linux machine or VM:
```bash
sshfs -o allow_root USER@TARGET_HOST:TARGET_PATH/MyData SOURCE_PATH/SSHFS_Mounts/MyData
```

Then add the following line to the docker run command when starting Neurodesktop (note the rshared flag):
```bash
-v /SSHFS_Mounts:/data:rshared \
```

TIP: If you use key pair authentication instead of password for your SSHFS mount, you can use the reconnect flag to reconnect automatically if the connection drops:
```bash
sshfs -o IdentityFile=~/.ssh/id_rsa,allow_root,ServerAliveInterval=5,ServerAliveCountMax=3 USER@TARGET_HOST:TARGET_PATH/MyData SOURCE_PATH/SSHFS_Mounts/MyData
```



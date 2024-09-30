---
title: "Manual Build"
linkTitle: "Manual Build"
weight: 3
description: >-
     How to contribute a new container.
---

## Adding new recipes
Refer to [neurodocker](https://github.com/NeuroDesk/neurodocker) for more information on neurodocker recipes.  

## Build container

### Environment Requirements
- Linux environment where you have admin privileges (i.e., can run 'sudo')
- Docker
- Python `>=3.8`. If you have lower Python version, create a virtual environment `conda create -n neurodocker python=3.8 -y` and activate it `conda activate neurodocker`. 
- If you have several versions of Python3 installed in the environment, typing 'python' in the terminal should launch a version with equal or higher version number  
- Python pip3  
  This should be launched by 'python -m pip'
- git


### Fork the Neurocontainers repository  
-  Fork neurocontainers and setup github actions.  


### Create a new app
1. Copy the directory template and rename to your application name in `neurocontainers/recipes` (this name will be displayed in Neurodesk's menu; notice it shouldn't have any special characters and needs to be small caps):
   ```bash
   cd neurocontainers/recipes
   cp -R template myapp
   ```

2. Create your Container Files:  
   Modify `build.sh` in `neurocontainers/recipes/myapp` to build your application and update `README.md` (make sure the version is correct in the README!).
   ```bash
   cd myapp
   (edit build.sh as required)
   (edit README.md as required)
   ```
   If your application needs external files, please upload them to an online storage accessible via a URL and then download them again in the recipe. You can also send us your files and we will store them for you.

3. Build and test the container locally 
   1. run the build script with the debug flag:
      ```bash
      cd recipes/myapp
      chmod +x build.sh
      ./build.sh -ds
      ```
      NOTICE: the README.md file will automatically be updated to reflect the version of the tool given in the build.sh script. For this to work, leave "toolVersion" in the README and do not remove this or alter.
      
   2. test running some commands within the container that should be available in your local docker container repository.
      
      For example, to open an interactive shell in a container (with the home folder /root bound to /root on host), you may run:
      ```bash
      sudo docker run -it -v /root:/root --entrypoint /bin/bash myapp_VERSION:TAG
      ```
      with VERSION being the version of the app, and TAG the version tag of the container (run 'sudo docker image list' to find the tag)

4. Update changes in local git repository
   ```bash
   git add .github/workflows/myapp.yml recipes/myapp/test.sh recipes/myapp/build.sh recipes/myapp/README.md
   git config user.email "the email that you use for github"
   git config user.name "your name"
   git commit
   ```

## Push the new or updated app to Neurocontainers

### Prerequisite

Generate git personal access token (if you don’t have one already)

1. Browse to https://github.com/
2. Log into your account
3. Press on your picture in upper right corner &rarr; Setting &rarr; Developer Settings &rarr; Personal Access Token
4. Press on “generate personal access token”
5. Write something in “Notes” (doesn’t matter what, it’s for your own use)
6. Check “repo”
7. Check “Workflow”
8. Press “Generate Token” at the bottom
9. Copy the token displayed to somewhere safe, as you will have to user it later

Verify that user has write permission to /neurocommand/local

1. If not, run
``sudo chmod a+w /neurocommand/local
``

### Step by step guide

1. Test the container locally, and if successful push repo to trigger the automatic build on GitHub. When asked for your Github password, please provide the personal access token obtained in the previous stage.
   ```bash
   git pull
   git push
   ```

2. Go to https://github.com/neurodesk/neurocontainers/actions. Check that the most recent workflow run in the list terminated successfully (green). Otherwise, click on it, click on “build docker”, and the line that caused the error will be highlighted

3. Find your new package under https://github.com/orgs/NeuroDesk/packages?repo_name=neurocontainers    
    Enter the name of the package in the search box, and verify that the full package name shows up in the format _toolName_toolVersion_

4. Obtain _buildDate_ by clicking on the full package name that came up in the search. The build date will be the newest date shown under **Recent tagged image versions**

5. If updating an app, use _toolName_ delete the locally installed container of the old app version or old app build:
    ```bash
    rm -R /neurocommand/local/containers/toolName_*/
    rm -R /neurocommand/local/containers/modules/toolName/
    ```

6. Use _toolName_, _toolVersion_ and _buildDate_ from the previous two steps to manually download the package by typing the following in a terminal open in Neurodesktop  
   ```bash
   bash /neurocommand/local/fetch_and_run.sh toolName toolVersion buildDate
   (when you see the "Singularity>" prompt, type exit and ENTER)
   ml toolName/toolVersion
   ```

   For example: 
   If the full package name that comes up in the step 11 is itksnap_3.8.0, and the newest date under **Recent tagged image versions** is 20210322

   The command to use in a terminal open in Neurodesktop is:
   ```bash
   bash /neurocommand/local/fetch_and_run.sh itksnap 3.8.0 20210322
   (when you see the "Singularity>" prompt, type exit and ENTER)
    ml toolName/toolVersion
   ```
   {{% alert title="Important note" color="warning" %}}
   This step consumes a lot of disk storage (up to tens of Gigs). Please be aware that if your storage is limited, the fetch_and_run.sh command may fail.
   {{% /alert %}}


7. Test the new container. Run some commands, to see all is good  
   If the container doesn't work yet, it's sometimes useful to try and troubleshoot it and install missing libraries. This can be achieved by running it in a writable mode with fakeroot enabled:

   ```bash
   SINGULARITY_BINDPATH=''; singularity shell --writable --fakeroot /neurodesktop-storage/containers/toolName_toolVersion_buildDate/toolName_toolVersion_buildDate.simg
   ```  

8. Fork https://github.com/NeuroDesk/neurocommand/ to your Github account 

9. Edit an entry for your package in your fork of `neurocommand/blob/main/neurodesk/apps.json` based on one of the other entries (generating one menu item for opening a terminal inside the containers, and one menu item for the GUI, if relevant). Notice that in the json file, the version field should contain the _buildDate_ rather than the _toolVersion_ !!! _toolVersion_ should be included instead in the text of the menu entry itself, e.g., "fsl 6.0.3". Also notice that whereas categories appear in the Neurodesktop menu in start case (first letter of each word capitalized), in the json files they are sentence case (all letters lower case).

10. Include an icon file in your fork of neurocommand/neurodesk/icons

11. Send a pull request from your fork of neurocommand to https://github.com/NeuroDesk/neurocommand/ 

12. When the pull request is merged by Neurodesk admins, it will trigger an action to build the singularity container, distribute it in all object storage locations and on CVMFS, and it will update the menus in the desktop image on the next daily build. 

13. Wait at least 24 hours

14. Download and run the daily build of Neurodesktop to check that your app can be launched from the start menu and works properly:
    ```bash
    sudo docker pull vnmd/neurodesktop:latest && sudo docker run --shm-size=1gb -it --privileged --user=root --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -e HOST_UID="$(id -u)"  -e HOST_GID="$(id -g)" -p 8888:8888 -e NEURODESKTOP_VERSION=latest vnmd/neurodesktop:latest
    ```

15. Open an issue in https://github.com/NeuroDesk/neurocontainers/issues notifying that your app appears in the start menu and tested. The app will be included in the next release of Neurodesktop, and will be mentioned in the public announcement that accompanies the release. If the app is not in the start menu or not working as expected based on your earlier testing, open an issue as well, and report it.

16. If somebody wants to use the application before the next release of Neurodesktop is out, you can instruct them to use the command in step 14 above instead of the default commands given in the user install instructions.

17. Consider contributing a tutorial about the new tool in [this instruction](/tutorials-examples/tutorials/tutorial-template/tutorial-template)


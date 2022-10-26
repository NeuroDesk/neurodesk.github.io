---
title: "Add tools"
linkTitle: "Add tools"
weight: 3
description: >
  Add a tool to neurodesktop
---

The goal of *neurodesk* is to provide users with a large choice of tools to use in their pipelines.
Use the guide below to add a tool to *neurodesktop* or *neurocontainers*. 

## Guiding principles 
To decide if a tool should be packaged in a singularity container in *neurocontainers* or be installed in the *neurodesktop* container we are currently following these guiding principles:
1) *neurodesk* is not a package manager. This means we are not distributing tools in containers that can easily be installed via a standard package manager 
2) *neurodesk* allows users to have multiple versions of tools in parallel via [lmod]( https://lmod.readthedocs.io/en/latest/), this means that if different versions of a tool can't be installed in parallel we package the tool inside a container.
3) *neurodesk* aims to provide tooling to link tools from different containers (such as workflow managers like nipype or nextflow). This means that if a tool is required to coordinate various container-tools, it should be in the *neurodesktop* container.


Examples:
|            | easy install | coordinates containers | small in size | latest version is ok | useful to most users   | Conclusion                     |
|------------|--------------|------------------------|---------------|----------------------|------------------------|--------------------------------|
| git        | yes          | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| lmod       | no           | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| nipype     | yes          | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| vscode     | yes          | yes                    | yes           | yes                  | yes                    | neurodesktop                   |
| itksnap    | yes          | no                     | yes           | yes                  | yes                    | container?                     |
| convert3D  | yes          | no                     | yes           | no                   | no                     | container                      |
| fsl        | no           | no                     | no            | no                   | no                     | container                      |
| mrtrix     | no           | no                     | no            | no                   | no                     | container                      |
| freesurfer | no           | no                     | no            | no                   | no                     | container                      |


## Adding new recipes
Refer to [neurodocker](https://github.com/NeuroDesk/neurodocker) for more information on neurodocker recipes  



## Build container
### Environment Requirements
- Docker
- Recent Python Version  
  Search for "python_requires" in https://github.com/NeuroDesk/neurodocker/blob/master/setup.cfg for minimal version of Python required. If you have several versions of Python installed in the environment, typing 'python' in the terminal should launch a version with equal or higher version number  
- Python pip3  
  This should be launched by 'python -m pip'
- git

### Install Neurodocker
Neurodocker is the dependency we use to build containers.
1. (optional) Sync upstream repository:  
  If you have the permissions to do so: Press "Fetch upstream" in https://github.com/NeuroDesk/neurodocker to check if our fork of Neurodocker is already up-to-date. Otherwise, open an issue in https://github.com/NeuroDesk/neurocontainers/issues, requesting to pull-in latest changes from Neurodocker upstream into our fork of Neurodocker. One of the admins will attend the issue and perform the operation.  
2. (optional) Add a new neurodocker tool:  
  If relevant to your project, add an option to neurodocker that installs new software (https://github.com/NeuroDesk/neurodocker) and create a pull request to neurodocker's main respository (add new tool in a branch!).  
3. Clone our fork of Neurodocker:  
   <pre class="language-shell command-line" data-prompt="$"><code>git clone https://github.com/NeuroDesk/neurodocker/</code></pre>  
4. Install neurodocker:  
   <pre class="language-shell command-line" data-prompt="$"><code>cd neurodocker  
   python -m pip install .
   cd ..</code></pre>
5. Append line to .bashrc for adding the path:
   <pre class="language-shell command-line" data-prompt="$">
   <code>echo 'export PATH=${PATH}:${HOME}/.local/bin' >> ${HOME}/.bashrc</code>
   </pre>
6. Close the terminal, and reopen it for the updated PATH to take effect
   

### Clone the Neurocontainers repository  
- *Option A*) Fork neurocontainers and setup github actions:  
   Follow the steps in [Get Neurodesk code]({{<ref "cloning">}}).  

- *Option B*) Clone from NeuroDesk:
   <pre class="language-shell command-line" data-prompt="$"><code>git clone https://github.com/NeuroDesk/neurocontainers/</code></pre>

### Create a new app
1. Copy the directory template and rename to NEWAPP in `neurocontainers/recipes` (NEWAPP being the name of the application to be displayed in Neurodesk's menu; notice it shouldn't have any special characters):
   <pre class="language-shell command-line" data-prompt="$"><code>cd neurocontainers/recipes
   cp -R template NEWAPP</code></pre>

2. Create your Container Files:  
   Modify `build.sh` in `neurocontainers/recipes/NEWAPP` to build your application and update `README.md` (make sure the version is correct in the README!). Notice that the example build script in the template has instructions to build a conatiner for datalad, that may or may not suite your exact needs
   <pre class="language-shell command-line" data-prompt="$" data-output="2-3"><code>cd NEWAPP
   (edit build.sh as required)
   (edit README.md as required)</code></pre>
   Upload your application to object storage first if needed, so you can then download it in `build.sh` (ask for instructions about this if you don't know the key, and never share it anywhere public!)

3. Run `update-builders.sh`:
   This will auto-create the CI workflow for the application (or manually duplicate the template file and rename all occurances of template to NEWAPP)
   <pre class="language-shell command-line" data-prompt="$"><code>cd ../..
   sh update-builders.sh</code></pre>

   {{% alert %}}
   If the CI build runs out of space, add the application to the following txt file to add additional space:
   https://github.com/NeuroDesk/neurocontainers/blob/master/.github/workflows/free-up-space-list.txt.
   Note: this increases CI run time, only use in cases of out-of-space errors.
   {{% /alert %}}

4. Build and test the container locally 
   1. run the build script with the debug flag:
      <pre class="language-shell command-line" data-prompt="$"><code>cd recipes/NEWAPP
      chmod +x build.sh
      ./build.sh -ds</code></pre>
      NOTICE: if the README.md file does not contain the same tool-version string as in the build.sh the build will not start to prevent an incorrect README.md description.
   2. test running some commands within the container that should be available in your local docker container repository.
      
      For example, to open an interactive shell in a container (with the home folder /root binded to /root on host), you may run:
      <pre class="language-shell command-line" data-prompt="$"><code>sudo docker run -it -v /root:/root --entrypoint /bin/bash NEWAPP_VERSION:TAG
      </code></pre>
      with VERSION being the version of the app, and TAG the version tag of the container (run 'sudo docker image list' to find the tag)
   3. if your application requires a Matlab Runtime and you get an error about shared library "libmwlaunchermain.so" not found, check which version of the runtime was installed by the build script

5. Update changes in local git repository
   <pre class="language-shell command-line" data-prompt="$"><code>git add .github/workflows/NEWAPP.yml recipes/NEWAPP/test.sh recipes/NEWAPP/build.sh recipes/NEWAPP/README.md
   git config user.email "the email that you use for github"
   git config user.name "your name"
   git commit</code></pre>

### Push the new app to Neurocontainers

**Prerequisite**

Generate git personal access token (if you don’t have one already)

   1. Browse to https://github.com/
   2. Log into your account
   3. Press on your picture in upper right corner --> Setting --> Developer Settings --> Personal Access Token
   4. Press on “generate personal access token”
   5. Write something in “Notes” (doesn’t matter what, it’s for your own use)
   6. Check “repo”
   7. Check “Workflow”
   8. Press “Generate Token” at the bottom
   9. Copy the token displayed to somewhere safe, as you will have to user it later

**Step by step guide**

1. Test the container locally, and if successful push repo to trigger the automatic build on GitHub. When asked for your Github password, please provide the personal access token obtained in the previous stage.
   <pre class="language-shell command-line" data-prompt="$"><code>git pull
   git push</code></pre>

2. Go to https://github.com/neurodesk/neurocontainers/actions. Check that the most recent workflow run in the list terminated successfully (green). Otherwise, click on it, click on “build docker”, and the line that caused the error will be highlighted

3. Find your new package under https://github.com/orgs/NeuroDesk/packages?repo_name=neurocontainers    
    Enter the name of the package in the search box, and verify that the full package name shows up in the format _toolName_toolVersion_

4. Obtain _buildDate_ by clicking on the full package name that came up in the search. The build date will be the newest date shown under **Recent tagged image versions**

5. Use _toolName_, _toolVersion_ and _buildDate_ from the previous two steps to manually download the package by typing the following in a terminal open in Neurodesktop  
    <pre class="language-shell command-line" data-prompt="$"><code>bash /neurocommand/local/fetch_and_run.sh toolName toolVersion buildDate
      (when you see the "Singularity>" prompt, type exit and ENTER)
    ml toolName/toolVersion</code></pre>

    For example: 
    If the full package name that comes up in the step 11 is itksnap_3.8.0, and the newest date under **Recent tagged image versions** is 20210322
  
    The command to use in a terminal open in Neurodesktop is:
    <pre class="language-shell command-line" data-prompt="$"><code>bash /neurocommand/local/fetch_and_run.sh itksnap 3.8.0 20210322
     (when you see the "Singularity>" prompt, type exit and ENTER)
    ml toolName/toolVersion</code></pre>

  {{% alert title="Depreciation notice" color="warning" %}}
  For VNM users use:
  <pre class="language-shell command-line" data-prompt="$"><code>bash /neurodesk/local/fetch_and_run.sh toolName toolVersion buildDate
  ml toolName/toolVersion</code></pre>
  {{% /alert %}}

6. Test the new container. Run some commands, to see all is good  
    If the container doesn't work yet, it's sometimes useful to try and troubleshoot it and install missing libraries. This can be achieved by running it in a writable mode with fakeroot enabled:

    <pre class="language-shell command-line" data-prompt="$"><code>SINGULARITY_BINDPATH=''; singularity shell --writable --fakeroot /neurodesktop-storage/containers/toolName_toolVersion_buildDate/toolName_toolVersion_buildDate.simg</code></pre>  

7. Fork https://github.com/NeuroDesk/neurocommand/ to your Github account 

8. Edit an entry for your package in your fork of `neurocommand/blob/main/neurodesk/apps.json` based on one of the other entries (generating one menu item for opening a terminal inside the containers, and one menu item for the GUI, if relevant). Notice that in the json file, the version field should contain the _buildDate_

9. Include an icon file in your fork of neurocommand/neurodesk/icons

10. Send a pull request from your fork of neurocommand to https://github.com/NeuroDesk/neurocommand/ 

11. When the pull request is merged by Neurodesk admins, it will trigger an action to build the singularity container, distribute it in all object storage locations and on CVMFS, and it will update the menus in the desktop image on the next daily build. 

12. Wait at least 24 hours

13. Download and run the daily build of neurodesktop to check that your app can be launched from the start menu and works properly:
    <pre class="language-shell command-line" data-prompt="$"><code>sudo docker pull vnmd/neurodesktop:latest && sudo docker run   --shm-size=1gb -it --privileged --name neurodesktop   -v ~/neurodesktop-storage:/neurodesktop-storage   -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)"   -p 8080:8080 -h neurodesktop-latest   vnmd/neurodesktop:latest</code></pre>

14. Open an issue in https://github.com/NeuroDesk/neurocontainers/issues notifying that your app appears in the start menu and tested. The app will be included in the next release of Neurodesktop, and will be mentioned in the public announcement that accompanies the release. If the app is not in the start menu or not working as expected based on your earlier testing, open an issue as well, and report it.

15. If somebody wants to use the application before the next release of Neurodesktop is out, you can instruct them to use the command in step 13 above instead of the deafult commands given in the user install instructions.

16. Consider contributing a tutorial about the new tool: https://github.com/NeuroDesk/neurodesk.github.io/tree/hugo-docsy/content/en/tutorials

---
title: "Add tools"
linkTitle: "Add tools"
weight: 1
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
To build a container:
1) Pull-in latest changes from Neurodocker upstream into our fork: https://github.com/NeuroDesk/neurodocker - add recipe to neurodocker if relevant for their project (https://github.com/NeuroDesk/neurodocker) and create a pull request to neurodocker (add new tool in a branch!)
2) Clone the neurocontainers repository: 
{{< alert >}}Optional: Fork neurocontainers and setup github actions

1. Fork https://github.com/NeuroDesk/neurocontainers into your account.
2. Go to your neurocontainers fork.
3. If Actions tab is missing, go to Settings > Actions. Select Allow all actions. Then Save.
4. In the actions tab, select "I understand my workflows, go ahead and enable them"
Pushes to the recipes in your fork will now trigger actions to build the respective docker container, and push them to your Github Packages.
{{< /alert >}}

https://github.com/NeuroDesk/neurocontainers
<pre class="language-shell command-line" data-prompt="$"><code>git clone https://github.com/NeuroDesk/neurocontainers/</code></pre>
3) Copy the directory template and rename to _newapp_ in `neurocontainers/recipes`
<pre class="language-shell command-line" data-prompt="$"><code>cd neurocontainers/recipes
cp -R template newapp</code></pre>
4) Modify `build.sh` in `neurocontainers/recipes/newapp` to build your application and update README.md (make sure the version is correct in the README!)
<pre class="language-shell command-line" data-prompt="$" data-output="2-3"><code>cd newapp
(edit build.sh as required)
(edit README.md as required)</code></pre>
5) Run update-builders.sh - This will auto-create the CI workflow for the application (or manually duplicate the template file and rename all occurances of template to _newapp_)
<pre class="language-shell command-line" data-prompt="$"><code>cd ../..
sh update-builders.sh</code></pre>

> if the CI build runs out of space, add the application to the following txt to add additional space.
https://github.com/NeuroDesk/neurocontainers/blob/master/.github/workflows/free-up-space-list.txt.
Note this, significantly increases CI run time, only use in cases of space errors.

6) Build the container locally (e.g. running the build script with the --debug flag: https://github.com/NeuroDesk/neurocontainers/blob/master/recipes/lcmodel/build.sh)
7) updated changes in local git repository
<pre class="language-shell command-line" data-prompt="$"><code>git add recipes/newapp/build.sh recipes/newapp/README.md .github/workflows/newapp.yml
git config user.email "the email that you use for github"
git config user.name "your name"
git commit</code></pre>
8) Generate git personal access token (if you don’t have one already)
```
Browse to https://github.com/NeuroDesk/neurocontainers/
Press on your picture in upper right corner --> Setting --> Developer Settings --> Personal Access Token
Press on “generate personal access token”
Write something in “Notes” (doesn’t matter what, it’s for your own use)
Check “repo”
Check “Workflow”
Press “Generate Token” at the bottom
Copy the token displayed on the screen into a file, so you’ll have it later
```
9) Test the container locally, and if successful push repo to trigger the automatic build on GitHub
<pre class="language-shell command-line" data-prompt="$"><code>git pull
git push</code></pre>
10) Go to neurocontainers/actions. Check that the most recent workflow run in the list terminated successfully (green). Otherwise, click on it, click on “build docker”, and the line that caused the error will be highlighted
11) Find your new package under https://github.com/orgs/NeuroDesk/packages?repo_name=neurocontainers
    
    Enter the name of the package in the search box, and verify that the full package name shows up in the format _toolName_toolVersion_
12) Obtain _buildDate_ by clicking on the full package name that came up in the search. The build date will be the newest date shown under **Recent tagged image versions**
13) Use _toolName_, _toolVersion_ and _buildDate_ from the previous two steps to manually download the package by typing the following in a terminal open in Neurodesktop 
  <pre class="language-shell command-line" data-prompt="$"><code>bash /neurocommand/local/fetch_and_run.sh toolName toolVersion buildDate
ml toolName/toolVersion</code></pre>

  For example: 
  If the full package name that comes up in the step 11 is itksnap_3.8.0, and the newest date under **Recent tagged image versions** is 20210322
  
  The command to use in a terminal open in Neurodesktop is:
<pre class="language-shell command-line" data-prompt="$"><code>bash /neurocommand/local/fetch_and_run.sh itksnap 3.8.0 20210322
ml toolName/toolVersion</code></pre>

{{% alert title="Depreciation notice" color="warning" %}}
For VNM users use:
<pre class="language-shell command-line" data-prompt="$"><code>bash /neurodesk/local/fetch_and_run.sh toolName toolVersion buildDate
ml toolName/toolVersion</code></pre>
{{% /alert %}}

14) Test the new container. Run some commands, to see all is good

15) Fork https://github.com/NeuroDesk/neurocommand/ to your Github account 
16) Edit an entry for your package in your fork of neurocommand/blob/main/neurodesk/apps.json based on one of the other entries (generating one menu item for opening a terminal inside the containers, and one menu item for the GUI, if relevant). Notice that in the json file, the version field should contain the _buildDate_
17) Include an icon file in your fork of neurocommand/tree/main/neurodesk/icons
18) Send a pull request from your fork of neurocommand to https://github.com/NeuroDesk/neurocommand/ 
19) When the pull request is merged by Neurodesk admins, it will trigger an action to build the singularity container, distribute it in all object storage locations and on CVMFS, and it will update the menus in the desktop image on the next daily build
20) Check in the dev build if everything is ok before releasing a new version of Neurodesktop:
<pre class="language-shell command-line" data-prompt="$"><code>sudo docker pull vnmd/neurodesktop-dev:latest && sudo docker run   --shm-size=1gb -it --privileged --name neurodesktop   -v ~/neurodesktop-storage:/neurodesktop-storage   -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)"   -p 8080:8080 -h neurodesktop-dev   vnmd/neurodesktop-dev:latest</code></pre>
21) Consider contributing a tutorial about the new tool: https://github.com/NeuroDesk/neurodesk.github.io/tree/hugo-docsy/content/en/tutorials

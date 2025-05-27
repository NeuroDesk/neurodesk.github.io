---
title: "Update tool in Neurodesk"
linkTitle: "Update tool"
weight: 3
description: >-
     Step-by-step instructions on how to update an existing NeuroDesk tool container.
---

Updating an existing container is quite easy with this new build system. Here is a step-by-step on how to procede. 

_There's a [detailled version](#detailled-version) at the below including screenshots and an example._
<br></br>

---
## Condensed version

1. Access the [Neurodesk Containers repository](https://github.com/NeuroDesk/neurocontainers)
2. Fork the repository
3. Using your preferred development environment (such as VS Code locally or GitHub Codespaces), make changes to the desired container.

<div style="margin-left: 2em;">

Each tool has its own folder inside the `recipes/` directory, and inside that folder, you will find the corresponding `build.yaml` file.

**Editing the `build.yaml`**

Open the `build.yaml` file. Make the necessary updates to:
- Software version numbers
- Dependencies
- Download links
- Build instructions (if needed)
</div>

4. Validate your changes

Make sure your changes are valid.
In the terminal, run:
```shell
./builder/build.py generate <toolname> 

#This second step can take some time
./builder/build.py generate <toolname> --recreate --build --test 
```
5. Commit and push your changes
6. Create a pull request
---

## Detailled version
## 1. Access the Neurodesk Containers

Navigate to the [Neurocontainers repository](https://github.com/NeuroDesk/neurocontainers):

<img src="/static/developers/new_tools/update_tool/neurocontainers.png" width="650">

## 2. Fork the repository

You will then need to fork the Neurodesk repository to your own repositories. This allows you to make changes independently and propose updates. 

<img src="/static/developers/new_tools/update_tool/neurocontainers1.png" width="650">

### Naming your repository

You may decide to keep the same name for your new reposoitory, or you may rename it. 

<img src="/static/developers/new_tools/update_tool/neurocontainers-fork.png" width="450">

### Confirming you are on the forked version

In the top left corner, you can see that you are in your forked repository of the neurocontainers repository.

<img src="/static/developers/new_tools/update_tool/neurocontainers-forked.png" width="450">

### Keeping your forked repository up-to-date

If changes are commited to the Neurodesk/neurocontainers repository, you will see a banner saying you are N commits behind. You may decide to Sync fork, which will update your repository, allowing you to have the most up-to-date files. 

<img src="/static/developers/new_tools/update_tool/neurocontainers-commits-behind.png" width="450">

## 3. Create and Edit a Codespace

Once this is done, you will want to start a Codespace using by: 

- Clicking the **+ (Create new...)** button in the top right corner. _(it's a + sign button)_
- Selecting **Codespaces** > **New codespace**.

<img src="/static/developers/new_tools/update_tool/open-codespace.png" width="650">

Configure your Codespace. 
{{< alert color="info" >}}
**Resource recommendation**:  
Most neurocontainers run smoothly on a **2-core** machine. For containers with heavier computational demands, consider using a **4-core** machine.
{{< /alert >}}

<img src="/static/developers/new_tools/update_tool/configure-codespace.png" width="450">

This opens an editable environment directly in your browser.

<img src="/static/developers/new_tools/update_tool/codespace.png" width="650">
<br><br>

In the terminal, run the following lines to configure your codespace environment.
```shell
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```
This will install a series of packages to allow you to make changes to neurocontainers.

<div style="margin-left: 2em;">

### YAML extension
The first time you use a codespace, you will also need to download the YAML extension by navigating to the Extensions tab using icon on the left of your screen and searching for YAML. Click the install button.

<img src="/static/developers/new_tools/update_tool/install-yaml1.png" width="650">
<br><br>

There will be a security pop-up where you will need to click "Trust Publisher & Install"
<img src="/static/developers/new_tools/update_tool/install-yaml2.png" width="650">
<br><br>

There will be another pop-up asking whether you allow the developers to collect data. You may click "Agree" or "Deny"
<img src="/static/developers/new_tools/update_tool/install-yaml3.png" width="650">
</div>

## 4. Make Changes to the desired Container
Navigate back to the Explorer tab using the icon on the left of your screen.

Using either the terminal at the bottom of your Codespace or the file browser on the left, navigate to the `build.yaml` file of the tool you wish to update.

{{< alert color="info" >}}
In this example, we are updating the [**Connectome Workbench**](https://neuro.debian.net/pkgs/connectome-workbench.html) tool.
{{< /alert >}}

Each tool has its own folder inside the `recipes/` directory, and inside that folder, you will find the corresponding `build.yaml` file.

- Using the GUI (file browser): Navigate manually to `recipes/connectomeworkbench/`.
- Using the terminal, you can use:
```shell
cd recipes/connectomeworkbench/ #or whichever other neurocontainer you want to update
```
<img src="/static/developers/new_tools/update_tool/codespace-recipe.png" width="650">
<br><br>

### Editing the `build.yaml`
Open the `build.yaml` file. Make the necessary updates to:
- Software version numbers
- Dependencies
- Download links
- Build instructions (if needed)

In this example, when we go to the [Connectome Workbench website](https://www.humanconnectome.org/software/get-connectome-workbench#download), we can see that the latest version available is Connectome Workbench v2.0.1.

<img src="/static/developers/new_tools/update_tool/connectome-workbench201.png" width="650">
<br><br>

To update Neurocontainer version, simply change the `version:` to 2.0.1

<img src="/static/developers/new_tools/update_tool/buildyaml-change.png" width="650">
<br><br>

If you are unsure how to structure the `build.yaml`, please refer to the examples provided in the [Neurocontainers builder documentation](https://github.com/NeuroDesk/neurocontainers/tree/main/builder).

{{< alert color="warning" >}} Important:
Keep your formatting strict! YAML files are indentation-sensitive. Use spaces, not tabs. {{< /alert >}}

Once you have made your changes, save the file.

## 5. Validate Your Changes
Before committing, make sure your changes are valid.

In the terminal, run:
```shell
./builder/build.py generate connectomeworkbench #Replace connectomeworkbench with the name of the folder you updated

#This second step can take some time
./builder/build.py generate connectomeworkbench --recreate --build --test #Replace connectomeworkbench with the name of the folder you updated
```

This script will:
- Parse your `build.yaml`
- Check for syntax errors
- Show the build steps without actually building the full container

You will be able to see the progress for each of the building steps. 
<img src="/static/developers/new_tools/update_tool/buildyaml-building.png" width="650">
<br><br>

If there are errors, correct them before proceeding.

Once you see `Docker image built successfully at connectomeworkbench:2.0.1`, you are ready to commit and push your changes.


## 6. Commit and Push Your Changes
Once you have validated your `build.yaml`, it’s time to save and upload your work.

In the terminal:
```shell
git status
```
to check which files were changed.

<img src="/static/developers/new_tools/update_tool/git-status.png" width="650">
<br><br>

If only this reflects the changes you've made, then stage, commit, and push your changes:
```shell
git add recipes/connectomeworkbench/build.yaml #Replace connectomeworkbench with the name of the folder you updated
git commit -m "Update connectomeworkbench container: updated version 2.0.1" #Adapt commit message
git push
```

Make sure your commit message is clear and descriptive, for example:

`Update Connectome Workbench container to version 1.5.0` Adjust the commit message based on the updates you made to the neurocontainer. 

## 7. Create a Pull Request
After pushing your changes:
1. Go back to your forked repository on GitHub.
2. You should see a banner saying "This branch is X commits ahead of `NeuroDesk/neurocontainers:main`". 

<div style="margin-left: 2em;">
You can either click on **X commit ahead of** to view the differences between your repository and the Neurodesk repository and then **Create pull request**

<img src="/static/developers/new_tools/update_tool/commits-ahead.png" width="650">
<br><br>
or 
<br><br>

click on **Contribute** > **Open pull request**.

<img src="/static/developers/new_tools/update_tool/create-pull.png" width="650">
<br><br>
</div>

3. In the Pull Request:
- Provide a clear title (e.g., Update Connectome Workbench to v1.5.0)
- Write a brief description of what you changed (version bump, new dependencies, etc.)
- Create the pull request.

<img src="/static/developers/new_tools/update_tool/pull-request.png" width="650">
<br><br>


Our Neurodesk team will review your proposed update, test the updated container to make sure it work and merge your changes to Neurodesk if everything works correctly, allowing all users to benefit. 

---
More detailed documentation can be found here: https://github.com/NeuroDesk/neurocontainers/tree/main/builder

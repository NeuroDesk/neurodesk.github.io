---
title: "Running the Neurodesk Site Locally (Hugo + Docsy)"
linkTitle: "Local Hugo Docsy"
weight: 1
description: >
  How to edit the documentation on the Neurodesk website
---

## 1. Prerequisites
- Git
- [Go](https://go.dev/dl/) (required for Hugo modules)
- Hugo **extended** version (0.121 recommended). See https://github.com/gohugoio/hugo/releases for Hugo releases. 
  - [Download for Mac OS and Linux](https://github.com/gohugoio/hugo/releases/download/v0.121.0/hugo_extended_0.121.0_darwin-universal.tar.gz).  
  - [Download for Windows](https://github.com/gohugoio/hugo/releases/download/v0.88.1/hugo_extended_0.88.1_Windows-64bit.zip) 

## 2. Cloning the repository
This step is the same for macOS, Windows, and Linux.

### Using SSH
```bash
git clone --recurse-submodules git@github.com:NeuroDesk/neurodesk.github.io.git
```
or 
### Using HTTPS
```bash
git clone --recurse-submodules https://github.com/NeuroDesk/neurodesk.github.io.git
```

### If you cloned without --recurse-submodules

Run the following command to pull submodules

```bash
git submodule update --init --recursive --remote
```


## 3. Start local hugo server
**On Windows:**

1. Extract the hugo.exe binary from the ZIP file into the root of your neurodesk.github.io directory.
2. Open PowerShell or Git Bash, then run:
```bash
.\hugo.exe server --disableFastRender
```
3. Once started, your dev website will be accessible via http://localhost:1313

**On Mac:**
1. Extract, move, and authorize the Hugo binary:
```bash
cd ~/Downloads  #edit according to location of file
tar -xvzf hugo_extended_0.115.4_darwin-universal.tar.gz #unzip the file
chmod +x hugo #Make the hugo file executable
sudo mv hugo /usr/local/bin/hugo-extended #move file to bin folder
```

2. Verify your Hugo installation
```bash
hugo-extended version #if it is your first time running this on a Mac, you will see a security warning
```
{{< alert color="warning" >}}
Authorize the binary if macOS blocks it:
Go to System Settings > Privacy & Security, and allow the app to run.
{{< /alert >}}

You should expect something like this (look for the mention of **extended** to be sure it worked)
```bash 
hugo v0.121.0-e321c3502aa8e80a7a7c951359339a985f082757+extended darwin/arm64 BuildDate=2023-12-05T15:22:31Z VendorInfo=gohugoio
```

Once installed, you can run the server for Mac using: 
```bash
hugo-extended server --disableFastRender
```
Once started, your dev website will be accessible via http://localhost:1313

## 4. Update docsy theme submodule (optional)
```bash
git submodule update --remote
git add themes/
git commit -m "Updating theme submodule"
git push origin main
```
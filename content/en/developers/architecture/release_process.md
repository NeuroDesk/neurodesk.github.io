---
title: "Neurodesktop Release Process"
linkTitle: "Release Process"
weight: 1
description: >
  A description of what to do to create new release of our Neurodesktop
---
## Neurodesktop:

1. Check if the last automated build ran OK: https://github.com/NeuroDesk/neurodesktop/actions
2. Run this build date and test if everything is ok and no regression happened
3. Check what changes where made since the last release: https://github.com/NeuroDesk/neurodesktop/commits/main
4. Summarize the main changes and copy this to the Release History: https://www.neurodesk.org/docs/overview/release-history/
5. Change the version of the latest desktop in https://github.com/NeuroDesk/neurodesk.github.io/blob/main/data/neurodesktop.toml
6. Commit all changes
7. Tweet a quick summary of the changes and announce new version: https://masto.ai/@Neurodesk


## Neurodesk App:

### Release process
Follow these steps to create a new release of the [Neurodesk App](https://github.com/NeuroDesk/neurodesk-app).

1. If there's new version of Neurodesktop image, Github Action will PR with updated jupyter_neurodesk_version in neurodesktop.toml file. Double-check and merge this PR.

2. Create a new release on GitHub as `pre-release`. Set the release `tag` to the value of target application version and prefix it with `v` (for example `v1.0.0` for Neurodesk App version `1.0.0`). Enter release title and release notes. Release needs to stay as `pre-release` for GitHub Actions to be able to attach installers to the release.

3. Make sure that application is building, installing and running properly.

4. In the main branch, create a branch preferably with the name `release-v<new-version>`. Add a commit with the version changes in package.json file. This is necessary for GitHub Actions to be able to attach installers to the release. (for example `"version": "1.0.0"`).

5. GitHub Actions will automatically create installers for each platform (Linux, macOS, Windows) and upload them as release assets. Assets will be uploaded only if a release of type `pre-release` with tag matching the Neurodesk App's version with a `v` prefix is found. For example, if the Neurodesk App version in the PR is `1.0.0`, the installers will be uploaded to a release that is flagged as `pre-release` and has a tag `v1.0.0`. New commits to this branch will overwrite the installer assets of the release.

6. Once all the changes are complete, and installers are uploaded to the release then publish the release.

### Update MacOS certificate
Follow these step-by-step instructions to generate and export the required Macos certificate for Neurodesk App release.

1. Launch the "Keychain Access" application on your Mac, go to "Certificate Assistant."
2. Request Certificate from Certificate Authority: Within "Certificate Assistant," select "Request a Certificate from a Certificate Authority."
3. Follow the URL to access the Apple Developer website: https://developer.apple.com/account/resources/certificates/add, upload the generated certificate.
4. After uploading the certificate, download the resulting file provided by the Apple Developer website.
5. Import the Certificate in Keychain.
6. Right-click the imported certificate in "Keychain Access.", choose "Export" and save it in .p12 format.
7. Convert the .p12 file to Base64 using the following command:
`openssl base64 -in neurodesk_certificate.p12`
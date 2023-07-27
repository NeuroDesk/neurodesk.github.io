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
Follow these step-by-step instructions to generate and export the required Macos certificate for Neurodesk App release.

1. Launch the "Keychain Access" application on your Mac, go to "Certificate Assistant."
2. Request Certificate from Certificate Authority: Within "Certificate Assistant," select "Request a Certificate from a Certificate Authority."
3. Follow the URL to access the Apple Developer website: https://developer.apple.com/account/resources/certificates/add, upload the generated certificate.
4. After uploading the certificate, download the resulting file provided by the Apple Developer website.
5. Import the Certificate in Keychain.
6. Right-click the imported certificate in "Keychain Access.", choose "Export" and save it in .p12 format.
7. Convert the .p12 file to Base64 using the following command:
`openssl base64 -in neurodesk_certificate.p12`
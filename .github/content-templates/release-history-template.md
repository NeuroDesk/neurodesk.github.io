# Release History Format

Use the following format when documenting tool or documentation updates. Each version section should be dated using the format `YYYY-MM-DD`.

## Version YYYY-MM-DD

### New Features
`Briefly describe newly added features, tools, or components`
- New feature `X`
- New component added

### Improvements
`Describe any enhancements, version upgrades, or improved functionality`
- Replaced `X`
- Updated steps for installing `X`
- Upgraded container version for `tool` to `vX.X.X`

### Bug Fixes
`List specific issues resolved or regressions fixed`
- Fixed broken link on the installation page
- Corrected tool description for `X`

### Removed
`Mention deprecated tools, features, or documentation removed`
- Deprecated script `old_setup.sh`

---
Skeleton:

## Version YYYY-MM-DD

### New Features
- 

### Improvements
- 

### Bug Fixes
- 

### Removed
- 

---

> Example:

## 2025-04-08
### New Features
- Added [dcm2bids](https://github.com/UNFmontreal/Dcm2Bids) support
- Integrated [QSMxT](https://qsmxt.github.io/QSMxT/) v8.0.2
### Improvements
- Replaced [BIDScoin](https://bidscoin.readthedocs.io/en/latest/) 4.6.0 with 4.6.1 to fix GUI bug
- Updated [qsiprep](https://qsiprep.readthedocs.io/) to 1.0.1
### Bug Fixes
- Improved internet test by using DNS lookup instead of ping
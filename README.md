_Information on the **Neurodesk** project is available at [neurodesk.org](https://www.neurodesk.org)_

#### Clone repository
Using SSH
```
git clone --recurse-submodules git@github.com:NeuroDesk/neurodesk.github.io.git
```
Using Https:
```
git clone --recurse-submodules https://github.com/NeuroDesk/neurodesk.github.io.git
````

#### Download hugo extended
```
https://github.com/gohugoio/hugo/releases
```

### Forking this repository

#### 1. Find BASEURL

The forked baseurl will usually be in the following format `https://USERNAME.github.io/neurodesk.github.io/`. 

> Replace USERNAME with the forked repository's GitHub Username or Organisation

#### 2. Set BASEURL
Navigate to [/settings/variables/actions](../../settings/variables/actions) and create **New repository variable** with the following information

<dl>
  <dt>Name</dt>
  <dd>BASEURL</dd>
  <dt>Value</dt>
  <dd><code>https://USERNAME.github.io/neurodesk.github.io/</code></dd>
</dl>

#### 3. Set page builder
Go to [/settings/pages](../../settings/pages). Under **Build and deployment**, set **Source** as **Github Actions**

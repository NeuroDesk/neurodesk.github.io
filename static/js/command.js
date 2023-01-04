// Keys are Substrings as diplayed by navigator.platform
var supportedOperatingSystems = new Map([
  ['linux', 'linux'],
  ['mac', 'macos'],
  ['win', 'windows'],
]);

var archInfoMap = new Map([
  ['hpc', {title: "HPC", platforms: new Set(['linux','macos', 'windows']),  countries: new Set(['intl', 'aus'])}],
  ['cloud', {title: "Cloud", platforms: new Set(['linux','macos', 'windows']), countries: new Set(['intl', 'aus'])}],
  ['nectar', {title: "Nectar", platforms: new Set(['linux','macos', 'windows']), countries: new Set(['aus'])}],
  ['browser', {title: "Browser", platforms: new Set(['linux','macos', 'windows']), countries: new Set(['intl', 'aus'])}],
  ['cpu', {title: "CPU", platforms: new Set(['linux', 'macos', 'windows']), countries: new Set(['intl', 'aus'])}]
]);


let default_country="Australia based researcher";

var default_selected_os = getAnchorSelectedOS() || getDefaultSelectedOS();
var opts = {
  country: 'aus',
  platform: 'cpu',
  os: default_selected_os,
  interface: 'gui',
};

var country = $(".country > .option");
var os = $(".os > .option");
var platform = $(".platform > .option");
var interface = $(".interface > .option");

console.log(country, os, platform, interface);

country.on("click", function() {
  selectedOption(country, this, "country");
});
os.on("click", function() {
  selectedOption(os, this, "os");
});
platform.on("click", function() {
  selectedOption(platform, this, "platform");
});
interface.on("click", function() {
  selectedOption(interface, this, "interface")
});

// Pre-select user's operating system
$(function() {
  var userOsOption = document.getElementById(opts.os);
  var userPlatformOption = document.getElementById(opts.platform);
  var userCountryOption = document.getElementById(opts.country);
  if (userOsOption) {
    $(userOsOption).trigger("click");
  }
  if (userPlatformOption) {
    $(userPlatformOption).trigger("click");
  }
  if (userCountryOption) {
    $(userCountryOption).trigger("click");
  }
});


// determine os (mac, linux, windows) based on user's platform
function getDefaultSelectedOS() {
  var platform = navigator.platform.toLowerCase();
  for (var [navPlatformSubstring, os] of supportedOperatingSystems.entries()) {
    if (platform.indexOf(navPlatformSubstring) !== -1) {
      console.log("Detected OS: " + os);
      return os;
    }
  }
  // Just return something if user platform is not in our supported map
  return supportedOperatingSystems.values().next().value;
}

// determine os based on country hash
function getAnchorSelectedOS() {
  var anchor = location.hash;
  console.log(anchor)
  var ANCHOR_REGEX = /^#[^ ]+$/;
  // Look for anchor in the href
  if (!ANCHOR_REGEX.test(anchor)) {
    return false;
  }
  // Look for anchor with OS in the first portion
  var testOS = anchor.slice(1).split("-")[0];
  for (var [navPlatformSubstring, os] of supportedOperatingSystems.entries()) {
    if (testOS.indexOf(navPlatformSubstring) !== -1) {
      return os;
    }
  }
  return false;
}


// Disable compute platform not supported on OS
function disableUnsupportedPlatforms(os) {
  for (const [arch_key, info] of archInfoMap) {
    var elems = document.querySelectorAll('[id^="'+arch_key+'"]');
    if (elems == null) {
      console.log("Failed to find element for architecture " + arch_key);
      return;
    }
    for (var i=0; i < elems.length;i++) {
      var supported = info.platforms.has(os);
      elems[i].style.textDecoration = supported ? "" : "line-through";
    }
  }
}

// Change compute versions depending on build type
function changeCountry(country) {
  for (const [arch_key, info] of archInfoMap) {
    var elems = document.querySelectorAll('[id^="'+arch_key+'"]');
    if (elems == null) {
      console.log("Failed to find element for architecture " + arch_key);
      return;
    }
    for (var i=0; i < elems.length;i++) {
      var supported = info.countries.has(country);
      elems[i].style.textDecoration = supported ? "" : "line-through";
    }
  }
}


function selectedOption(option, selection, category) {
  $(option).removeClass("selected");
  $(selection).addClass("selected");
  opts[category] = selection.id;
  if (category === "interface") {
    var elements = document.getElementsByClassName("platform")[0].children;
    if (selection.id !== "cmd" && elements["hpc"].classList.contains("selected")) {
      $(elements["hpc"]).removeClass("selected");
      $(elements["cpu"]).addClass("selected");
      opts["platform"] = "cpu";
    } else if (selection.id == "cmd") {
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].id === "cpu") {
          $(elements[i]).addClass("selected");
          opts["platform"] = "cpu";
        } else {
          $(elements[i]).removeClass("selected");
        }
      }
    }
  } else if (category === "platform") {
    var elements = document.getElementsByClassName("country")[0].children;
    if (selection.id === "nectar" && elements["intl"].classList.contains("selected")) {
      $(elements["intl"]).removeClass("selected");
      $(elements["aus"]).addClass("selected");
      opts["country"] = "aus";
      changeCountry(opts.country);
    } 
  } else if (category == "country") {
    var elements = document.getElementsByClassName("platform")[0].children;
    if (selection.id === "intl" && elements["nectar"].classList.contains("selected")) {
      $(elements["nectar"]).removeClass("selected");
      $(elements["cloud"]).addClass("selected");
      opts["platform"] = "cloud";
    } 
    changeCountry(opts.country);
    display(opts.country, 'installation', 'country');

  }
  commandMessage(buildMatcher());
  if (category === "os") {
    disableUnsupportedPlatforms(opts.os);
    display(opts.os, 'installation', 'os');
  }
}

function display(selection, id, category) {
  var container = document.getElementById(id);
  // Check if there's a container to display the selection
  if (container === null) {
    return;
  }
  var elements = container.getElementsByClassName(category);
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains(selection)) {
      $(elements[i]).addClass("selected");
    } else {
      $(elements[i]).removeClass("selected");
    }
  }
}

function buildMatcher() {
  return (
    opts.interface.toLowerCase() +
    "," +
    opts.os.toLowerCase() +
    "," +
    opts.platform.toLowerCase() +
    "," +
    opts.country.toLowerCase()
  );
}


function commandMessage(key) {
  var object = {
    "gui,linux,cpu,aus": 'Download and run the following executable https://github.com/NeuroDesk/neurodesktop/raw/main/Linux_run_Neurodesk/NeuroDesktop.run', 
    "gui,linux,cpu,intl": 'Download and run the following executable https://github.com/NeuroDesk/neurodesktop/raw/main/Linux_run_Neurodesk/NeuroDesktop.run', 
    "gui,linux,browser,aus": 'https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main', 
    "gui,linux,browser,intl": 'https://play-phoenix.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main',
    "gui,linux,cloud,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/', 
    "gui,linux,nectar,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/', 
    "gui,macos,cpu,aus": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "gui,macos,cpu,intl": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "gui,macos,cloud,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/', 
    "gui,macos,nectar,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/', 
    "gui,windows,cpu,aus": 'Download and run the following executable https://github.com/NeuroDesk/neurodesktop/raw/main/Windows_run_Neurodesk/NeuroDesktop.exe', 
    "gui,windows,cpu,intl": 'Download and run the following executable https://github.com/NeuroDesk/neurodesktop/raw/main/Windows_run_Neurodesk/NeuroDesktop.exe', 
    "gui,windows,browser,aus": 'https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main', 
    "gui,windows,browser,intl": 'https://play-phoenix.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main',
    "gui,windows,cloud,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/', 
    "gui,windows,nectar,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/', 
    "cmd,macos,cpu,aus": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216',  
    "cmd,macos,cpu,intl": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "cmd,macos,browser,aus": 'https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main', 
    "cmd,macos,cloud,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/', 
    "cmd,macos,nectar,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/', 
    "cmd,windows,cpu,aus": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "cmd,windows,cpu,intl": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "cmd,windows,cloud,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/', 
    "cmd,windows,nectar,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/', 
    "cmd,linux,cpu,aus": 'sudo docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)" -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "cmd,linux,cloud,intl": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/', 
    "cmd,macos,cloud,intl": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/', 
    "gui,macos,browser,intl": 'https://play-phoenix.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main', 
    "gui,windows,browser,intl": 'https://play-phoenix.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main', 
    "gui,macos,cloud,intl": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/', 
    "gui,windows,cloud,intl": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/', 
    "gui,linux,cloud,intl": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/', 
    "gui,linux,nectar,intl": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/', 
    "cmd,macos,hpc,intl": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/',
    "cmd,windows,hpc,intl": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/',
    "cmd,linux,hpc,intl": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/',
    "cmd,macos,hpc,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/',
    "cmd,windows,hpc,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/',
    "cmd,linux,hpc,aus": 'Follow the instruction in https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/',
 };

  if (!object.hasOwnProperty(key)) {
    $("#command").html(
      "<pre> # Follow instructions at this URL: https://www.neurodesk.org/docs/neurodesktop/getting-started/ </pre>"
    );
  }  else {
    $("#command").html("<pre>" + object[key] + "</pre>");
  }
}

// Set platform version right away
changeCountry("aus")

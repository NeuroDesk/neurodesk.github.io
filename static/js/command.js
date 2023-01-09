// Keys are Substrings as diplayed by navigator.platform
var supportedOperatingSystems = new Map([
  ['linux', 'linux'],
  ['mac', 'macos'],
  ['win', 'windows'],
]);

var archInfoMap = new Map([
  ['hpc', {title: "HPC", oss: new Set(['linux','macos', 'windows']),  countries: new Set(['intl', 'aus'])}],
  ['cloud', {title: "Cloud", oss: new Set(['linux','macos', 'windows']), countries: new Set(['intl', 'aus'])}],
  ['nectar', {title: "Nectar", oss: new Set(['linux','macos', 'windows']), countries: new Set(['aus'])}],
  ['local', {title: "Local PC", oss: new Set(['linux', 'macos', 'windows']), countries: new Set(['intl', 'aus'])}]
]);

var archProcessorMap = new Map([
  ['x86', {title: "x86", platforms: new Set(['hpc','cloud','local', 'nectar']), oss: new Set(['linux','macos', 'windows'])}],
  ['gpu', {title: "GPU", platforms: new Set(['hpc','cloud','local', 'nectar']), oss: new Set(['linux'])}],
  ['arm', {title: "ARM", platforms: new Set([]), oss: new Set([])}],
]);

var archInterfaceMap = new Map([
  ['gui', {title: "Local PC", platforms: new Set(['hpc','cloud','local', 'nectar']), oss: new Set(['linux','macos', 'windows'])}],
  ['cmd', {title: "Command Line", platforms: new Set(['hpc','cloud','local']), oss: new Set(['linux','macos', 'windows'])}],
  ['cvmfs', {title: "CVMFS", platforms: new Set(['hpc','local']), oss: new Set(['linux','macos', 'windows'])}],
]);

let default_country="Australia based researcher";

var default_selected_os = getAnchorSelectedOS() || getDefaultSelectedOS();
var opts = {
  country: 'aus',
  platform: 'local',
  os: default_selected_os,
  interface: 'gui',
  processor: 'x86'
};

var country = $(".country > .option");
var os = $(".os > .option");
var platform = $(".platform > .option");
var interface = $(".interface > .option");
var processor = $(".processor > .option");


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
processor.on("click", function() {
  selectedOption(processor, this, "processor")
});

// Pre-select user's operating system
$(function() {
  var userCountryOption = document.getElementById(opts.country);
  var userOsOption = document.getElementById(opts.os);
  var userPlatformOption = document.getElementById(opts.platform);
  var userInterfaceOption = document.getElementById(opts.interface);
  var userProcessorOption = document.getElementById(opts.processor);


  if (userCountryOption) {
    $(userCountryOption).trigger("click");
  }
  if (userOsOption) {
    $(userOsOption).trigger("click");
  }
  if (userPlatformOption) {
    $(userPlatformOption).trigger("click");
  }
  if (userInterfaceOption) {
    $(userInterfaceOption).trigger("click");
  }
  if (userProcessorOption) {
    $(userProcessorOption).trigger("click");
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


// Disable processors not supported on OS
function disableUnsupportedPlatforms(infomap, category, val) {
  for (const [arch_key, info] of infomap) {
    var elems = document.querySelectorAll('[id^="'+arch_key+'"]');
    if (elems == null) {
      console.log("Failed to find element for architecture " + arch_key);
      return;
    }
    for (var i=0; i < elems.length;i++) {
      var supported = info[category].has(val);
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
    if ((selection.id === "cmd" || selection.id === "cvmfs") && elements["nectar"].classList.contains("selected")) {
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].id === "local") {
          $(elements[i]).addClass("selected");
          opts["platform"] = "local";
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
    } 

  } else if (category == "country") {
    var elements = document.getElementsByClassName("platform")[0].children;
    if (selection.id === "intl" && elements["nectar"].classList.contains("selected")) {
      $(elements["nectar"]).removeClass("selected");
      $(elements["cloud"]).addClass("selected");
      opts["platform"] = "cloud";
    } 

  } else if (category == "os") {
    // disableUnsupportedPlatforms(archProcessorMap,"oss",opts.os)
  } else if (category == "processor") {
    var elements = document.getElementsByClassName("os")[0].children;
    if (selection.id === "gpu" && (elements["macos"].classList.contains("selected") || elements["windows"].classList.contains("selected"))) {
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].id === "linux") {
          $(elements[i]).addClass("selected");
          opts["os"] = "linux";
          
        } else {
          $(elements[i]).removeClass("selected");
        }
      }
    } 
  }
  commandMessage(buildMatcher());
  disableUnsupportedPlatforms(archInterfaceMap,"platforms",opts.platform);
  disableUnsupportedPlatforms(archProcessorMap,"oss",opts.os);
  disableUnsupportedPlatforms(archInfoMap, "countries", opts.country);
}


function buildMatcher() {
  return (
    opts.processor.toLowerCase() +
    "," +
    opts.interface.toLowerCase() +
    "," +
    opts.os.toLowerCase() +
    "," +
    opts.platform.toLowerCase() +
    "," +
    opts.country.toLowerCase()
  );
}

function copyButton() {
  if(!document.queryCommandSupported('copy')) {
    return;
  }

  function flashCopyMessage(el, msg) {
    el.textContent = msg;
    setTimeout(function() {
      el.textContent = "Copy";
    }, 1000);
  }

  function selectText(node) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }

  function addCopyButton(containerEl) {
    var copyBtn = document.createElement("button");
    copyBtn.className = "highlight-copy-btn";
    copyBtn.textContent = "Copy";

    var codeEl = containerEl.firstElementChild;
    copyBtn.addEventListener('click', function() {
      try {
        var selection = selectText(codeEl);
        document.execCommand('copy');
        selection.removeAllRanges();

        flashCopyMessage(copyBtn, 'Copied!')
      } catch(e) {
        console && console.log(e);
        flashCopyMessage(copyBtn, 'Failed :\'(')
      }
    });

    containerEl.appendChild(copyBtn);
  }

  // Add copy button to code blocks
  var highlightBlocks = document.getElementsByClassName('highlight');
  Array.prototype.forEach.call(highlightBlocks, addCopyButton);
}

function commandMessage(key) {
  var object =   {
    "x86,gui,linux,local,aus": 'sudo docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)" -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "x86,gui,linux,local,intl": 'sudo docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)" -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "x86,gui,linux,cloud,intl": 'Go to <a href="https://play.neurodesk.org/">https://play.neurodesk.org/</a>',
    "x86,gui,linux,cloud,aus": 'To keep home directory across sessions, go to <br /> <a href="https://bhsydney.neurodesk.org//">https://bhsydney.neurodesk.org/</a> <br /> To quickly access without authentication and keeping data, go to <br /> <a href="https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main">https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main</a>', 
    "x86,gui,linux,nectar,aus":  'Follow the instruction at <br /> <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/">https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/</a>', 
    "x86,gui,linux,hpc,aus":  'Follow the instruction at <br /> <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,gui,linux,hpc,intl": 'Follow the instruction at <br /> <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,gui,macos,local,aus": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "x86,gui,macos,local,intl": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "x86,gui,macos,cloud,intl": 'Go to <a href="https://play.neurodesk.org/">https://play.neurodesk.org/</a>',
    "x86,gui,macos,cloud,aus": 'To keep home directory across sessions, go to <br /> <a href="https://bhsydney.neurodesk.org//">https://bhsydney.neurodesk.org/</a> <br /> To quickly access without authentication and keeping data, go to <br /> <a href="https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main">https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main</a>', 
    "x86,gui,macos,nectar,aus": 'Follow the instruction at  <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/">https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/</a>', 
    "x86,gui,macos,hpc,aus": 'Follow the instruction at <br /> <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,gui,macos,hpc,intl": 'Follow the instruction at <br /> <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,gui,windows,local,aus": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "x86,gui,windows,local,intl": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "x86,gui,windows,cloud,intl": 'Go to <a href="https://play.neurodesk.org/">https://play.neurodesk.org/</a>',
    "x86,gui,windows,cloud,aus": 'To keep home directory across sessions, go to <br /> <a href="https://bhsydney.neurodesk.org//">https://bhsydney.neurodesk.org/</a> <br /> To quickly access without authentication and keeping data, go to <br /> <a href="https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main">https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main</a>', 
    "x86,gui,windows,nectar,aus": 'Follow the instruction at  <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/">https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/</a>', 
    "x86,gui,windows,hpc,aus": 'Follow the instruction at <br /> <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,gui,windows,hpc,intl": 'Follow the instruction at <br /> <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,cmd,macos,local,aus": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216',  
    "x86,cmd,macos,local,intl": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "x86,cmd,macos,cloud,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    "x86,cmd,macos,cloud,intl":'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    "x86,cmd,macos,hpc,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a>', 
    "x86,cmd,macos,hpc,intl": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a>', 
    "x86,cmd,windows,local,aus": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "x86,cmd,windows,local,intl": 'docker run --shm-size=1gb -it --privileged --name neurodesktop -v C:/neurodesktop-storage:/neurodesktop-storage -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "x86,cmd,windows,cloud,intl": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    "x86,cmd,windows,cloud,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    "x86,cmd,windows,hpc,intl": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocommand/getting-started/windows/">https://www.neurodesk.org/docs/neurocommand/getting-started/windows/</a>',
    "x86,cmd,windows,hpc,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocommand/getting-started/windows/">https://www.neurodesk.org/docs/neurocommand/getting-started/windows/</a>',
    "x86,cmd,linux,local,aus": 'sudo docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)" -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "x86,cmd,linux,local,intl": 'sudo docker run --shm-size=1gb -it --privileged --name neurodesktop -v ~/neurodesktop-storage:/neurodesktop-storage -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)" -p 8080:8080 -h neurodesktop-20221216 vnmd/neurodesktop:20221216', 
    "x86,cmd,linux,cloud,intl": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    "x86,cmd,linux,cloud,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    "x86,cmd,linux,hpc,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocommand/getting-started/linux/">https://www.neurodesk.org/docs/neurocommand/getting-started/linux/</a>',
    "x86,cmd,linux,hpc,intl": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocommand/getting-started/linux/">https://www.neurodesk.org/docs/neurocommand/getting-started/linux/</a>',
    "x86,cvmfs,windows,local,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,cvmfs,windows,local,intl": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,cvmfs,windows,hpc,intl": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,cvmfs,windows,hpc,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,cvmfs,linux,local,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,cvmfs,linux,local,intl": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,cvmfs,linux,hpc,intl": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,cvmfs,linux,hpc,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,cvmfs,macos,local,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,cvmfs,macos,local,intl": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,cvmfs,macos,hpc,intl": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,cvmfs,macos,hpc,aus": 'Follow the instruction at <a href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    
 };

  if (!object.hasOwnProperty(key)) {
    $("#command").html(
      '<pre > Not available </pre>'
    );
  }  else {
    $("#command").html('<pre><code>' + object[key] + "</code></pre>").html(copyButton());
  }
}

// Set platform version right away
disableUnsupportedPlatforms(archInfoMap, "countries", opts.country);


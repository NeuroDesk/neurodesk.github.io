// Keys are Substrings as diplayed by navigator.platform
var supportedOperatingSystems = new Map([
  ['linux', 'linux'],
  ['mac', 'macos'],
  ['win', 'windows'],
]);

var archInfoMap = new Map([
  ['colab', {title: "Colab", oss: new Set(['linux','macos', 'windows']),  countries: new Set(['intl', 'aus'])}],
  ['hpc', {title: "HPC", oss: new Set(['linux','macos', 'windows']),  countries: new Set(['intl', 'aus'])}],
  ['cloud', {title: "Cloud", oss: new Set(['linux','macos', 'windows']), countries: new Set(['intl', 'aus'])}],
  ['nectar', {title: "Nectar", oss: new Set(['linux','macos', 'windows']), countries: new Set(['aus'])}],
  ['local', {title: "Local PC", oss: new Set(['linux', 'macos', 'windows']), countries: new Set(['intl', 'aus'])}]
]);

var archProcessorMap = new Map([
  ['x86', {title: "x86", platforms: new Set(['hpc','cloud','local', 'nectar', 'colab']), oss: new Set(['linux','macos', 'windows'])}],
  ['gpu', {title: "GPU", platforms: new Set(['hpc','cloud','local', 'nectar', 'colab']), oss: new Set(['linux','macos', 'windows'])}],
  ['arm', {title: "ARM", platforms: new Set([]), oss: new Set([])}],
]);

var archInterfaceMap = new Map([
  ['gui', {title: "Local PC", platforms: new Set(['hpc','cloud','local', 'nectar']), oss: new Set(['linux','macos', 'windows'])}],
  ['cmd', {title: "Command Line", platforms: new Set(['hpc','cloud','local']), oss: new Set(['linux','macos', 'windows'])}],
  ['container', {title: "Container", platforms: new Set(['hpc','local', 'colab', 'cloud']), oss: new Set(['linux','macos', 'windows'])}],
  ['vscode', {title: "VSCode", platforms: new Set(['hpc','local', 'cloud']), oss: new Set(['linux','macos', 'windows'])}],
]);

// let default_country="Australia based researcher";

var default_selected_os = getDefaultSelectedOS();
var opts = {
  // country: 'aus',
  platform: 'local',
  os: default_selected_os,
  interface: 'gui',
  processor: 'x86'
};

// var country = $(".country > .option");
var os = $(".os > .option");
var platform = $(".platform > .option");
var interface = $(".interface > .option");
var processor = $(".processor > .option");


// country.on("click", function() {
//   selectedOption(country, this, "country");
// });
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
  // var userCountryOption = document.getElementById(opts.country);
  var userOsOption = document.getElementById(opts.os);
  var userPlatformOption = document.getElementById(opts.platform);
  var userInterfaceOption = document.getElementById(opts.interface);
  var userProcessorOption = document.getElementById(opts.processor);


  // if (userCountryOption) {
  //   $(userCountryOption).trigger("click");
  // }
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
  if (category === "platform") {
    // var elements = document.getElementsByClassName("country")[0].children;
    var interface_elements = document.getElementsByClassName("interface")[0].children;

    if (selection.id === "colab" && !(interface_elements["container"].classList.contains("selected"))) {
      for (var i = 0; i < interface_elements.length; i++) {
        if (interface_elements[i].id === "container") {
          $(interface_elements[i]).addClass("selected");
          opts["interface"] = "container";
        } else {
          $(interface_elements[i]).removeClass("selected");
        }
      }
    } 

  }
  commandMessage(buildMatcher());
  disableUnsupportedPlatforms(archInterfaceMap,"platforms",opts.platform);
  disableUnsupportedPlatforms(archProcessorMap,"oss",opts.os);
  // disableUnsupportedPlatforms(archInfoMap, "countries", opts.country);
}


function buildMatcher() {
  return (
    opts.processor.toLowerCase() +
    "," +
    opts.interface.toLowerCase() +
    "," +
    opts.os.toLowerCase() +
    "," +
    opts.platform.toLowerCase()
    // "," +
    // opts.country.toLowerCase()
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
    "x86,gui,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/</a>', 
    
    "x86,gui,linux,cloud": 'To use Neurodesk hosted in JupyterLab, go to <a target="_blank" href="https://play.neurodesk.org/">https://play.neurodesk.org/</a><br />To host Neurodesk yourself on a cloud provider, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a><br />To use Neurodesk hosted in Nectar (only available for Australian researchers), go to <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/">https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/</a>',
    // "x86,gui,linux,cloud": 'To keep home directory across sessions, go to <br /> <a target="_blank" href="https://bhsydney.neurodesk.org//">https://bhsydney.neurodesk.org/</a> <br /> To quickly access without authentication and keeping data, go to <br /> <a target="_blank" href="https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main">https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main</a>', 
    // "x86,gui,linux,nectar":  'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/">https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/</a>', 
    // "x86,gui,linux,hpc":  'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,gui,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
   
    "x86,gui,macos,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/mac/">https://www.neurodesk.org/docs/neurodesktop/getting-started/mac/</a>', 
    // "x86,gui,macos,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/mac/">https://www.neurodesk.org/docs/neurodesktop/getting-started/mac/</a>', 
    "x86,gui,macos,cloud": 'To use Neurodesk hosted in JupyterLab, go to <a target="_blank" href="https://play.neurodesk.org/">https://play.neurodesk.org/</a><br />To host Neurodesk yourself on a cloud provider, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a><br />To use Neurodesk hosted in Nectar (only available for Australian researchers), go to <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/">https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/</a>',
    // "x86,gui,macos,cloud": 'To keep home directory across sessions, go to <br /> <a target="_blank" href="https://bhsydney.neurodesk.org//">https://bhsydney.neurodesk.org/</a> <br /> To quickly access without authentication and keeping data, go to <br /> <a target="_blank" href="https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main">https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main</a>', 
    // "x86,gui,macos,nectar": 'Follow the instruction at <br />  <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/">https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/</a>', 
    // "x86,gui,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,gui,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    
    // "x86,gui,windows,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/windows/">https://www.neurodesk.org/docs/neurodesktop/getting-started/windows/</a>', 
    "x86,gui,windows,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/windows/">https://www.neurodesk.org/docs/neurodesktop/getting-started/windows/</a>', 
    "x86,gui,windows,cloud": 'To use Neurodesk hosted in JupyterLab, go to <a target="_blank" href="https://play.neurodesk.org/">https://play.neurodesk.org/</a><br />To host Neurodesk yourself on a cloud provider, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a><br />To use Neurodesk hosted in Nectar (only available for Australian researchers), go to <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/">https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/</a>',
    // "x86,gui,windows,cloud": 'To keep home directory across sessions, go to <br /> <a target="_blank" href="https://bhsydney.neurodesk.org//">https://bhsydney.neurodesk.org/</a> <br /> To quickly access without authentication and keeping data, go to <br /> <a target="_blank" href="https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main">https://play-sydney.neurodesk.org/v2/gh/neurodesk/jupyter-neurodesktop-image/main</a>', 
    // "x86,gui,windows,nectar": 'Follow the instruction at <br />  <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/">https://www.neurodesk.org/docs/neurodesktop/getting-started/nectar/</a>', 
    // "x86,gui,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,gui,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
   
    // "x86,cmd,macos,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurocommand/getting-started/linux/">https://www.neurodesk.org/docs/neurocommand/getting-started/linux/</a>',  
    "x86,cmd,macos,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurocommand/getting-started/linux/">https://www.neurodesk.org/docs/neurocommand/getting-started/linux/</a>', 
    // "x86,cmd,macos,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    "x86,cmd,macos,cloud":'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    // "x86,cmd,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a>', 
    "x86,cmd,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a>', 
    
    // "x86,cmd,windows,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/windows/">https://www.neurodesk.org/docs/neurocommand/getting-started/windows/</a>', 
    "x86,cmd,windows,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/windows/">https://www.neurodesk.org/docs/neurocommand/getting-started/windows/</a>', 
    // "x86,cmd,windows,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    "x86,cmd,windows,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    // "x86,cmd,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurocommand/getting-started/windows/">https://www.neurodesk.org/docs/neurocommand/getting-started/windows/</a>',
    "x86,cmd,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a>',
    
    // "x86,cmd,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurocommand/getting-started/linux/">https://www.neurodesk.org/docs/neurocommand/getting-started/linux/</a>', 
    "x86,cmd,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurocommand/getting-started/linux/">https://www.neurodesk.org/docs/neurocommand/getting-started/linux/</a>', 
    // "x86,cmd,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    "x86,cmd,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/">https://www.neurodesk.org/docs/neurodesktop/getting-started/cloud/</a>', 
    // "x86,cmd,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a>',
    "x86,cmd,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/">https://www.neurodesk.org/docs/neurodesktop/getting-started/hpc/</a>',
    
    // "x86,container,windows,local": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,container,windows,local": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    // "x86,container,windows,hpc": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,container,windows,hpc": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    // "x86,container,windows,cloud": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,container,windows,cloud": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    // "x86,container,windows,colab": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    // "x86,container,windows,colab": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    // "x86,container,windows,colab": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/googlecolab/">https://www.neurodesk.org/docs/neurocontainers/googlecolab/</a>', 
    "x86,container,windows,colab": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/googlecolab/">https://www.neurodesk.org/docs/neurocontainers/googlecolab/</a>', 

    // "x86,container,macos,local": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,container,macos,local": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,container,macos,hpc": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    // "x86,container,macos,hpc": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    // "x86,container,macos,cloud": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,container,macos,cloud": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    // "x86,container,macos,colab": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/googlecolab/">https://www.neurodesk.org/docs/neurocontainers/googlecolab/</a>', 
    "x86,container,macos,colab": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/googlecolab/">https://www.neurodesk.org/docs/neurocontainers/googlecolab/</a>', 

    // "x86,container,linux,local": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,container,linux,local": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,container,linux,hpc": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    // "x86,container,linux,hpc": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    // "x86,container,linux,cloud": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    "x86,container,linux,cloud": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/docker/">https://www.neurodesk.org/docs/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/singularity/">https://www.neurodesk.org/docs/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/neurocontainers/cvmfs/</a>',
    // "x86,container,linux,colab": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/googlecolab/">https://www.neurodesk.org/docs/neurocontainers/googlecolab/</a>', 
    "x86,container,linux,colab": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurocontainers/googlecolab/">https://www.neurodesk.org/docs/neurocontainers/googlecolab/</a>', 
    
    // "x86,vscode,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    "x86,vscode,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    // "x86,vscode,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    "x86,vscode,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    "x86,vscode,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    // "x86,vscode,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 

    // "x86,vscode,macos,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    "x86,vscode,macos,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    // "x86,vscode,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    "x86,vscode,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    // "x86,vscode,macos,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    "x86,vscode,macos,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 

    // "x86,vscode,windows,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    "x86,vscode,windows,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    // "x86,vscode,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    "x86,vscode,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    // "x86,vscode,windows,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 
    "x86,vscode,windows,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/">https://www.neurodesk.org/docs/neurodesktop/getting-started/visual-studio-code/</a>', 

    
    "gpu,gui,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
    "gpu,gui,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a><br /> Then access graphical interface with X11 forwarding', 
    "gpu,gui,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a><br /> Then access graphical interface with X11 forwarding', 
    "gpu,gui,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a><br /> Then access graphical interface with X11 forwarding', 
    // "gpu,gui,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
    "gpu,gui,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
    // "gpu,cmd,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
    "gpu,cmd,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
    // "gpu,cmd,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
    "gpu,cmd,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
    "gpu,cmd,windows,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
    "gpu,cmd,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 

    "gpu,cmd,macos,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
    // "gpu,gui,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
    "gpu,cmd,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
    "gpu,cmd,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support">https://www.neurodesk.org/docs/neurodesktop/getting-started/linux/#gpu-support</a>', 
  };

  if (!object.hasOwnProperty(key)) {
    $("#command").html(
      '<pre > Not yet available. Work in progress.</pre>'
    );
  }  else {
    $("#command").html('<pre><code>' + object[key] + "</code></pre>");
  }
}

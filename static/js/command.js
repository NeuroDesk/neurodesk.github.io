// Keys are Substrings as displayed by navigator.platform
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
  ['x86', {title: "x86", platforms: new Set(['hpc','cloud','local', 'nectar', 'colab']), oss: new Set(['linux','macos', 'windows']), interface: new Set(['gui', 'cmd', 'container', 'vscode'])}],
  ['gpu', {title: "GPU", platforms: new Set(['hpc','cloud','local', 'nectar', 'colab']), oss: new Set(['linux','macos', 'windows']), interface: new Set(['gui', 'cmd', 'container', 'vscode'])}],
  ['arm', {title: "ARM", platforms: new Set(['local']), oss: new Set(['linux', 'macos']), interface: new Set(['gui'])}],
]);

var archInterfaceMap = new Map([
  ['gui', {title: "Local PC", platforms: new Set(['hpc','cloud','local', 'nectar']), oss: new Set(['linux','macos', 'windows'])}],
  ['cmd', {title: "Command Line", platforms: new Set(['hpc','cloud','local']), oss: new Set(['linux','macos', 'windows'])}],
  ['container', {title: "Container", platforms: new Set(['hpc','local', 'colab', 'cloud']), oss: new Set(['linux','macos', 'windows'])}],
  ['vscode', {title: "VSCode", platforms: new Set(['hpc','local', 'cloud']), oss: new Set(['linux','macos', 'windows'])}],
]);

var default_selected_os = getDefaultSelectedOS();
var opts = {
  platform: 'local',
  os: default_selected_os,
  interface: 'gui',
  processor: 'x86'
};

var os = $(".os > .option");
var platform = $(".platform > .option");
var interface = $(".interface > .option");
var processor = $(".processor > .option");

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
  var userOsOption = document.getElementById(opts.os);
  var userPlatformOption = document.getElementById(opts.platform);
  var userInterfaceOption = document.getElementById(opts.interface);
  var userProcessorOption = document.getElementById(opts.processor);

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
function disableUnsupportedPlatforms(infomap, category1, val1, category2, val2, category3, val3) {
  for (const [arch_key, info] of infomap) {
    var elems = document.querySelectorAll('[id^="'+arch_key+'"]');
    if (elems == null) {
      console.log("Failed to find element for architecture " + arch_key);
      return;
    }
    for (var i=0; i < elems.length;i++) {
      var supported = info[category1].has(val1) && (category2 == null || info[category2].has(val2)) && (category3 == null || info[category3].has(val3));
      elems[i].style.textDecoration = supported ? "" : "line-through";
      if (!supported) {
        $(elems[i]).removeClass("option");
        $(elems[i]).addClass("option-unsupported");
      }
      else {
        $(elems[i]).removeClass("option-unsupported");
        $(elems[i]).addClass("option");
      }
    }
  }
}

function selectedOption(option, selection, category) {
  if (selection.classList.contains("option")) {
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
      else if (selection.id !== "colab") {
        for (var i = 0; i < interface_elements.length; i++) {
          if (interface_elements[i].classList.contains("option-unsupported")) {
            $(interface_elements[i]).removeClass("option-unsupported");
            $(interface_elements[i]).addClass("option");
          }
        }
      }
    }
  }
  console.log(    opts.processor.toLowerCase() +
  "," +
  opts.interface.toLowerCase() +
  "," +
  opts.os.toLowerCase() +
  "," +
  opts.platform.toLowerCase())
  commandMessage(buildMatcher());
  disableUnsupportedPlatforms(archInterfaceMap,"platforms",opts.platform);
  disableUnsupportedPlatforms(archProcessorMap,"platforms",opts.platform, "interface",opts.interface, "oss",opts.os);
  if (selection.classList.contains("option")) {
    $("#command").addClass("command-container-matched");
    setTimeout(function() {
      $("#command").removeClass("command-container-matched");
    }, 500);
  }
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
  );
}

function commandMessage(key) {
  var object =   {
    "x86,gui,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/">https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/</a>', 
    "x86,gui,linux,cloud": 'To use Neurodesk hosted in JupyterLab, go to <a target="_blank" href="https://play.neurodesk.org/">https://play.neurodesk.org/</a><br />To host Neurodesk yourself on a cloud provider, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/">https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/</a><br />To use Neurodesk hosted in Nectar (only available for Australian researchers), go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/nectar/">https://www.neurodesk.org/docs/getting-started/neurodesktop/nectar/</a>',
    "x86,gui,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/">https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,gui,macos,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/mac/">https://www.neurodesk.org/docs/getting-started/neurodesktop/mac/</a>', 
    "x86,gui,macos,cloud": 'To use Neurodesk hosted in JupyterLab, go to <a target="_blank" href="https://play.neurodesk.org/">https://play.neurodesk.org/</a><br />To host Neurodesk yourself on a cloud provider, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/">https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/</a><br />To use Neurodesk hosted in Nectar (only available for Australian researchers), go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/nectar/">https://www.neurodesk.org/docs/getting-started/neurodesktop/nectar/</a>',
    "x86,gui,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/">https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,gui,windows,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/windows/">https://www.neurodesk.org/docs/getting-started/neurodesktop/windows/</a>', 
    "x86,gui,windows,cloud": 'To use Neurodesk hosted in JupyterLab, go to <a target="_blank" href="https://play.neurodesk.org/">https://play.neurodesk.org/</a><br />To host Neurodesk yourself on a cloud provider, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/">https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/</a><br />To use Neurodesk hosted in Nectar (only available for Australian researchers), go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/nectar/">https://www.neurodesk.org/docs/getting-started/neurodesktop/nectar/</a>',
    "x86,gui,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/">https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/</a> <br /> Then access graphical interface with X11 forwarding', 
    "x86,cmd,macos,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocommand/linux/">https://www.neurodesk.org/docs/getting-started/neurocommand/linux/</a>', 
    "x86,cmd,macos,cloud":'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/">https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/</a>', 
    "x86,cmd,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/">https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/</a>', 
    "x86,cmd,windows,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/windows/">https://www.neurodesk.org/docs/getting-started/neurocommand/windows/</a>', 
    "x86,cmd,windows,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/">https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/</a>', 
    "x86,cmd,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/">https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/</a>',
    "x86,cmd,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocommand/linux/">https://www.neurodesk.org/docs/getting-started/neurocommand/linux/</a>', 
    "x86,cmd,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/">https://www.neurodesk.org/docs/getting-started/neurodesktop/cloud/</a>', 
    "x86,cmd,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/">https://www.neurodesk.org/docs/getting-started/neurodesktop/hpc/</a>',
    "x86,container,windows,local": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/">https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/</a>',
    "x86,container,windows,hpc": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/">https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/</a>',
    "x86,container,windows,cloud": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/">https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/</a>',
    "x86,container,windows,colab": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/googlecolab/">https://www.neurodesk.org/docs/getting-started/neurocontainers/googlecolab/</a>', 
    "x86,container,macos,local": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/">https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/</a>',
    "x86,container,macos,hpc": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/">https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/</a>',
    "x86,container,macos,cloud": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/">https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/</a>',
    "x86,container,macos,colab": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/googlecolab/">https://www.neurodesk.org/docs/getting-started/neurocontainers/googlecolab/</a>', 
    "x86,container,linux,local": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/">https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/</a>',
    "x86,container,linux,hpc": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/">https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/</a>',
    "x86,container,linux,cloud": 'Choose one of the following instructions to access a single container:<br /> - To pull Docker container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/">https://www.neurodesk.org/docs/getting-started/neurocontainers/docker/</a><br /> - To download Singularity container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/</a><br /> - To mount Neurodesk container, go to <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/">https://www.neurodesk.org/docs/getting-started/neurocontainers/cvmfs/</a>',
    "x86,container,linux,colab": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/googlecolab/">https://www.neurodesk.org/docs/getting-started/neurocontainers/googlecolab/</a>', 
    "x86,vscode,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/">https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/</a>', 
    "x86,vscode,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/">https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/</a>', 
    "x86,vscode,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/">https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/</a>', 
    "x86,vscode,macos,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/">https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/</a>', 
    "x86,vscode,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/">https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/</a>', 
    "x86,vscode,macos,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/">https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/</a>', 
    "x86,vscode,windows,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/">https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/</a>', 
    "x86,vscode,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/">https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/</a>', 
    "x86,vscode,windows,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/">https://www.neurodesk.org/docs/getting-started/neurodesktop/visual-studio-code/</a>', 

    "gpu,container,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus</a>',
    "gpu,container,macos,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus</a>',
    "gpu,container,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus</a>',
    "gpu,container,windows,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus</a>',
    "gpu,container,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus</a>',
    "gpu,container,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus</a>',
    "gpu,container,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus">https://www.neurodesk.org/docs/getting-started/neurocontainers/singularity/#singularity-containers-and-gpus</a>',
    "gpu,cmd,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocommand/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurocommand/linux/#gpu-support</a>',
    "gpu,cmd,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocommand/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurocommand/linux/#gpu-support</a>',
    "gpu,cmd,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocommand/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurocommand/linux/#gpu-support</a>',
    "gpu,cmd,macos,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocommand/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurocommand/linux/#gpu-support</a>',
    "gpu,cmd,windows,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurocommand/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurocommand/linux/#gpu-support</a>',
    "gpu,gui,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support</a>', 
    "gpu,gui,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support</a><br /> Then access graphical interface with X11 forwarding', 
    "gpu,gui,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support</a><br /> Then access graphical interface with X11 forwarding', 
    "gpu,gui,linux,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support</a><br /> Then access graphical interface with X11 forwarding', 
    "gpu,gui,windows,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support</a>', 
    "gpu,gui,linux,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support</a>', 
    "gpu,gui,macos,cloud": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support</a>', 
    "gpu,cmd,windows,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support</a>', 
    "gpu,cmd,macos,hpc": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support">https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#gpu-support</a>', 

    "arm,gui,linux,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#1-optional-only-for-arm64-hardware">https://www.neurodesk.org/docs/getting-started/neurodesktop/linux/#1-optional-only-for-arm64-hardware</a>', 
    "arm,gui,macos,local": 'Follow the instruction at <br /> <a target="_blank" href="https://www.neurodesk.org/docs/getting-started/neurodesktop/mac/">https://www.neurodesk.org/docs/getting-started/neurodesktop/mac/</a>', 
  };

  if (!object.hasOwnProperty(key)) {
    $("#command").html(
      '<pre > Not yet available. Work in progress.</pre>'
    );
  }  else {
    $("#command").html('<pre><code>' + object[key] + "</code></pre>");
  }
}

/**
 * Options controller.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
// Extensions pages can all have access to the bacground page.
var bkg = chrome.extension.getBackgroundPage();

// When the DOM is loaded, make sure all the saved info is restored.
window.addEventListener('DOMContentLoaded', onLoad, false);

function $(id) {
  return document.getElementById(id);
}

/**
 * When the options window has been loaded.
 */
function onLoad() {
  onRestore();
  $('button-close').addEventListener('click', onClose, false);
  $('test-volume').addEventListener('click', onTestVolume, false);
}

/**
 *  When the options window is closed;
 */
function onClose() {
  window.close();
}

/**
 * Play test volume.
 */
function onTestVolume() {
  var volume = $('volume');
  var pitch = $('pitch');
  var speed = $('speed');
  bkg.controller.speak('Hello World', {
    volume: parseFloat(volume.value),
    pitch: parseFloat(pitch.value),
    speed: parseFloat(speed.value)
  });
}

/**
* Restore all options.
*/
function onRestore() {
  // Restore settings.
  $('version').innerHTML = ' Version ' + bkg.settings.version;
  setupRange('volume');
  setupRange('pitch');
  setupRange('speed');
}

function setupRange(name) {
  var element = $(name);
  element.addEventListener('change', function(e) {
    bkg.settings[name] = element.value;
    bkg.controller[name] = bkg.settings[name];
  });
  element.value = bkg.settings[name];
}
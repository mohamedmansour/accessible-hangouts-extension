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
  var volumeElement = $('volume');
  bkg.controller.speak('Hello, World', {volume: parseFloat(volumeElement.value)});
}

/**
* Restore all options.
*/
function onRestore() {
  // Restore settings.
  $('version').innerHTML = ' Version ' + bkg.settings.version;

  var volumeElement = $('volume');
  volumeElement.addEventListener('change', function(e) {
    bkg.settings.volume = volumeElement.value;
    bkg.controller.speechVolume = bkg.settings.volume;
  });
  volumeElement.value = bkg.settings.volume;
}
/**
 * Options controller.
 *
 * @author Mohamed Mansour 2011 (http://mohamedmansour.com)
 */

// Extensions pages can all have access to the bacground page.
var bkg = chrome.extension.getBackgroundPage();

// When the DOM is loaded, make sure all the saved info is restored.
window.addEventListener('load', onLoad, false);

function $(elt) {
  return document.getElementById(elt);
}

/**
 * When the options window has been loaded.
 */
function onLoad() {
  onRestore();
  onRenderGooglePlus();
  $('button-close').addEventListener('click', onClose, false);
  $('donate').addEventListener('click', onDonate, false);
  $('charity').addEventListener('click', onCharity, false);
  $('test-volume').addEventListener('click', onTestVolume, false);
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
 *  When the options window is closed;
 */
function onClose() {
  window.close();
}

function onDonate() {
  chrome.tabs.create({url: 'http://mohamedmansour.com/donate'});
}

function onCharity() {
  chrome.tabs.create({url: 'http://www.crowdrise.com/code-for-charity'});
}

function onRenderGooglePlus() {
  var script = document.createElement('script');
  script.src = 'https://apis.google.com/js/plusone.js';
  script.innerText = '{lang: "en"}';
  document.body.appendChild(script);
}

/**
* Restore all options.
*/
function onRestore() {
  // Restore settings.
  $('version').innerHTML = ' (v' + bkg.settings.version + ')';
  setupRange('volume');
  setupRange('pitch');
  setupRange('speed');
}

/**
 * Setup the range component.
 *
 * @param {string} name The name of the range.
 */
function setupRange(name) {
  var element = $(name);
  element.addEventListener('change', function(e) {
    bkg.settings[name] = element.value;
    bkg.controller[name] = bkg.settings[name];
  });
  element.value = bkg.settings[name];
}

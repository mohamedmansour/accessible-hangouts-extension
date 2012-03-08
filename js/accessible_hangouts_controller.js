/**
 * Injection script for content.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
 
function AccessibleHangoutsController() {
 
}

AccessibleHangoutsController.prototype.init = function() {
  chrome.extension.onRequest.addListener(this.onExternalRequest.bind(this));
};

/**
 * Listen on requests coming from content scripts.
 *
 * @param {object} request The request object to match data.
 * @param {object} sender The sender object to know what the source it.
 * @param {Function} sendResponse The response callback.
 */
AccessibleHangoutsController.prototype.onExternalRequest = function(request, sender, sendResponse) {
  if (request.method == 'Speak') {
    chrome.tts.speak(request.data, {enqueue: true});
  }
  sendResponse({});
};
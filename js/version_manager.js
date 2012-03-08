/**
 * Maintains the extensions versioning.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
VersionManager = function(controller) {
  this.controller = controller;
  this.currVersion = null;
  this.prevVersion = null;
};

/**
 * Triggered when the extension just loaded. Should be the first thing
 * that happens when chrome loads the extension.
 */
VersionManager.prototype.init = function() {
  this.currVersion = chrome.app.getDetails().version;
  this.prevVersion = settings.version;
  if (this.currVersion != this.prevVersion) {
    // Check if we just installed this extension.
    if (typeof this.prevVersion == 'undefined') {
      this.onInstall();
    } else {
      this.onUpdate(this.prevVersion, this.currVersion);
    }
    settings.version = this.currVersion;
  }
};

/**
 * Triggered when the extension just installed.
 */
VersionManager.prototype.onInstall = function() {
  chrome.tabs.create({url: 'options.html'});
};

/**
 * Triggered when the extension just uploaded to a new version. DB Migrations
 * notifications, etc should go here.
 *
 * @param {string} previous The previous version.
 * @param {string} current  The new version updating to.
 */
VersionManager.prototype.onUpdate = function(previous, current) {
};
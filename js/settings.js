/**
 * Global Settings.
 *
 * @author Mohamed Mansour 2012 (http://mohamedmansour.com)
 */
settings = {
  get version() {
    return localStorage['version'];
  },
  set version(val) {
    settings.notify('version', val);
    localStorage['version'] = val;
  },
  get opt_out() {
    var key = localStorage['opt_out'];
    return (typeof key == 'undefined') ? false : key === 'true';
  },
  set opt_out(val) {
    settings.notify('opt_out', val);
    localStorage['opt_out'] = val;
  },
  get volume() {
    var key = localStorage['volume'];
    return (typeof key == 'undefined') ? 1.0 : parseFloat(key);
  },
  set volume(val) {
    settings.notify('volume', val);
    localStorage['volume'] = val;
  },
  get speed() {
    var key = localStorage['speed'];
    return (typeof key == 'undefined') ? 1.0 : parseFloat(key);
  },
  set speed(val) {
    settings.notify('speed', val);
    localStorage['speed'] = val;
  },
  get pitch() {
    var key = localStorage['pitch'];
    return (typeof key == 'undefined') ? 1.0 : parseFloat(key);
  },
  set pitch(val) {
    settings.notify('pitch', val);
    localStorage['pitch'] = val;
  }
};

// Settings event listeners.
settings.listeners = {};
settings.notify = function(key, val) {
  var listeners = settings.listeners[key]
  if (listeners) {
    listeners.forEach(function(callback, index) {
      callback(key, val);
    });
  }
};
settings.addListener = function(key, callback) {
  if (!settings.listeners[key]) {
    settings.listeners[key] = [];
  }
  settings.listeners[key].push(callback);
};
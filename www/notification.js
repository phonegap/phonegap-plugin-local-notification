/* global cordova:false */
/* globals window */

var argscheck = cordova.require('cordova/argscheck'),
    exec = cordova.require('cordova/exec'),
    utils = cordova.require('cordova/utils');

var Notification = function(title, options) {
    // require title parameter
    if (typeof title === 'undefined') {
        throw new Error('The title argument is required.');
    }

    options = options || {};
    var getValue = argscheck.getValue;

    this.permission = 'granted';
    this.title = getValue(title, '');
    this.dir = getValue(options.dir, 'auto');
    this.lang = getValue(options.lang, '');
    this.body = getValue(options.body, '');
    this.tag = getValue(options.tag, '');
    this.icon = getValue(options.icon, '');

    exec(function() {
        console.log('show success');
    }, function() {
        console.log('show error');
    }, 'LocalNotifications', 'show', [this.title, this.dir, this.lang, this.body, this.tag, this.icon]);
};

Notification.requestPermission = function(callback) {
    if (!callback) { callback = function() {}; }

    if (typeof callback !== 'function')  {
        console.log('Notification.requestPermission failure: callback parameter not a function');
        return;
    }

    exec(callback, function() {
        console.log('requestPermission error');
    }, 'LocalNotifications', 'requestPermission', []);
};

Notification.prototype.close = function() {
    exec(function() {
        console.log('close success');
    }, function() {
        console.log('close error');
    }, 'LocalNotifications', 'close', [this.tag]);
};

module.exports = Notification;

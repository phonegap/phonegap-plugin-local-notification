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
    this.onclick = function() {};
    this.onshow = function() {};
    this.onerror = function() {};
    this.onclose = function() {};

    // triggered on click, show, error and close
    var that = this;
    var success = function(result) {
        if (!result) {
            return;
        }

        if (result === 'show') {
            that.onshow();
        } else if (result === 'click') {
            that.onclick();
        }
    };

    var failure = function() {
        that.onerror();
    };

    exec(success, failure, 'LocalNotifications', 'show', [this.title, this.dir, this.lang, this.body, this.tag, this.icon]);
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
    var that = this;
    exec(function() {
        that.onclose();
    }, function() {
        that.onerror();
    }, 'LocalNotifications', 'close', [this.tag]);
};

module.exports = Notification;

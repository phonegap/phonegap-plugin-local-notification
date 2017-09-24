
phonegap-plugin-local-notification
------------------------

An implementation of the Web Notifications API for end-user notifications. The Local Notification plugin gives developers the ability to post notifications from their app that show up in the device’s notification area. The API for the local notification plugin follows the [W3C Web Notifications specification](https://www.w3.org/TR/notifications/).

## Platform Support
- iOS
- Android

## Installation

After you have built your project, install the plugin in your project location:
```
$ phonegap plugin add phonegap-plugin-local-notification
```

(or)
```
$ cordova plugin add phonegap-plugin-local-notification
```

## Usage
Please read through the [full API documentation here](https://github.com/phonegap/phonegap-plugin-local-notification/blob/master/docs/api.md). To show a new local notification add this code to your application’s JavaScript:

```js
if (“Notification” in window) {
  Notification.requestPermission(function (permission) {
    // If the user accepts, let’s create a notification
    if (permission === ‘granted’) {
      var notification = new Notification(“My title”, {
           tag: ‘message1’, 
           body: “My body” 
      }); 
      notification.onshow  = function() { console.log(‘show’); };
      notification.onclose = function() { console.log(‘close’); };
      notification.onclick = function() { console.log(‘click’); };
    }
  });
}
```

To close a local notification make this call in your application’s JavaScript:

```js
notification.close();
```

## Known Issues
- iOS requires that you specify the body for the notification. Without a title and a body the notification will not be shown.


## Contact Us
Your feedback is graciously accepted and appreciated!
Please submit your pull requests and issues here.

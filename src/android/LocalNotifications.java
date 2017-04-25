
package com.adobe.phonegap.notification;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.annotation.SuppressLint;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Random;

/**
* This class exposes methods in Cordova that can be called from JavaScript.
*/
public class LocalNotifications extends CordovaPlugin {

    private static final String TAG = "LocalNotifications";

    private static CallbackContext notificationContext;

     /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArry of arguments for the plugin.
     * @param callbackContext   The callback context from which we were invoked.
     */
    @SuppressLint("NewApi")
    public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "in local notifications");

        if (action.equals("show")) {
            Log.d(TAG, "action show");

            notificationContext = callbackContext;

            showNotification(args);

            PluginResult result = new PluginResult(PluginResult.Status.OK, "show");
            result.setKeepCallback(true);
            notificationContext.sendPluginResult(result);
        } else if (action.equals("close")) {
            NotificationManager mNotificationManager = (NotificationManager) cordova.getActivity().getSystemService(Context.NOTIFICATION_SERVICE);
            mNotificationManager.cancel(args.getString(0), 0);

            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
        } else if (action.equals("requestPermission")) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, "granted"));
        } else {
            Log.d(TAG, "return false");
            return false;
        }
        return true;
    }

    private void showNotification(JSONArray args) throws JSONException {
        // Get args
        String title = args.getString(0);
        String dir = args.getString(1);
        String lang = args.getString(2);
        String body = args.getString(3);
        String tag = args.getString(4);
        String icon = args.getString(5);

        Context context = cordova.getActivity();

        Intent notificationIntent = new Intent(context, NotificationHandlerActivity.class);
        notificationIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        notificationIntent.putExtra("tag", tag);

        int requestCode = new Random().nextInt();
        PendingIntent contentIntent = PendingIntent.getActivity(context, requestCode, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);


        // Build notifications
        NotificationCompat.Builder mBuilder =
                new NotificationCompat.Builder(context)
                        .setWhen(System.currentTimeMillis())
                        .setContentTitle(title)
                        .setContentText(body)
                        .setSmallIcon(context.getApplicationInfo().icon)
                        .setContentIntent(contentIntent)
                        .setAutoCancel(true);

        if (icon.startsWith("http://") || icon.startsWith("https://")) {
            Bitmap bitmap = getBitmapFromURL(icon);
            mBuilder.setLargeIcon(bitmap);
        }

        // Show notification
        NotificationManager mNotificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        mNotificationManager.notify(tag, 0, mBuilder.build());
    }

    private Bitmap getBitmapFromURL(String strURL) {
        try {
            URL url = new URL(strURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setConnectTimeout(15000);
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            return BitmapFactory.decodeStream(input);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void fireClickEvent(String tag) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, "click");
        result.setKeepCallback(true);
        notificationContext.sendPluginResult(result);
    }
}

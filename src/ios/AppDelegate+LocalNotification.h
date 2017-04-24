//
//  AppDelegate+LocalNotification.h
//

#import "AppDelegate.h"

@interface AppDelegate (notification)
-(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification;

@property (nonatomic, retain) NSDictionary  *launchNotification;

@end

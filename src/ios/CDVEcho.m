
#import <Cordova/CDV.h>

@interface CDVEcho : CDVPlugin
@end

@implementation CDVEcho

- (void)echo:(CDVInvokedUrlCommand*)command
{
    id message = [command.arguments objectAtIndex:0];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)echoAsyncHelper:(NSArray*)args
{
    [self.commandDelegate sendPluginResult:[args objectAtIndex:0] callbackId:[args objectAtIndex:1]];
}

- (void)echoAsync:(CDVInvokedUrlCommand*)command
{
    id message = [command.arguments objectAtIndex:0];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];

    [self performSelector:@selector(echoAsyncHelper:) withObject:[NSArray arrayWithObjects:pluginResult, command.callbackId, nil] afterDelay:0];
}

@end

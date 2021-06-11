#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>

// @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate> // original line
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate> // chad added for push notis 6/8/21

@property (nonatomic, strong) UIWindow *window;

@end

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTUtils.h>
#import <React/RCTImageLoader.h>
#import <React/RCTImageSource.h>
#elif __has_include("RCTBridge.h")
#import "RCTBridge.h"
#import "RCTConvert.h"
#import "RCTUtils.h"
#import "RCTImageLoader.h"
#import "RCTImageSource.h"
#else
#import "React/RCTBridge.h" // Required when used as a Pod in a Swift project
#import "React/RCTConvert.h"
#import "React/RCTUtils.h"
#import "React/RCTImageLoader.h"
#import "React/RCTImageSource.h"
#endif

#import "VkontakteSharing.h"

#if __has_include(<VKSdkFramework/VKSdkFramework.h>)
#import <VKSdkFramework/VKSdkFramework.h>
#else
#import "VKSdk.h"
#endif

#ifdef DEBUG
#define DMLog(...) NSLog(@"[VKSharing] %s %@", __PRETTY_FUNCTION__, [NSString stringWithFormat:__VA_ARGS__])
#else
#define DMLog(...) do { } while (0)
#endif

@implementation VkontakteSharing

@synthesize bridge = _bridge;

- (void)openShareDlg:(VKShareDialogController*)dialog resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    UIViewController* root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];

    [dialog setCompletionHandler:^(VKShareDialogController* dialog, VKShareDialogControllerResult result) {
         if (result == VKShareDialogControllerResultDone) {
             DMLog(@"onVkShareComplete");
             resolve(dialog.postId);
             // done
         } else if (result == VKShareDialogControllerResultCancelled) {
             DMLog(@"onVkShareCancel");
             reject(RCTErrorUnspecified, nil, RCTErrorWithMessage(@"canceled"));
         }
     }];

    [root presentViewController:dialog animated:YES completion:nil];
}

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(share:(NSDictionary*)data resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    DMLog(@"Open Share Dialog");
    if (![VKSdk initialized]) {
        reject(RCTErrorUnspecified, nil, RCTErrorWithMessage(@"VK SDK must be initialized first"));
        return;
    }

    NSArray<NSString*>* permissions = @[VK_PER_WALL];

    RCTImageSource* imageSource = [RCTConvert RCTImageSource:data[@"imageSource"]];
    if (imageSource) {
        permissions = [permissions arrayByAddingObject:VK_PER_PHOTOS];
    }

    VKSdk* sdk = [VKSdk instance];
    if (![sdk hasPermissions:permissions]) {
        reject(RCTErrorUnspecified, nil, RCTErrorWithMessage(@"Access denied: no access to call this method"));
        return;
    }

    VKShareDialogController* shareDialog = [VKShareDialogController new];
    shareDialog.text = [RCTConvert NSString:data[@"description"]];
    shareDialog.shareLink = [[VKShareLink alloc] initWithTitle:[RCTConvert NSString:data[@"linkText"]]
                                                          link:[RCTConvert NSURL:data[@"linkUrl"]]];
    shareDialog.dismissAutomatically = YES;

    if (imageSource && _bridge.imageLoader) {
        [_bridge.imageLoader loadImageWithURLRequest:imageSource.request callback:^(NSError* error, UIImage* image) {
             if (error) {
                 reject(RCTErrorUnspecified, nil, error);
                 return;
             }

             VKUploadImage* VKImage = [[VKUploadImage alloc] init];
             VKImage.sourceImage = image;
             shareDialog.uploadImages = @[VKImage];
             dispatch_async(self.methodQueue, ^{
                            [self openShareDlg:shareDialog resolver:resolve rejecter:reject];
                        });
         }];
    } else {
        [self openShareDlg:shareDialog resolver:resolve rejecter:reject];
    }
}

@end

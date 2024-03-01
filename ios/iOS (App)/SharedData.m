//
//  SharedData.m
//  SafariExtension (iOS)
//
//  Created by admin on 02.10.2023.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface
RCT_EXTERN_MODULE(SharedData, NSObject)
RCT_EXTERN_METHOD(setToken: (NSString*)token)
RCT_EXTERN_METHOD(getToken: (RCTResponseSenderBlock *)callback)

@end

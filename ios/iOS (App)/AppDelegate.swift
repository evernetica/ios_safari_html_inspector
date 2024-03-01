//
//  AppDelegate.swift
//  iOS (App)
//
//  Created by developer on 18.07.2023.
//

import UIKit
import UserNotifications
import React
import Firebase
import RNBranch


@main
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        Branch.setUseTestBranchKey(true)
        RNBranch.setDebug()
        RNBranch.enableLogging()
        RNBranch.initSession(launchOptions: launchOptions, isReferrable: true)
        // Override point for customization after application launch.
        return true
    }
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
      return RNBranch.application(app, open:url, options:options)
    }

    private func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
      return RNBranch.continue(userActivity)
    }
    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
            print("Failed to register for remote notifications with error: \(error)")
        }
    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate
        // Saves data if appropriate
        // See also `applicationDidEnterBackground:` method
      }

      // MARK: UISceneSession Lifecycle

}

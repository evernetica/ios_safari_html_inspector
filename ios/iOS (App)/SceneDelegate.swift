//
//  SceneDelegate.swift
//  iOS (App)
//
//  Created by developer on 18.07.2023.
//

import UIKit
import BranchSDK
import React
import RNBranch

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let _ = (scene as? UIWindowScene) else { return }
        if let userActivity = connectionOptions.userActivities.first {
                BranchScene.shared().scene(scene, continue: userActivity)
              } else if !connectionOptions.urlContexts.isEmpty {
                BranchScene.shared().scene(scene, openURLContexts: connectionOptions.urlContexts)
              }
    }
        func application(
            _ application: UIApplication,
            continue userActivity: NSUserActivity,
            restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
        ) -> Bool {
            return RCTLinkingManager.application(application, continue: userActivity, restorationHandler: restorationHandler)
        }
        public func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
            return RCTLinkingManager.application(app, open: url, options: options)
        }

    func sceneDidDisconnect(_ scene: UIScene) {
          // Called as scene is being released by the system
          // Happens shortly after the scene enters background, or when its session is discarded
          // Releases any resources associated with this scene that can be re-created the next time the scene connects
          // The scene may re-connect later, as its session was not neccessarily discarded (see `application:didDiscardSceneSessions` instead)
      }

      func sceneDidBecomeActive(_ scene: UIScene) {
          // Called when the scene has moved from an inactive state to an active state
          // Use this method to restart any tasks that were paused (or not yet started) when the scene was inactive
      }

      func sceneWillResignActive(_ scene: UIScene) {
          // Called when the scene will move from an active state to an inactive state
          // This may occur due to temporary interruptions (ex. an incoming phone call)
      }

      // Use this method to undo the changes made on entering the background
      func sceneWillEnterForeground(_ scene: UIScene) {
          // Called as the scene transitions from the background to the foreground
      }

      // Use `sceneDidEnterBackground` to save data and release shared resources
      // Can store enough scene-specific state information to restore the scene back to its current state
      func sceneDidEnterBackground(_ scene: UIScene) {
          // Called as the scene transitions from the foreground to the background

      }

      func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
            BranchScene.shared().scene(scene, continue: userActivity)
      }

      func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
            BranchScene.shared().scene(scene, openURLContexts: URLContexts)
          URLContexts.forEach({ context in
              RCTLinkingManager.application(UIApplication.shared, open: context.url)
          })
      }

}

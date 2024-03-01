//
//  SharedData.swift
//  SafariExtension (iOS)
//
//  Created by admin on 02.10.2023.
//

import Foundation
import React
import UIKit

@objc(SharedData)
class SharedData: NSObject {
    private var token: String = "123"

    @objc
    func constantsToExport() -> [AnyHashable : Any]! {
        return ["token": token]
    }

    @objc
    func setToken(_ val:String) -> Bool {
        self.token = val
        let defaults = UserDefaults(suiteName: "group.crew.dev")
        defaults?.set(val, forKey: "crewToken")
        defaults?.synchronize()
        return true
    }
    @objc
    func getToken(_ callback: @escaping RCTResponseSenderBlock)  {
        let defaults = UserDefaults(suiteName: "group.crew.dev")
        let token = defaults?.string(forKey: "crewToken")
        callback( [token as Any])
    }

  @objc
  static func requiresMainQueueSetup() -> Bool {
      return true
  }
}

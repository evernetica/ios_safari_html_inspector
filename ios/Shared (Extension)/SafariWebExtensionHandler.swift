//
//  SafariWebExtensionHandler.swift
//  Shared (Extension)
//
//  Created by developer on 18.07.2023.
//

import SafariServices
import os.log

let SFExtensionMessageKey = "message"

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {

    func beginRequest(with context: NSExtensionContext) {
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey]
        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@", message as! CVarArg)
        let defaults = UserDefaults(suiteName: "group.crew.dev")
        let token = defaults?.string(forKey: "crewToken")
        let response = NSExtensionItem()
        response.userInfo = [ SFExtensionMessageKey: [ "Response to": "getToken", "token": token  ] ]

        context.completeRequest(returningItems: [response], completionHandler: nil)
    }

}

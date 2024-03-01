import React

final class ReactNativeRemoteBridgeDelegate: NSObject, RCTBridgeDelegate {
    private let baseIpAddress: String
    
    init(baseIpAddress: String) {
        self.baseIpAddress = baseIpAddress
        
        super.init()
    }
    
    func sourceURL(for bridge: RCTBridge) -> URL {
        return URL(string: "http://\(baseIpAddress):8081/index.bundle?platform=ios")!
    }
}

final class ReactNativeLocalPackageBridgeDelegate: NSObject, RCTBridgeDelegate {
    static let bundleRoot = "index.ios"
    
    class func localBundleUrl() -> URL? {
        return Bundle.main.url(forResource:"main", withExtension:"jsbundle")
    }
    
    class func rctLocalBundleUrl() -> URL? {
        return Bundle.main.url(forResource:"index", withExtension:"ios")
    }
    
    func sourceURL(for bridge: RCTBridge) -> URL {
        return ReactNativeLocalPackageBridgeDelegate.rctLocalBundleUrl()
            ?? ReactNativeLocalPackageBridgeDelegate.localBundleUrl()
            ?? URL(fileURLWithPath: "")
    }
}

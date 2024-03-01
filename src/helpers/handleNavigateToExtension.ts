import {Alert, Linking} from "react-native";

const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 10000,
    },
};

export const navigateWithLinking = async (authToken: string, refreshToken: string, url: string, setIsOpenExt, BackgroundService, nativeModule) => {
    const supported = await Linking.canOpenURL(url);
    setIsOpenExt(true);
    const array = [authToken, refreshToken];
    await BackgroundService.start(async () => {
        await new Promise(async () => {
            setTimeout(() => {
                nativeModule.setToken(JSON.stringify(array));
            }, 5000);
        });
    }, options);
    if (supported) {
        await Linking.openURL(url);
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
};

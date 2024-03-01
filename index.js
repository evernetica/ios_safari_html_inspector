import {AppRegistry} from 'react-native';
import App from './src/App';

import 'react-native-gesture-handler';
import notifee from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";

async function onMessageReceived(notif) {
    const { type, purchaseAmount } = notif.data;
    if (type === 'import_completed') {
        const count = await notifee.getBadgeCount()
        await notifee.setBadgeCount(count + 1)
        notifee.displayNotification({
            title: 'Rate Your Purchases!',
            body: `Ready to review ${purchaseAmount} items? Your feedback counts!`,
        });
    }

}
messaging().registerDeviceForRemoteMessages();
messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

AppRegistry.registerComponent('YourApp', () => App);

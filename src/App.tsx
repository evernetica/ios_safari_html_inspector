/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import 'react-native-gesture-handler';
import FlashMessage from "react-native-flash-message";
import {AppState, Linking, NativeModules, StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import branch from "react-native-branch";
import {AppContextProvider} from "./AppContext";
import firestore from '@react-native-firebase/firestore';
import notifee from '@notifee/react-native';

const Stack = createStackNavigator();

async function resetBadgeCount() {
    try {
        await notifee.setBadgeCount(0);
        console.log('Badge count reset to 0');
    } catch (error) {
        console.error('Error resetting badge count:', error);
    }
}

function App(): JSX.Element {
    const [showInstruction, setShowInstruction] = useState(false)
    const [isButtonShown, setIsButtonShown] = useState(false)
    const [isOpenExt, setIsOpenExt] = useState(false)

    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const handleAppStateChange = async (nextAppState) => {
            if (appState === 'background' && nextAppState === 'active') {
                await resetBadgeCount();
            }
            setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, [appState]);

    useEffect(() => {
        resetBadgeCount();
    }, []);

    const nativeModule = NativeModules.SharedData;
    const getVersion = async () => {
        const version = '1.0.15'
        if (version) {
            const state = await firestore().collection('version').doc('versionStatus').get()
            setIsButtonShown(version !== state.data().version)
        }
    }


    const getDataFromFB = useCallback(async () => {
        try {
            const state = await firestore().collection('showButton').doc('buttonStatus').get()
            const instructionStatus = await firestore().collection('showButton').doc('showInstruction').get()
            setIsButtonShown(state.data().isShown)
            setShowInstruction(instructionStatus.data().isShown)
            getVersion()
        } catch (e) {
            console.log('firebesaerror');
            console.log(e);
        }

    }, [])

    useEffect(() => {
        getDataFromFB()
    }, [])

    branch.subscribe({
        onOpenStart: ({
                          uri,
                          cachedInitialEvent
                      }) => {
            console.log(
                'subscribe onOpenStart, will open ' +
                uri +
                ' cachedInitialEvent is ' +
                cachedInitialEvent,
            );
        },
        onOpenComplete: ({
                             error,
                             params,
                             uri
                         }) => {
            if (error) {
                console.error(
                    'subscribe onOpenComplete, Error from opening uri: ' +
                    uri +
                    ' error: ' +
                    error,
                );
                return;
            } else if (params) {
                if (!params['+clicked_branch_link']) {
                    if (params['+non_branch_link']) {
                        console.log('non_branch_link: ' + params['+non_branch_link']);
                        if (typeof params['+non_branch_link'] === 'string' && params['+non_branch_link'].includes('app-settings')) {
                            Linking.canOpenURL('app-settings:')
                                .then(supported => {
                                    Linking.openURL('app-settings:');
                                })
                                .catch(error => {
                                });
                        }

                        // Route based on non-Branch links
                        return;
                    }
                } else {
                    // Handle params
                    let deepLinkPath = params.$deeplink_path as string;
                    let canonicalUrl = params.$canonical_url as string;
                    // Route based on Branch link data
                    return
                }
            }
        },
    });
    const getParamsFromDeepLink = useCallback(async () => {

        let latestParams = await branch.getLatestReferringParams() // Params from last open
        let installParams = await branch.getFirstReferringParams() // Params from original install
        if (latestParams["~referring_link"]) {
            const originalString = installParams["~referring_link"]
            const substringToRemove = "https://www.google.com/";

            const resultString = originalString.replace(substringToRemove, '');
        }
        if (installParams["~referring_link"]) {
            const originalString = installParams["~referring_link"]
            const substringToRemove = "https://www.google.com/";

        }
    }, [branch, branch.getFirstReferringParams, branch.getLatestReferringParams])
    useEffect(() => {
        getParamsFromDeepLink()
    })

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    };

    const value = useMemo(() => ({
        isButtonShown, setIsButtonShown,
        showInstruction,
        isOpenExt, setIsOpenExt,
    }), [
        isButtonShown, setIsButtonShown,
        showInstruction,
        isOpenExt, setIsOpenExt,
    ])
    return (
        <>
            <NavigationContainer>
                <AppContextProvider value={value}>
                    <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor={backgroundStyle.backgroundColor}
                    />
                    <Stack.Navigator initialRouteName="WelcomePage">
                        <Stack.Screen
                            name="WelcomePage"
                            component={WelcomePage}
                            options={{headerShown: false}}
                        />
                    </Stack.Navigator>
                </AppContextProvider>
            </NavigationContainer>
            <FlashMessage position={"bottom"}/>
        </>
    );
}

export default App;

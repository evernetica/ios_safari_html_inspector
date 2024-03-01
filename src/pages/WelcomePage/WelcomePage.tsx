import React, {useCallback} from "react";
import {Block} from '../../components/simpleComponents/Block';
import {Text} from '../../components/simpleComponents/Text';
import {colors} from '../../components/colors';
import ArrowRight from '../../../assets/icons/ArrowRight.svg';
import BG from '../../../assets/images/WelcomeBgImage.png';
import {Button} from "../../components/simpleComponents/Button";
import {Alert, ImageBackground, Linking} from 'react-native';
import {useAppContext} from "../../AppContext";
import BackgroundService from "react-native-background-actions";

const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://',
    parameters: {
        delay: 10000,
    },
};

const WelcomePage = () => {
    const {
        setIsOpenExt,
    } = useAppContext();
    const url = 'https://www.google.com/';
    const handleNavigate = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        setIsOpenExt(true);
        await BackgroundService.start(async () => {
            await new Promise(async () => {
                setTimeout(() => {
                    setIsOpenExt(false);
                }, 3000)
            });
        }, options);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, []);

    return (
        <ImageBackground
            source={BG}
            style={{
                width: '100%',
                flex: 1,
                paddingTop: 90,
                alignItems: 'center',
                position: 'relative'
            }}
        >
            <Block display={'flex'} alignItems={'center'} position={'absolute'} top={'0px'} left={'0px'} right={'0px'}
                   bottom={'0px'} bg={'rgba(0, 0, 0, 0.5)'}>
                <Block
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    marginTop={'60px'}
                    marginBottom={'200px'}
                >
                    <Text
                        fontFamily={'Helvetica'}
                        fontSize={22}
                        fontWeight={400}
                        color={colors.white}
                        paddingLeft={'10px'}
                    >
                        Safary extension
                    </Text>
                </Block>
                <Block paddingTop={65}>
                    <Text
                        fontFamily={'Helvetica'}
                        fontSize={35}
                        fontWeight={700}
                        textAlign={'center'}
                        paddingTop={22}
                        color={colors.white}
                    >
                        {["HTMLSnapshot"]}
                    </Text>
                </Block>
                <Button
                    borderRadius={10}
                    display={'flex'}
                    justifyContent={'center'}
                    marginTop={'55px'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    bg={colors.white}
                    paddingHorizontal={'15px'}
                    paddingVertical={'15px'}
                    onPress={handleNavigate}
                >
                    <Text
                        fontFamily={'Helvetica'}
                        textAlign={'center'}
                        fontSize={20}
                        fontWeight={400}
                        color={colors.black}
                        paddingRight={'10px'}
                    >
                        Get Started
                    </Text>
                </Button>
            </Block>
        </ImageBackground>
    )
};

export default WelcomePage;

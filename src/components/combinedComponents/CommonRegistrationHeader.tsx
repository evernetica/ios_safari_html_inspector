import React from 'react';

import {Block} from '../simpleComponents/Block';
import {Button} from '../simpleComponents/Button';
import {Text} from "../simpleComponents/Text";
import {colors} from '../colors';
import ArrowLeft from '../../../assets/icons/arrow-left.svg';
import {useNavigation} from "@react-navigation/native";

export const CommonRegistrationHeader = ({
       title,
   }) => {
    const navigation = useNavigation();

    return (
        <Block
            bg={'white'}
            alignItems={'center'}
            justifyContent={'center'}
            paddingTop={'10px'}
        >
            <Block
                alignItems={'center'}
                justifyContent={'center'}
                position={'absolute'}
                left={10}
                top={7}
            >
                <Button onPress={() => navigation.goBack()}>
                    <ArrowLeft width={30} height={30}/>
                </Button>
            </Block>
            <Text
                fontSize={20}
                textAlign={'center'}
                fontWeight={700}
                color={colors.black}
                fontFamily={'Helvetica'}
                paddingBottom={40}
            >
                {title}
            </Text>
        </Block>
    );
};

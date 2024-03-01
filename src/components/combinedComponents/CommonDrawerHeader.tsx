import React from 'react';

import {Block} from '../simpleComponents/Block';
import {Button} from '../simpleComponents/Button';
import {Text} from "../simpleComponents/Text";
import {colors} from '../colors';
import ArrowLeft from '../../../assets/icons/arrow-left.svg';

export const CommonDrawerHeader = ({
    hasBackButton,
    handleBackButtonPress,
    hasNext,
    handleNext,
    title,
    hideTitle,
    }) => {
    return (
        <Block
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            minHeight={"40px"}
            width={'100%'}
            paddingTop={'10px'}
            paddingHorizontal={'16px'}
            marginBottom={'40px'}
        >
            <Block flex={1} alignItems={'flex-start'}>
                {hasBackButton && (
                    <Button onPress={handleBackButtonPress}>
                        <ArrowLeft width={30} height={30}/>
                    </Button>
                )}
            </Block>
            <Block flex={1} alignItems={'center'} width={'100%'}>
                {!hideTitle && <Text fontSize={20} textAlign={'center'} fontWeight={700} color={colors.black}>{title}</Text>}
            </Block>
            <Block flex={1} alignItems={"flex-end"}>
                {hasNext && (
                    <Button onPress={handleNext}>
                        <Text fontSize={16} fontWeight={400} color={colors.lightGrey}>
                            Skip
                        </Text>
                    </Button>
                )}
            </Block>
        </Block>
    );
};

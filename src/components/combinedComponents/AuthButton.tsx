import React from 'react';
import {Block} from "../../components/simpleComponents/Block";
import {colors} from "../../components/colors";
import {Button} from "../../components/simpleComponents/Button";
import {Text} from "../../components/simpleComponents/Text";


const AuthButton = ({ icon: Icon, handleFunction, title }) => {
    return (
        <Block paddingHorizontal={'16px'} paddingTop={'16px'}>
            <Block position={'absolute'} top={'26px'} left={'35px'} width={'20px'} height={'20px'} zIndex={999}>
                <Icon height={25} width={25}/>
            </Block>
            <Block borderWidth={1} borderColor={colors.black} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                <Button onPress={handleFunction} width={'100%'} height={'43px'} bg={colors.white} justifyContent={'center'} alignItems={'center'} zIndex={99}>
                    <Text fontFamily={'Helvetica'} color={colors.black} fontWeight={700}>{title}</Text>
                </Button>
            </Block>
        </Block>
    );
};

export default AuthButton;

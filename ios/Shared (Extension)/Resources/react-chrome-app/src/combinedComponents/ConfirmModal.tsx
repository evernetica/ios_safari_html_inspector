import React from "react";
import {Block} from "../commonComponents/Block";


// @ts-ignore
const ConfirmModal = ({confirmHandler, rejectHandler}) => {

    return (
        <Block position={'fixed'} bg={'rgba(0,0,0,0.7)'} top={'0px'} right={'0px'} width={'100%'} height={'100vh'}
               zIndex={9999999999999} display={'flex'}>
            <Block width={'80%'} bg={'white'} height={'35%'} mr={'auto'} ml={'auto'} mt={'auto'} mb={'auto'} borderRadius={'20px'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <p  ref={(el) => el?.style.setProperty('font-family', 'Inter', 'important')}
                    style={{
                    WebkitTextFillColor: '#5E6B76',
                    lineHeight: '19px',
                    marginTop: '5px',
                    marginBottom: 0,
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    whiteSpace: 'nowrap'
                }}>Are you sure?</p>
                <Block mt={'20px'} width={'80%'} padding={'10px'} border={'1px solid #000'} borderRadius={'10px'} display={'flex'} justifyContent={'center'} alignItems={'center'} onClick={confirmHandler}>
                    <p  ref={(el) => el?.style.setProperty('font-family', 'Inter', 'important')}
                        style={{
                        WebkitTextFillColor: '#000',
                        lineHeight: '17px',
                        marginBottom: 0,
                        marginTop: 0,
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        whiteSpace: 'nowrap'
                    }}>Yes</p>
                </Block>
                <Block mt={'25px'} width={'80%'} padding={'10px'} border={'1px solid #000'} borderRadius={'10px'} display={'flex'} justifyContent={'center'} alignItems={'center'} onClick={rejectHandler}>
                    <p  ref={(el) => el?.style.setProperty('font-family', 'Inter', 'important')}
                        style={{
                        WebkitTextFillColor: '#000',
                        lineHeight: '17px',
                        marginBottom: 0,
                        marginTop: 0,
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        whiteSpace: 'nowrap'
                    }}>No</p>
                </Block>
            </Block>
        </Block>
    )
}

export default ConfirmModal;

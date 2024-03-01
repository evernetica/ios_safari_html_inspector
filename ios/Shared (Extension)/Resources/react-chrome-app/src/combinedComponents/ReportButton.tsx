//@ts-nocheck
import React from 'react';
import {Block} from "../commonComponents/Block";

export const ReportButton = ({title, mt, handler, isClicked}) => {
    return (
        <Block display={'flex'} width={'80%'} mt={mt} justifyContent={'center'} alignItems={'center'}
               padding={'15px 10px'} border={'1px solid rgba(0,0,0,0.5)'} borderRadius={'30px'} ml={'auto'}
               mr={'auto'} onClick={handler} bg={isClicked ? 'rgba(0, 0, 0, 0.3)' : 'transparent'}>
            <p  ref={(el) => el?.style.setProperty('font-family', 'Inter', 'important')}
                style={{
                WebkitTextFillColor: 'rgb(275, 74, 79)',
                lineHeight: '18px',
                fontWeight: 400,
                marginBottom: 0,
                marginTop: 0,
                marginLeft: 5,
                fontFamily: 'Inter',
                fontSize: '16px',
            }}>{title}</p>
        </Block>
    );
};
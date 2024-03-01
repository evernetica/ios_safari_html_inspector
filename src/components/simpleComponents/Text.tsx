import React, {FC} from 'react';
import styled from 'styled-components/native';
import {TextProps} from 'react-native';

export type CustomTextProps = {
  color?: string;
  minHeight?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
  marginTop?: string | number | undefined;
  marginBottom?: string | number | undefined;
  marginLeft?: string | number | undefined;
  marginRight?: string | number | undefined;
  paddingTop?: string | undefined;
  paddingBottom?: string | undefined;
  paddingLeft?: string | undefined;
  paddingRight?: string | undefined;
} & TextProps;

const StyledText = styled.Text<CustomTextProps>`
  color: ${({color}) => color || '#000'};
  font-size: ${({fontSize}) => fontSize || 14}px;
  font-weight: ${({fontWeight}) => fontWeight || 'normal'};
  font-style: ${({fontStyle}) => fontStyle || 'normal'};
  font-family: ${({fontFamily}) => fontFamily || 'Helvetica'};
  text-align: ${({textAlign}) => textAlign || 'auto'};
  text-decoration-line: ${({textDecorationLine}) =>
    textDecorationLine || 'none'};

  ${({marginTop}): string | number | undefined =>
    marginTop && `margin-top: ${marginTop}`};

  ${({marginBottom}): string | number | undefined =>
    marginBottom && `margin-bottom: ${marginBottom}`};

  ${({marginLeft}): string | number | undefined =>
    marginLeft && `margin-left: ${marginLeft}`};

  ${({marginRight}): string | number | undefined =>
    marginRight && `margin-right: ${marginRight}`};

  ${({paddingTop}): string | undefined =>
    paddingTop && `padding-top: ${paddingTop}`};

  ${({paddingBottom}): string | undefined =>
    paddingBottom && `padding-bottom: ${paddingBottom}`};

  ${({paddingLeft}): string | undefined =>
    paddingLeft && `padding-left: ${paddingLeft}`};

  ${({paddingRight}): string | undefined =>
    paddingRight && `padding-right: ${paddingRight}`};
  ${({width}): string | undefined => width && `width: ${width}`};
  ${({minHeight}): string | undefined => minHeight && `min-height: ${minHeight}`};
`;

export const Text: FC<CustomTextProps> = ({children, ...rest}) => (
  <StyledText {...rest}>{children}</StyledText>
);

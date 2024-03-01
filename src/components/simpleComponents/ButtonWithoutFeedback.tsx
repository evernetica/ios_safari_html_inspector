import React, {FC} from 'react';
import styled from 'styled-components/native';
import {BlockInterface} from './Block';

type ButtonInterface = BlockInterface & {
    onPress: () => void;
    shadowColor?: string;
    shadowOffset?: {height: number; width: number};
    shadowOpacity?: number;
    shadowRadius?: string;
    elevation?: number;
    opacity?: string;
    children: React.ReactNode;
    boxShadow?: string;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    borderRadius?: number;
    disabled?: boolean;
};

const StyledButton = styled.TouchableOpacity<ButtonInterface>`
  
  ${({width}): string | undefined => width && `width: ${width}`};
  ${({height}): string | undefined => height && `height: ${height}`};
  ${({marginRight}): string | number | undefined => marginRight && `marginRight: ${marginRight}`};
  ${({marginLeft}): string | number | undefined => marginLeft && `marginLeft: ${marginLeft}`};
  ${({marginBottom}): string | number | undefined => marginBottom && `marginBottom: ${marginBottom}`};
  ${({marginTop}): string | number | undefined => marginTop && `marginTop: ${marginTop}`};
  ${({position}): string | undefined => position && `position: ${position}`};
  ${({top}): string | undefined => top && `top: ${top}`};
  ${({left}): string | undefined => left && `left: ${left}`};
  ${({right}): string | undefined => right && `right: ${right}`};
  ${({bottom}): string | undefined => bottom && `bottom: ${bottom}`};
  ${({borderRadius}): string | number | undefined =>
    borderRadius && `borderRadius: ${borderRadius}px`};
  ${({bg}): string | undefined => bg && `background-color: ${bg}`};
  ${({flexDirection}): string | undefined =>
    flexDirection && `flex-direction: ${flexDirection}`};
  ${({flexWrap}): string | undefined => flexWrap && `flex-wrap: ${flexWrap}`};
  ${({flex}): string | undefined =>
    typeof flex === 'number' || typeof flex === 'string'
        ? `flex: ${flex}`
        : undefined};
  ${({justifyContent}): string | undefined =>
    justifyContent && `justify-content: ${justifyContent}`};
  ${({alignItems}): string | undefined =>
    alignItems && `alignItems: ${alignItems}`};
  ${({alignSelf}): string | undefined =>
    alignSelf && `align-self: ${alignSelf}`};
  ${({shadowColor}): string | undefined =>
    shadowColor && `shadow-color: ${shadowColor}`};
  ${({opacity}): string | undefined => opacity && `opacity: ${opacity}`};
  ${({shadowOpacity}): string | 0 | undefined =>
    shadowOpacity && `shadow-opacity: ${shadowOpacity}`};
  ${({shadowRadius}): number | undefined =>
    shadowRadius && `shadow-radius: ${shadowRadius}`};
  ${({boxShadow}): string | undefined =>
    boxShadow && `box-shadow: ${boxShadow}`};
  ${({elevation}): string | 0 | undefined =>
    elevation && `elevation: ${elevation}`};
  ${({ borderColor }): string | undefined => borderColor && `borderColor: ${borderColor}`};
  ${({ borderWidth }): string | undefined => borderWidth && `borderWidth: ${borderWidth}`};
  ${({paddingHorizontal}): string | undefined =>
    paddingHorizontal && `padding-horizontal: ${paddingHorizontal}`};
  ${({paddingVertical}): string | undefined =>
    paddingVertical && `padding-vertical: ${paddingVertical}`};
  ${({borderBottomColor, borderBottomWidth}): string | undefined =>
    borderBottomColor &&
    borderBottomWidth &&
    `border-bottom-color: ${borderBottomColor}; border-bottom-width: ${borderBottomWidth}`};
`;

let disabled = false;
export const ButtonWithoutFeedback: FC<ButtonInterface> = ({children, onPress, ...rest}) => {
    const callPress = () => {
        if (!disabled) {
            onPress();
            disabled = true;
        }
        setTimeout(() => {
            disabled = false;
        }, 500);
    };
    return (
        <StyledButton onPress={callPress} {...rest}>
            {children}
        </StyledButton>
    );
};

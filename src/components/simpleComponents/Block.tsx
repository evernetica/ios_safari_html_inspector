import React, {FC, SyntheticEvent} from 'react';
import styled from 'styled-components/native';

export type BlockInterface = {
  display?: string;
  active?: boolean;
  width?: string;
  height?: string;
  borderRad?: string;
  bg?: string;
  flexDirection?: string;
  flexWrap?: string;
  justifyContent?: string;
  alignItems?: string;
  alignSelf?: string;
  flex?: number;
  opacity?: string;
  borderBottomColor?: string;
  borderBottomWidth?: string;
  borderTopColor?: string;
  borderTopWidth?: string;
  border?: string;
  children?: React.ReactNode;
  position?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
  transform?: string;
  borderWidth?: string;
  borderColor?: string;
  paddingHorizontal?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingLeft?: string;
  paddingVertical?: string;
  borderStyle?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  minHeight?: string;
  onLayout?: (value: SyntheticEvent) => void;
  translateY?: string;
  translateX?: string;
  minWid?: string;
  maxWid?: string;
  boxShadow?: string;
  shadowColor?: string;
  shadowOffset?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  overflow?: string;
  maxHt?: string;
};

const StyledBlock = styled.View<BlockInterface>`
  ${({width}): string | undefined => width && `width: ${width}`};
  ${({height}): string | undefined => height && `height: ${height}`};
  ${({marginRight}): string | number | undefined => marginRight && `marginRight: ${marginRight}`};
  ${({marginLeft}): string | number | undefined => marginLeft && `marginLeft: ${marginLeft}`};
  ${({marginBottom}): string | number | undefined => marginBottom && `marginBottom: ${marginBottom}`};
  ${({marginTop}): string | number | undefined => marginTop && `marginTop: ${marginTop}`};
  ${({minHeight}): string | undefined =>
  minHeight && `min-height: ${minHeight}`};
  ${({minWid}): string | undefined => minWid && `min-width: ${minWid}`};
  ${({maxWid}): string | undefined => maxWid && `max-width: ${maxWid}`};
  ${({maxHt}): string | undefined => maxHt && `max-height: ${maxHt}`};
  ${({border}): string | undefined => border && `border: ${border}`};
  ${({borderRad}): string | undefined =>
      borderRad && `border-radius: ${borderRad}`};
  ${({borderRadius}): string | number | undefined =>
      borderRadius && `borderRadius: ${borderRadius}px`};
  ${({bg}): string | undefined => bg && `background-color: ${bg}`};
  ${({ display }): string | undefined => display && `display: ${display}`};
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
  ${({opacity}): string | undefined => opacity && `opacity: ${opacity}`};
  ${({position}): string | undefined => position && `position: ${position}`};
  ${({top}): string | undefined => top && `top: ${top}`};
  ${({left}): string | undefined => left && `left: ${left}`};
  ${({right}): string | undefined => right && `right: ${right}`};
  ${({bottom}): string | undefined => bottom && `bottom: ${bottom}`};
  ${({boxShadow}): string | undefined =>
  boxShadow && `box-shadow: ${boxShadow}`};
  ${({shadowColor}): string | undefined =>
  shadowColor && `shadow-color: ${shadowColor}`};
  ${({opacity}): string | undefined => opacity && `opacity: ${opacity}`};
  ${({boxShadow}): string | undefined =>
  boxShadow && `box-shadow: ${boxShadow}`};
  ${({borderColor}): string | undefined =>
  borderColor && `border-color: ${borderColor}`};
  ${({transform}): string | undefined =>
  transform && `transform: ${transform}`};
  ${({translateY, translateX}): string | undefined =>
  (translateX || translateY) &&
  `transform:${(translateX && ` translateX(${translateX})`) || ''} ${
    (translateY && ` translateY(${translateY})`) || ''
  }`};
  ${({borderBottomColor, borderBottomWidth}): string | undefined =>
  borderBottomColor &&
  borderBottomWidth &&
  `border-bottom-color: ${borderBottomColor}; border-bottom-width: ${borderBottomWidth}`};
  ${({borderTopColor, borderTopWidth}): string | undefined =>
  borderTopColor &&
  borderTopWidth &&
  `border-top-color: ${borderTopColor}; border-top-width: ${borderTopWidth}`};
  ${({paddingHorizontal}): string | undefined =>
  paddingHorizontal && `padding-horizontal: ${paddingHorizontal}`};
  ${({paddingVertical}): string | undefined =>
  paddingVertical && `padding-vertical: ${paddingVertical}`};
  ${({paddingTop}): string | undefined =>
  paddingTop && `paddingTop: ${paddingTop}`};
  ${({paddingBottom}): string | undefined =>
  paddingBottom && `paddingBottom: ${paddingBottom}`};
  ${({paddingRight}): string | undefined =>
  paddingRight && `paddingRight: ${paddingRight}`};
  ${({paddingLeft}): string | undefined =>
  paddingLeft && `paddingLeft: ${paddingLeft}`};
  ${({borderStyle}): string | undefined =>
  borderStyle && `border-style: ${borderStyle}`};
  ${({overflow}): string | undefined => overflow && `overflow: ${overflow}`};
`;

export const Block: FC<BlockInterface> = ({children, ...rest}) => (
  <StyledBlock {...rest}>{children}</StyledBlock>
);

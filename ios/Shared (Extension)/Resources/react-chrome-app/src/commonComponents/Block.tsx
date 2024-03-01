import React, { FC, SyntheticEvent } from "react";
import styled from "styled-components";
import { MarginTypes, PaddingTypes } from "./commonInterfaces";
import { marginStyles, paddingStyles } from "./commonStyles";

export type BlockInterface = MarginTypes &
  PaddingTypes & {
    active?: boolean;
    width?: string;
    height?: string;
    display?: string;
    borderRadius?: string;
    bg?: string;
    flexDirection?: string;
    flexWrap?: string;
    justifyContent?: string;
    justifySelf?: string;
    alignItems?: string;
    alignSelf?: string;
    flex?: number | undefined;
    opacity?: string;
    borderBottomColor?: string;
    borderBottomWidth?: string;
    borderTopColor?: string;
    borderTopWidth?: string;
    children?: React.ReactNode | FC;
    position?: string;
    gap?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    zIndex?: number;
    transform?: string;
    borderWidth?: string;
    borderColor?: string;
    paddingHorizontal?: string;
    paddingVertical?: string;
    borderStyle?: string;
    minHeight?: string;
    onLayout?: (value: SyntheticEvent) => void;
    onClick?: (value: SyntheticEvent) => void;
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
    overflowY?: string;
    maxHt?: string;
    webkitOverflowScrolling?: string;
    id?: string;
    borderBottom?: string;
    border?: string;
    padding?: string;
    borderTopStyle?: string;
    webkitBoxShadow?: string;
    borderTop?: string;
  };

const StyledBlock = styled.div<BlockInterface>`
  ${marginStyles};
  ${paddingStyles};
  ${({ width }): string | undefined => width && `width: ${width}`};
  ${({ height }): string | undefined => height && `height: ${height}`};
  ${({ minHeight }): string | undefined => minHeight && `min-height: ${minHeight}`};
  ${({ minWid }): string | undefined => minWid && `min-width: ${minWid}`};
  ${({ maxWid }): string | undefined => maxWid && `max-width: ${maxWid}`};
  ${({ maxHt }): string | undefined => maxHt && `max-height: ${maxHt}`};
  ${({ borderRadius }): string | undefined => borderRadius && `border-radius: ${borderRadius}`};
  ${({ bg }): string | undefined => bg && `background-color: ${bg}`};
  ${({ flexDirection }): string | undefined => flexDirection && `flex-direction: ${flexDirection}`};
  ${({ flexWrap }): string | undefined => flexWrap && `flex-wrap: ${flexWrap}`};
  ${({ flex }) => (flex || flex === 0) && `flex: ${flex}`};
  ${({ justifyContent }): string | undefined =>
    justifyContent && `justify-content: ${justifyContent}`};
  ${({ justifySelf }): string | undefined =>
          justifySelf && `justify-self: ${justifySelf}`};
  ${({ alignItems }): string | undefined => alignItems && `align-items: ${alignItems}`};
  ${({ alignSelf }): string | undefined => alignSelf && `align-self: ${alignSelf}`};
  ${({ opacity }): string | undefined => opacity && `opacity: ${opacity}`};
  ${({ position }): string | undefined => position && `position: ${position}`};
  ${({ gap }): string | undefined => gap && `gap: ${gap}`};
  ${({ top }): string | undefined => top && `top: ${top}`};
  ${({ left }): string | undefined => left && `left: ${left}`};
  ${({ right }): string | undefined => right && `right: ${right}`};
  ${({ bottom }): string | undefined => bottom && `bottom: ${bottom}`};
  ${({ zIndex }) => zIndex && `z-index: ${zIndex}`};
  ${({ boxShadow }): string | undefined => boxShadow && `box-shadow: ${boxShadow}`};
  ${({ shadowColor }): string | undefined => shadowColor && `shadow-color: ${shadowColor}`};
  ${({ opacity }): string | undefined => opacity && `opacity: ${opacity}`};
  ${({ shadowOpacity }) => shadowOpacity && `shadow-opacity: ${shadowOpacity}`};
  ${({ shadowRadius }) => shadowRadius && `shadow-radius: ${shadowRadius}`};
  ${({ boxShadow }): string | undefined => boxShadow && `box-shadow: ${boxShadow}`};
  ${({ borderWidth }): string | undefined => borderWidth && `border-width: ${borderWidth}`};
  ${({ borderColor }): string | undefined => borderColor && `border-color: ${borderColor}`};
  ${({ transform }): string | undefined => transform && `transform: ${transform}`};
  ${({ display }): string | undefined => display && `display: ${display}`};
  ${({ translateY, translateX }): string | undefined =>
    (translateX || translateY) &&
    `transform:${(translateX && ` translateX(${translateX})`) || ""} ${
      (translateY && ` translateY(${translateY})`) || ""
    }`};
  ${({ borderBottomColor }): string | undefined =>
    borderBottomColor &&
    `border-bottom-color: ${borderBottomColor}`};
  ${({borderBottomWidth }): string | undefined =>
          borderBottomWidth &&
          `border-bottom-width: ${borderBottomWidth}`};
  ${({ borderTopColor, borderTopWidth, borderTopStyle }): string | undefined =>
    borderTopColor &&
    borderTopWidth &&
    `border-top-color: ${borderTopColor}; border-top-width: ${borderTopWidth}; border-top-style: ${borderTopStyle}`};
  ${({ paddingHorizontal }): string | undefined =>
    paddingHorizontal && `padding-horizontal: ${paddingHorizontal}`};
  ${({ paddingVertical }): string | undefined =>
    paddingVertical && `padding-vertical: ${paddingVertical}`};
  ${({ padding }): string | undefined =>
    padding && `padding: ${padding}`};
  ${({ borderStyle }): string | undefined => borderStyle && `border-style: ${borderStyle}`};
  ${({ overflow }): string | undefined => overflow && `overflow: ${overflow}`};
  ${({ overflowY }): string | undefined => overflowY && `overflow-y: ${overflowY}`};
  ${({ webkitOverflowScrolling }): string | undefined => webkitOverflowScrolling && `-webkit-overflow-scrolling: ${webkitOverflowScrolling}`};
  ${({ webkitBoxShadow }): string | undefined => webkitBoxShadow && `-webkit-box-shadow: -1px -4px 13px 0px rgba(0,0,0,0.75);`};
  ${({ borderBottom }): string | undefined => borderBottom && `border-bottom: ${borderBottom}`};
  ${({ borderTop }): string | undefined => borderTop && `border-top: ${borderTop}`};
  ${({ border }): string | undefined => border && `border: ${border}`};
  
`;

export const Block: FC<BlockInterface> = ({ children, ...rest }) => (
  <StyledBlock {...rest}>{children}</StyledBlock>
);

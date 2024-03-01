import styled from 'styled-components';
import {marginStyles} from "./commonStyles";
import {MarginTypes} from "./commonInterfaces";

type TextInterface = MarginTypes & {
    width?: string;
    height?: string;
    lineHeight?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    children: string | number;
    fontWeight?: number | undefined
    textAlign?: string;
    letterSpacing?: string;
    textDecoration?: string;
    decColor?: string;
    overflow?: string;
    bg?: string;
    pr?: string;
    pl?: string;
    ellipsizeMode?: string;
    numberOfLines?: number;
    flexShrink?: number;
    textTransform?: string;
    pb?: string;
};

export const Text = styled.p<TextInterface>`
  ${marginStyles};
  ${({width}): string | undefined => width && `width: ${width}`};
  ${({fontWeight}) => fontWeight && `font-weight: ${fontWeight}`};
  ${({textAlign}): string | undefined => textAlign && `text-align: ${textAlign}`};
  ${({width}): string | undefined => width && `width: ${width}`};
  ${({height}): string | undefined => height && `height: ${height}`};
  ${({letterSpacing}): string | undefined => letterSpacing && `letter-spacing: ${letterSpacing}`};
  ${({lineHeight}): string | undefined => lineHeight && `line-height: ${lineHeight}`};
  ${({overflow}): string | undefined => overflow && `overflow: ${overflow}`};
  ${({bg}): string | undefined => bg && `background-color: ${bg}`};
  ${({pr}): string | undefined => pr && `padding-right: ${pr}`};
  ${({pl}): string | undefined => pl && `padding-left: ${pl}`};
  ${({pb}): string | undefined => pb && `padding-bottom: ${pb}`};
  ${({textDecoration, decColor}): string | undefined =>
          textDecoration &&
          `text-decoration: ${textDecoration}; text-decoration-color: ${decColor};`};
  color: ${({color}) => color && `"-webkit-text-fill-color": ${color};`};
  font-size: ${({fontSize}): string => fontSize || "14px"};
  font-family: ${({fontFamily}): string => fontFamily || "Roboto"};
  ${({textTransform}): string | undefined => textTransform && `text-transform: ${textTransform}`};
`

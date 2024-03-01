import React, {FC, SyntheticEvent, useEffect, useState} from "react";
import styled from "styled-components";
import {MarginTypes, PaddingTypes} from "./commonInterfaces";
import {marginStyles, paddingStyles} from "./commonStyles";

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
    maxHt?: string;
    objectFit?: string;
    // src: string;
    url: string;
    border?: string;
    padding?: string;
};

const StyledImage = styled.img<BlockInterface>`
  ${marginStyles};
  ${paddingStyles};
  ${({width}): string | undefined => width && `width: ${width}`};
  ${({height}): string | undefined => height && `height: ${height}`};
  ${({minHeight}): string | undefined => minHeight && `min-height: ${minHeight}px`};
  ${({minWid}): string | undefined => minWid && `min-width: ${minWid}`};
  ${({maxWid}): string | undefined => maxWid && `max-width: ${maxWid}`};
  ${({maxHt}): string | undefined => maxHt && `max-height: ${maxHt}`};
  ${({borderRadius}): string | undefined => borderRadius && `border-radius: ${borderRadius}`};
  ${({bg}): string | undefined => bg && `background-color: ${bg}`};
  ${({flexDirection}): string | undefined => flexDirection && `flex-direction: ${flexDirection}`};
  ${({flexWrap}): string | undefined => flexWrap && `flex-wrap: ${flexWrap}`};
  ${({flex}) => (flex || flex === 0) && `flex: ${flex}`};
  ${({justifyContent}): string | undefined =>
          justifyContent && `justify-content: ${justifyContent}`};
  ${({alignItems}): string | undefined => alignItems && `align-items: ${alignItems}`};
  ${({alignSelf}): string | undefined => alignSelf && `align-self: ${alignSelf}`};
  ${({opacity}): string | undefined => opacity && `opacity: ${opacity}`};
  ${({position}): string | undefined => position && `position: ${position}`};
  ${({top}): string | undefined => top && `top: ${top}`};
  ${({left}): string | undefined => left && `left: ${left}`};
  ${({right}): string | undefined => right && `right: ${right}`};
  ${({bottom}): string | undefined => bottom && `bottom: ${bottom}`};
  ${({zIndex}) => zIndex && `z-index: ${zIndex}`};
  ${({boxShadow}): string | undefined => boxShadow && `box-shadow: ${boxShadow}`};
  ${({shadowColor}): string | undefined => shadowColor && `shadow-color: ${shadowColor}`};
  ${({opacity}): string | undefined => opacity && `opacity: ${opacity}`};
  ${({shadowOpacity}) => shadowOpacity && `shadow-opacity: ${shadowOpacity}`};
  ${({shadowRadius}) => shadowRadius && `shadow-radius: ${shadowRadius}`};
  ${({boxShadow}): string | undefined => boxShadow && `box-shadow: ${boxShadow}`};
  ${({borderWidth}): string | undefined => borderWidth && `border-width: ${borderWidth}`};
  ${({borderColor}): string | undefined => borderColor && `border-color: ${borderColor}`};
  ${({transform}): string | undefined => transform && `transform: ${transform}`};
  ${({display}): string | undefined => display && `display: ${display}`};
  ${({translateY, translateX}): string | undefined =>
          (translateX || translateY) &&
          `transform:${(translateX && ` translateX(${translateX})`) || ""} ${
                  (translateY && ` translateY(${translateY})`) || ""
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
  ${({borderStyle}): string | undefined => borderStyle && `border-style: ${borderStyle}`};
  ${({overflow}): string | undefined => overflow && `overflow: ${overflow}`};
  ${({objectFit}): string | undefined => objectFit && `object-fit: ${objectFit}`};
  ${({border}): string | undefined => border && `border: ${border}`};
  ${({padding}): string | undefined =>
          padding && `padding: ${padding}`};
`;

export const Image: FC<BlockInterface> = ({children, url, ...rest}) => {
    const [imageSrc, setImageSrc] = useState('');

    function requestImage(imageUrl: string) {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            chrome.runtime.sendMessage({action: "fetchImage", url: imageUrl}, response => {
                if (response?.dataUrl) {
                    resolve(response.dataUrl);
                } else {
                    reject(new Error("Failed to load image"));
                }
            });
        });
    }


    useEffect(() => {
        if (url) {
            requestImage(url).then((dataUrl) => {
                // @ts-ignore
                setImageSrc(dataUrl);  // dataUrl is now a Base64 string
            }).catch(error => {
                console.error("Error fetching image:", error);
            });
        }
    }, [url]);
    // @ts-ignore
    return (<StyledImage src={imageSrc} {...rest}>{children}</StyledImage>)
}



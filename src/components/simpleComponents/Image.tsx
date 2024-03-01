import React from 'react';
import styled from 'styled-components/native';

type ImageInterface = {
  width?: string;
  height?: string;
  display?: string;
  resizeMode: string;
  onError: () => void;
  onLoad: () => void;
  source: {uri: string} | React.ReactNode;
  borderRadius?: string | number;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginTop?: number;
  border?: string;
};

const StyledImage = styled.Image<ImageInterface>`
  ${({width}): string | undefined => width && `width: ${width}`};
  ${({height}): string | undefined => height && `height: ${height}`};
  ${({display}): string | null => (display && `display: ${display}`) || null};
  ${({borderRadius}): string | number | undefined =>
      borderRadius && `borderRadius: ${borderRadius}px`};
  ${({marginRight}): string | number | undefined => marginRight && `marginRight: ${marginRight}`};
  ${({marginLeft}): string | number | undefined => marginLeft && `marginLeft: ${marginLeft}`};
  ${({marginBottom}): string | number | undefined => marginBottom && `marginBottom: ${marginBottom}`};
  ${({marginTop}): string | number | undefined => marginTop && `marginTop: ${marginTop}`};
  ${({border}) => border && `
    border-width: ${border.split(' ')[0]};
    border-color: ${border.split(' ')[2]};
  `};
`;

export const Image: React.FC<ImageInterface> = ({ source, resizeMode, ...rest }) => (
  <StyledImage source={source} resizeMode={resizeMode} {...rest} />
);

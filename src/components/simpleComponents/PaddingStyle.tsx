import {css} from 'styled-components/native';
import {PaddingTypes} from '../../types/PaddingTypes';

export const PaddingStyle = (props: PaddingTypes) => css`
  padding-top: ${typeof props.paddingTop === 'number'
    ? props.paddingTop
    : props.paddingTop || 0}px;
  padding-bottom: ${typeof props.paddingBottom === 'number'
    ? props.paddingBottom
    : props.paddingBottom || 0}px;
  padding-left: ${typeof props.paddingLeft === 'number'
    ? props.paddingLeft
    : props.paddingLeft || 0}px;
  padding-right: ${typeof props.paddingRight === 'number'
    ? props.paddingRight
    : props.paddingRight || 0}px;
`;

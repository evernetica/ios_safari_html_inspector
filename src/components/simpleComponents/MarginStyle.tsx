import {css} from 'styled-components/native';
import {MarginTypes} from '../../types/MarginTypes';

export const MarginStyle = (props: MarginTypes) => css`
  margin-top: ${typeof props.marginTop === 'number'
    ? props.marginTop
    : props.marginTop || 0}px;
  margin-bottom: ${typeof props.marginBottom === 'number'
    ? props.marginBottom
    : props.marginBottom || 0}px;
  margin-left: ${typeof props.marginLeft === 'number'
    ? props.marginLeft
    : props.marginLeft || 0}px;
  margin-right: ${typeof props.marginRight === 'number'
    ? props.marginRight
    : props.marginRight || 0}px;
`;

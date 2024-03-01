import React, {FC, useState} from 'react';

import styled from 'styled-components/native';

import {colors} from "../colors";

import {Block} from './Block';
import {Text} from './Text';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputProps,
} from 'react-native';

import {PaddingTypes} from '../../types/PaddingTypes';
import {PaddingStyle} from './PaddingStyle';

type TextInputType = {
  header: string;
  width?: string;
  color?: string;
  value?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  bg?: string;
  onChangeText: (textValue: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  paddingHorizontal?: string;
  paddingVertical?: string;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  onBlur?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  errorMessage?: string | false | undefined;
  isDataCorrect: boolean;
} & PaddingTypes;

const StyledSimpleInput = styled.TextInput<Omit<TextInputType, 'header'>>`
  width: ${({width}): string | undefined => `${width || '100%'}`};
  ${({fontWeight}): string | undefined =>
    fontWeight && `font-weight: ${fontWeight}`};
  color: ${({color}): string => color || 'black'};
  background-color: ${({bg}): string => bg || 'transparent'};
  font-size: ${({fontSize}): string => fontSize || '14px'};
  font-family: ${({fontFamily}): string => fontFamily || 'Helvetica'};
  ${({paddingHorizontal}): string | undefined =>
    paddingHorizontal && `padding-horizontal: ${paddingHorizontal}`};
  ${({paddingVertical}): string | undefined =>
    paddingVertical && `padding-vertical: ${paddingVertical}`};
  &::placeholder {
    color: #6e6e73;
  }
  ${PaddingStyle};
`;

const FormField: FC<TextInputType> = ({
  onChangeText,
  value,
  isLoading,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
  isDataCorrect,
  errorMessage,
  ...rest
}) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry);

  const toggleSecureTextEntry = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  return (
    <Block borderWidth={1} borderColor={'black'}>
        <Block
          flexDirection={'row'}
          paddingHorizontal={'16px'}
          paddingVertical={'14px'}>
          <StyledSimpleInput
            value={value}
            fontSize={'20px'}
            fontWeight={'400'}
            paddingRight={25}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={isSecureTextEntry}
            autoCapitalize={autoCapitalize}
            textContentType="oneTimeCode"
            autoFocus={true}
            {...rest}
          />
      </Block>
      {!isDataCorrect && (
        <Block flexDirection={'row'} gap={3} paddingTop={'3px'}>
          <Text color={colors.black}>{errorMessage}</Text>
        </Block>
      )}
    </Block>
  );
};

export default FormField;

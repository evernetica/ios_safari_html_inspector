import React from 'react';
import styled from 'styled-components/native';

export const StyledSafeArea = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: ${({bg}) => bg || 'white'};
`;


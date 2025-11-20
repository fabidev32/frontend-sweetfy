import styled from 'styled-components/native';
import { theme } from '@/theme/theme';
import { Appbar, Surface } from 'react-native-paper';

interface IHeaderStyles {
  flexDirection?: 'row' | 'column';
  lineHeight?: number;
}

export const HeaderContainerStyled = styled(Surface)<IHeaderStyles>`
  background-color: ${theme.colors.yellowLight};
  width: 100%;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: space-between;
  align-items: center;
  border-color: ${theme.colors.white};
`;

export const StyledAppBar = styled(Appbar)`
  background-color: ${theme.colors.yellowLight};
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: space-around;
  elevation: 8;
`;

export const Line = styled.View<IHeaderStyles>`
  width: 100%;
  height: ${({ lineHeight }) => lineHeight};
  background-color: ${theme.colors.white};
`;

export const PropsContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 10;
  align-items: center;
  gap: 25;
  justify-content: center;
`;

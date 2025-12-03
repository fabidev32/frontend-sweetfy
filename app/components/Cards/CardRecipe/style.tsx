import styled from 'styled-components/native';

// A forma mais segura é usar a sintaxe JS (camelCase) e envolver
// valores numéricos sem unidade em aspas (tornando-os strings).

export const ContainerCard = styled.View`
  border-left-width: 6px;
  border-left-color: '#880741';
  border-color: '#880741';
  border-width: 1px;
  border-radius: 10px;
  margin: 5px;
  padding: 6px;
  margin-left: 10px;
  min-height: 180px;
  max-width: 300px;
`;

export const ViewCard = styled.View`
  background-color: '#FFFFFF';
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 5px;

`;

export const ContainerWithCheckBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: 'center';
  justify-content: 'center';
  margin-horizontal: 5;
  margin-vertical: 8;
`;

export const TitleCard = styled.Text`
  color: '#5F3124';
  font-weight: bold;
  font-size: 21px;
`;

export const TextCard = styled.Text`
  color: '#5F3124';
  font-size: 18px;
  margin: 3px;
`;

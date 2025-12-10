import styled from 'styled-components/native';

export const ContainerCard = styled.View`
  display: flex;
  aligm-itens: center;
  justify-content: center;
  border-left-width: 6px;
  border-left-color: #880741;
  border-color: #880741;
  border-width: 1px;
  margin: 2px;
  width: 320px;

`;
 
export const ViewCard = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 5px;
  background-color: #FFFFFF;

`;


export const ContainerWithCheckBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-horizontal: 5px;
  margin-vertical: 8px;
`;

export const TextCard = styled.Text`
    color: #5F3124;
    font-family: 'Montserrat';
    font-size: 18px;
`;

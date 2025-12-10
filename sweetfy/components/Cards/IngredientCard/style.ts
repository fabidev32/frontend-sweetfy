import styled from 'styled-components/native';

export const ContainerCard = styled.View`
  border-left-width: 6px;
  border-left-color: #880741;
  border-color: #880741;
  border-width: 1px;
  border-radius: 10px;
  margin: 5px;
  padding: 6px;
  margin-left: 10px;
  min-height: 200px;
  width: 320px;
  background-color: #FFFFFF;

`;
 
export const ViewCard = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 5px;
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
    font-size: 21px;
`;

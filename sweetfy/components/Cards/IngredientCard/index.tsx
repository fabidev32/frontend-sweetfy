import * as React from 'react';
import { ViewStyle, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import {
  ContainerCard,
  ContainerWithCheckBox,
  TextCard,
  ViewCard,
} from './style';
import { IIngredientData } from './type';

interface CardIngredientProps {
  data: IIngredientData;
  id: number;
  showCheckBox: boolean;
  checkBoxSelected: boolean;
  functionButtonSelected?: (id: number) => void;
  cardStyle?: ViewStyle;
}

const CardIngredient: React.FC<CardIngredientProps> = ({
  id,
  showCheckBox,
  checkBoxSelected,
  functionButtonSelected,
  data,
  cardStyle,
}) => {
  const ControllerCheckBox = () => {
    if (!showCheckBox || !functionButtonSelected) {
      return null;
    }

    const iconName = checkBoxSelected
      ? 'checkbox-marked'
      : 'checkbox-blank-outline';

    return (
      <TouchableOpacity onPress={() => functionButtonSelected(id)}>
        <Icon
          source={iconName}
          size={24}
          color="#880741"
        />
      </TouchableOpacity>
    );
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);


  return (
    <ContainerWithCheckBox style={cardStyle}>
      {ControllerCheckBox()}
      <ContainerCard>
        <ViewCard>
          <TextCard style={{ fontWeight: 'bold', fontSize: 16 }}>
            {data.name}
          </TextCard>

          <TextCard>
            {data.brand}
          </TextCard>

          <View style={{ flex: 1, flexDirection: 'row'}}>
            <TextCard>
              {data.quantity}
            </TextCard>
            <TextCard> {data.unit} </TextCard>
          </View>

          <TextCard>
            {formatCurrency(data.unitPrice)}
          </TextCard>
        </ViewCard>
      </ContainerCard>
    </ContainerWithCheckBox>
  );
};

export default CardIngredient;
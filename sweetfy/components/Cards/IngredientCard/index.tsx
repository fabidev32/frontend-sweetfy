import * as React from 'react';
import { ViewStyle, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import {
  ContainerCard,
  ContainerWithCheckBox,
  TextCard,
  ViewCard,
} from './style';
import {IIngredientData} from './type'



interface CardIngredientProps {
  data: IIngredientData;
  id: number;
  showCheckBox: boolean;
  checkBoxSelected: boolean;
  functionButtonSelected?: (id: number) => void;
  cardStyle?: ViewStyle;
}

const CardOrder: React.FC<CardIngredientProps> = ({
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

  return (
    <ContainerWithCheckBox>
      {ControllerCheckBox()}
      <ContainerCard>
        <ViewCard>
          <View>
            <TextCard> {data.brand} </TextCard>
          </View>
              <TextCard> {data.unit} </TextCard>
              <TextCard> {data.unitPrice} </TextCard>
        </ViewCard>
      </ContainerCard>
    </ContainerWithCheckBox>
  );
};

export default CardOrder;

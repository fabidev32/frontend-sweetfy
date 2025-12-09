import * as React from 'react';
import {IRecipeData} from './type'
import { TouchableOpacity, View } from 'react-native';
import { ViewStyle } from 'react-native';
import { Icon } from 'react-native-paper';
import Items from './ItemsCard/index'
import FieldNameAndValue from '../../FieldNameAndValue';
import {
  ContainerWithCheckBox,
  ContainerCard,
  ViewCard,
  TitleCard,
  TextCard,
} from './style';


interface CardRecipeProps {
  data: IRecipeData;
  id: number;
  showCheckBox: boolean;
  checkBoxSelected: boolean;
  functionButtonSelected?: (id: number) => void;
  cardStyle?: ViewStyle;
}

const CardRecipe: React.FC<CardRecipeProps> = ({
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

  const formatCurrency = (value: string) => `R$ ${value.replace('.', ',')}`;

  return (
    <ContainerWithCheckBox>
      {ControllerCheckBox()}
      <ContainerCard style={cardStyle}>
        <ViewCard>
          <TitleCard>{data.name}</TitleCard>
          <FieldNameAndValue
            name="Rendimento total"
            value={[data.yieldQuantity, data.yieldUnit]}
            nameStyle={{ fontWeight: 'bold' }}
          />
          <FieldNameAndValue
            name="Custo total"
            value={formatCurrency(data.totalCost.toFixed(2))}
            nameStyle={{ fontWeight: 'bold' }}
            valueStyle={{ width: 150 }}
          />
          <TextCard numberOfLines={5}>{data.preparation}</TextCard>
          <Items items={data.recipeIngredients} />
        </ViewCard>
      </ContainerCard>
    </ContainerWithCheckBox>
  );
};

export default CardRecipe;

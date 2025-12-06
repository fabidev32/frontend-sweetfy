import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FieldNameAndValue from '@/components/FieldNameAndValue';
import ListIngredientesInput from '@/components/Cards/CardRecipe/ItemsCard';
import { ViewStyle } from 'react-native';

interface RecipeData {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  additionalCostPercent: number;
  totalCost: number;
  quantity: number;
  recipeIngredients: Ingredient[]; 
  recipeServices: Service[];
}

interface Ingredient {
  id: number;
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  unit: string;
  unitPriceSnapshot: number | string | undefined | null;
  itemCost?: number;
}

interface Service {
  id: number;
  name: string;
  description: string;
  providerName: string;
  unit: string;
  unitPrice: number; 
}

interface CardRecipeProps {
  data: RecipeData;
  id: number;
  showCheckBox: boolean;
  checkBoxSelected: boolean;
  functionButtonSelected?: (id: number) => void;
  cardStyle?: ViewStyle;
}

import {
  ContainerCard,
  ContainerWithCheckBox,
  ViewCard,
  TitleCard,
  TextCard,
} from './style';
import { fontWeight } from '@/theme/theme';

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
          name={iconName}
          size={24}
          color="#880741"
        />
      </TouchableOpacity>
    );
  };


  const formatCurrency = (value: string) => `R$ ${value.replace('.', ',')}`;


  return (
    <ContainerWithCheckBox >
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
          <ListIngredientesInput items={data.recipeIngredients} />
        </ViewCard>
      </ContainerCard>
    </ContainerWithCheckBox>
  );
};

export default CardRecipe;

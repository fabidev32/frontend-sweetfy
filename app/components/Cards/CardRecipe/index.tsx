import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FieldNameAndValue from '@/components/FieldNameAndValue';
import ListIngredientesInput from '@/components/Items/ListItems';
import { ViewStyle } from 'react-native';

interface RecipeData {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  additionalCostPercent: number;
  recipeIngredients: any[]; // Usando any[] por enquanto, se a interface for complexa.
}

interface CardRecipeProps {
  data: RecipeData;
  id: number;
  showCheckBox: boolean;
  checkBoxSelected: boolean;
  functionButtonSelected?: (id: number) => void;
  cardStyle?: ViewStyle;
}

// 3. Estilos (mantidos como importados)
import {
  ContainerCard,
  ContainerWithCheckBox,
  ViewCard,
  TitleCard,
  TextCard,
} from './style';

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

  return (
    <ContainerWithCheckBox >
      {ControllerCheckBox()}
      <ContainerCard style={cardStyle}>
        <ViewCard>
          <TitleCard>{data.name}</TitleCard>
          <FieldNameAndValue
            name="Rendimento"
            value={[data.yieldQuantity, data.yieldUnit]}
          />
          <FieldNameAndValue
            name="Percentual de custo adicional"
            value={data.additionalCostPercent}
          />
          <TextCard numberOfLines={5}>{data.preparation}</TextCard>
          <ListIngredientesInput items={data.recipeIngredients} />
        </ViewCard>
      </ContainerCard>
    </ContainerWithCheckBox>
  );
};

export default CardRecipe;

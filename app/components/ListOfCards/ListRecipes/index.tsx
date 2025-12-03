import React from 'react';
import { ContainerList } from './style';
import CardRecipe from '../../Cards/CardRecipe/index';
import { ViewStyle, TouchableOpacity } from 'react-native';

type NavigateFunction = (id: number) => void;

interface RecipeData {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  additionalCostPercent: number;
  recipeIngredients: any[];
}


interface PropsListOfCards {
  dataRecipe: RecipeData[];
  showSelectionControls?: boolean;
  onItemSelect?: (itemId: number) => void;
  selectedItemIds?: number[];
  style?: ViewStyle;
  cardItemStyle?: ViewStyle;
  onCardPress: NavigateFunction;
}


const ListRecipes: React.FC<PropsListOfCards> = ({
  dataRecipe,
  showSelectionControls = false,
  onItemSelect,
  selectedItemIds = [],
  style,
  cardItemStyle,
  onCardPress
}) => {
  return (
    <ContainerList style={style}>
      {dataRecipe.map((item) => (

        <TouchableOpacity key={item.id} onPress={() => onCardPress(item.id)}>
          <CardRecipe
            id={item.id}
            data={item} // Verifica se o ID do item está no array de selecionados
            checkBoxSelected={selectedItemIds.includes(item.id)} // Recebe o controle de exibição de checkbox do componente pai
            showCheckBox={showSelectionControls} // Função para lidar com a seleção, passada para o CardRecipe
            functionButtonSelected={onItemSelect}
            cardStyle={cardItemStyle}
          />
        </TouchableOpacity>

      ))}
    </ContainerList>
  );
};

export default ListRecipes;

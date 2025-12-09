import CardRecipe from '@/components/Cards/RecipeCard';
import { ContainerList } from './style';
import React, { useMemo } from 'react';
import { ViewStyle, TouchableOpacity } from 'react-native';
import { calculateRecipeTotalCost } from '../utils';
import {IRecipeData} from './type'

type NavigateFunction = (recipe: IRecipeData) => void;


interface PropsListOfCards {
  dataRecipe: IRecipeData[];
  showSelectionControls?: boolean;
  onItemSelect?: (itemId: number) => void;
  selectedItemIds?: number[];
  style?: ViewStyle;
  cardItemStyle?: ViewStyle;
  onCardPress: NavigateFunction;
}

interface RecipeDataWithCost extends IRecipeData {
  totalCost: number;
  quantity: number;
}

const ListRecipes: React.FC<PropsListOfCards> = ({
  dataRecipe,
  showSelectionControls = false,
  onItemSelect,
  selectedItemIds = [],
  style,
  cardItemStyle,
  onCardPress,
}) => {
  const recipesWithCost: IRecipeData[] = useMemo(() => {
    return dataRecipe.map((item) => {
      const totalCost = calculateRecipeTotalCost(item);

      return {
        ...item,
        totalCost: totalCost,
      } as RecipeDataWithCost;
    });
  }, [dataRecipe]);

  return (
    <ContainerList style={style}>
      {recipesWithCost.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onCardPress(item)}
        >
          <CardRecipe
            id={item.id}
            data={item}
            checkBoxSelected={selectedItemIds.includes(item.id)}
            showCheckBox={showSelectionControls}
            functionButtonSelected={onItemSelect}
            cardStyle={cardItemStyle}
          />
        </TouchableOpacity>
      ))}
    </ContainerList>
  );
};

export default ListRecipes;

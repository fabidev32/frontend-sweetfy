import CardRecipe from '@/components/Cards/RecipeCard';
import { ContainerList } from './style';
import React, { useMemo } from 'react';
import { ViewStyle, TouchableOpacity } from 'react-native';
import { calculateRecipeTotalCost } from '../utils';

type NavigateFunction = (recipe: RecipeDataWithCost) => void;

interface RecipeData {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  quantity: number;
  additionalCostPercent: number;
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

interface PropsListOfCards {
  dataRecipe: RecipeData[];
  showSelectionControls?: boolean;
  onItemSelect?: (itemId: number) => void;
  selectedItemIds?: number[];
  style?: ViewStyle;
  cardItemStyle?: ViewStyle;
  onCardPress: NavigateFunction;
}

interface RecipeDataWithCost extends RecipeData {
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
  const recipesWithCost: RecipeDataWithCost[] = useMemo(() => {
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

import { ContainerList } from './style';
import CardRecipe from '../../Cards/CardRecipe/index';
import React, { useMemo } from 'react';
import { ViewStyle, TouchableOpacity } from 'react-native';

type NavigateFunction = (recipe: RecipeDataWithCost) => void;

interface RecipeIngredient {
    id: number;
    ingredientId: number;
    ingredientName: string;
    quantity: number; 
    unit: string;
    unitPriceSnapshot: number | string | undefined | null; 
    itemCost?: number; 
}

interface RecipeService {
    id: number;
    serviceId: number;
    serviceName: string;
    unitPriceSnapshot: number;
    quantity: number;
}

interface RecipeData {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  additionalCostPercent: number;
  recipeIngredients: RecipeIngredient[]; 
  recipeServices?: RecipeService[];
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
}

const calculateTotalCost = (dataRecipe: RecipeData): number => {
    
    const costAllItensIngredients = dataRecipe.recipeIngredients.reduce(
        (soma, item) => {
            const price = parseFloat(item.unitPriceSnapshot as any) || 0;
            const quantity = parseFloat(item.quantity as any) || 0;
            
            return soma + (price * quantity);
        },
        0
    );

    const costAllItensServices = (dataRecipe.recipeServices || []).reduce(
        (soma, item) => {
            const price = parseFloat(item.unitPriceSnapshot as any) || 0;
            const quantity = parseFloat(item.quantity as any) || 0;
            
            return soma + (price * quantity);
        },
        0
    );

    const baseCostTotal = costAllItensIngredients + costAllItensServices;

    const additionalFeeRate = dataRecipe.additionalCostPercent / 100;
    const additionalCost = baseCostTotal * additionalFeeRate;
    
    return baseCostTotal + additionalCost;

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

  
  const recipesWithCost: RecipeDataWithCost[] = useMemo(() => {

    return dataRecipe.map(item => {

      const totalCost = calculateTotalCost(item);

      return {
        ...item,
        totalCost: totalCost,
      } as RecipeDataWithCost;
    });

  }, [dataRecipe]);

  return (
    <ContainerList style={style}>
      {recipesWithCost.map((item) => (

        <TouchableOpacity key={item.id} onPress={() => onCardPress(item)}>
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

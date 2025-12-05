import React from 'react';
import { ContainerList } from './style'
import CardProduct from '../../Cards/CardProduct/index';
import { ViewStyle, TouchableOpacity } from 'react-native';

type NavigateFunction = (id: number) => void;

export interface ProductIngredient {
  ingredientId: number;
  quantity: number;
  unit: string;
}

export interface ProductRecipe {
  recipeId: number;
  quantity: number;
}

export interface ProductService {
  serviceId: number;
  quantity: number;
}

export interface ProductData {
  productId: number;
  name: string;
  preparation: string;
  salePrice: number;
  profitPercent: number;
  productIngredients: ProductIngredient[]; 
  productRecipes: ProductRecipe[];
  productServices: ProductService[];
}

interface PropsListOfCards {
  dataProduct: ProductData[];
  showSelectionControls?: boolean;
  onItemSelect?: (itemId: number) => void;
  selectedItemIds?: number[];
  style?: ViewStyle;
  cardItemStyle?: ViewStyle;
  onCardPress: NavigateFunction;
}

const ListProducts: React.FC<PropsListOfCards> = ({
  dataProduct,
  showSelectionControls = false,
  onItemSelect,
  selectedItemIds = [],
  style,
  cardItemStyle,
  onCardPress
}) => {
  return (
    <ContainerList style={style}>
      {dataProduct.map((item) => (
        <TouchableOpacity key={item.productId} onPress={() => onCardPress(item.productId)}>
          <CardProduct
            id={item.productId}
            data={item} 
            checkBoxSelected={selectedItemIds.includes(item.productId)} 
            showCheckBox={showSelectionControls} 
            functionButtonSelected={onItemSelect}
            cardStyle={cardItemStyle}
          />
        </TouchableOpacity>

      ))}
    </ContainerList>
  );
};

export default ListProducts;

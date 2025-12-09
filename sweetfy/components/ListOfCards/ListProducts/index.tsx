import React, { useMemo } from 'react';
import { ContainerList } from './style';
import {IProductData} from './type'
import { ViewStyle, TouchableOpacity } from 'react-native';
import CardProduct from '@/components/Cards/ProductCard';
import { calculateProductTotalCost, calculateRecipeTotalCost } from '../utils';

type NavigateFunction = (product: IProductData) => void;

interface PropsListOfCards {
  dataProduct: IProductData[];
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
  onCardPress,
}) => {
  const productWithCost: IProductData[] = useMemo(() => {
    return dataProduct.map((item) => {
      const totalCost = calculateProductTotalCost(
        item,
        calculateRecipeTotalCost
      );
      const safeTotalCost = totalCost || 0;

      const totalProfit = (item.salePrice || 0) - safeTotalCost;

      return {
        ...item,
        totalCost: safeTotalCost,
        totalProfit: totalProfit,
      };
    });
  }, [dataProduct]);

  return (
    <ContainerList style={style}>
      {productWithCost.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onCardPress(item)}
        >
          <CardProduct
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

export default ListProducts;

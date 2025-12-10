import React, { useMemo } from 'react';
import { ContainerList } from './style';
import {IIngredientData} from './type'
import { ViewStyle, TouchableOpacity } from 'react-native';
import CardIngredient from '@/components/Cards/IngredientCard';

type NavigateFunction = (product: IIngredientData) => void;


interface PropsListOfCards {
  data: IIngredientData[];
  showSelectionControls?: boolean;
  onItemSelect?: (itemId: number) => void;
  selectedItemIds?: number[];
  style?: ViewStyle;
  cardItemStyle?: ViewStyle;
  onCardPress: NavigateFunction;
}

const ListIngredients: React.FC<PropsListOfCards> = ({
  data,
  showSelectionControls = false,
  onItemSelect,
  selectedItemIds = [],
  style,
  cardItemStyle,
  onCardPress,
}) => {
  return (
    <ContainerList style={style}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onCardPress(item)}
        >
          <CardIngredient
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

export default ListIngredients;

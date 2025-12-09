import React, { useMemo } from 'react';
import { ContainerList } from './style';
import {IOrdersData} from './type'
import { ViewStyle, TouchableOpacity } from 'react-native';
import CardOrder from '@/components/Cards/OrderCard';

type NavigateFunction = (product: IOrdersData) => void;


interface PropsListOfCards {
  data: IOrdersData[];
  showSelectionControls?: boolean;
  onItemSelect?: (itemId: number) => void;
  selectedItemIds?: number[];
  style?: ViewStyle;
  cardItemStyle?: ViewStyle;
  onCardPress: NavigateFunction;
}

const ListOrder: React.FC<PropsListOfCards> = ({
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
          <CardOrder
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

export default ListOrder;

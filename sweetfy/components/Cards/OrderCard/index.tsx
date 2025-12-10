import * as React from 'react';
import { ViewStyle, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import {
  ContainerCard,
  ContainerPrice,
  ContainerWithCheckBox,
  TextCard,
  TextCost,
  TextProfit,
  TitleCard,
  ViewCard,
  ViewPrice,
} from './style';
import {IOrdersData} from './type'
import ListProductsInput from './ItemsCard/index';
import FieldNameAndValue from '../../FieldNameAndValue';



interface CardOrderProps {
  data: IOrdersData;
  id: number;
  showCheckBox: boolean;
  checkBoxSelected: boolean;
  functionButtonSelected?: (id: number) => void;
  cardStyle?: ViewStyle;
}

const CardOrder: React.FC<CardOrderProps> = ({
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
          source={iconName}
          size={24}
          color="#880741"
        />
      </TouchableOpacity>
    );
  };

    const formatCurrency = (value: string) => `R$ ${value.replace('.', ',')}`;


  return (
    <ContainerWithCheckBox>
      {ControllerCheckBox()}

      <ContainerCard>
        <ViewCard>
          <TitleCard>{data.name}</TitleCard>

          <View>
            <TextCard> {data.description} </TextCard>
          </View>

          <FieldNameAndValue
            name="Preço de venda:"
            value={formatCurrency(data.salePrice.toString())}
          />
          <ContainerPrice>
            <ViewPrice>
              <TextCost> Custo total </TextCost>
              <TextCost> {formatCurrency(data.totalCost.toString())} </TextCost>
            </ViewPrice>
            <ViewPrice>
              <TextProfit> Lucro total </TextProfit>
              <TextProfit> {formatCurrency(data.profit.toString())} </TextProfit>
            </ViewPrice>
          </ContainerPrice>

          <View>
            <ListProductsInput items={data.orderProducts} />
          </View>
        </ViewCard>
      </ContainerCard>
    </ContainerWithCheckBox>
  );
};

export default CardOrder;

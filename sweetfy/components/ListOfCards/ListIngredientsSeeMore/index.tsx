import { ContainerList } from './style';
import {IIngredientData} from './type'
import { ViewStyle} from 'react-native';
import CardIngredient from '@/components/Cards/IngredientCard';



interface PropsListOfCards {
  data: IIngredientData[];
  showSelectionControls?: boolean;
  onItemSelect?: (itemId: number) => void;
  selectedItemIds?: number[];
  style?: ViewStyle;
  cardItemStyle?: ViewStyle;
}

const ListIngredients: React.FC<PropsListOfCards> = ({
  data,
  showSelectionControls = false,
  onItemSelect,
  selectedItemIds = [],
  style,
  cardItemStyle,
}) => {
  return (
    <ContainerList style={style}>
      {data.map((item) => (
          <CardIngredient
            id={item.id}
            data={item}
            checkBoxSelected={selectedItemIds.includes(item.id)}
            showCheckBox={showSelectionControls}
            functionButtonSelected={onItemSelect}
            cardStyle={cardItemStyle}
          />
      ))}
    </ContainerList>
  );
};

export default ListIngredients;

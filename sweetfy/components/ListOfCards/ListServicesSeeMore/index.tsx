import { ContainerList } from './style';
import {IServiceData} from './type'
import { ViewStyle} from 'react-native';
import CardService from '@/components/Cards/ServiceCard/index';



interface PropsListOfCards {
  data: IServiceData[];
  showSelectionControls?: boolean;
  onItemSelect?: (itemId: number) => void;
  selectedItemIds?: number[];
  style?: ViewStyle;
  cardItemStyle?: ViewStyle;
}

const ListServices: React.FC<PropsListOfCards> = ({
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
          <CardService
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

export default ListServices;

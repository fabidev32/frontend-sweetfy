import { ContainerList, ViewCard } from './style';
import { IIngredientData } from './type';
import { ViewStyle} from 'react-native';
import FieldNameAndValue from './../../FieldNameAndValue/index';



interface PropsListOfCards {
    data: IIngredientData[];
    style?: ViewStyle;
    cardItemStyle?: ViewStyle;
}

const ListIngredientsHomePage: React.FC<PropsListOfCards> = ({
    data,
    style,
    cardItemStyle,
}) => {

    const formatCurrency = (value: string) => `R$ ${value.replace('.', ',')}`;

    return (
        <ContainerList style={style}>

            {data.map((item) => (

                <ViewCard>


                    <FieldNameAndValue
                        name={item.name}
                        value={formatCurrency(item.unitPrice.toString())}
                        nameStyle={{ fontWeight: 'bold' }}
                        contentStyle={{
                            flex: 1,
                            justifyContent: 'space-between',
                            marginBottom: 5,
                        }}
                    />
                    <FieldNameAndValue
                        name={item.brand}
                        value={`${item.quantity} ${item.unit}`}
                        nameStyle={{ fontWeight: 'bold' }}
                        valueStyle={{ width: 150 }}
                        contentStyle={{ flex: 1, justifyContent: 'space-between' }}

                    />
                </ViewCard>
            ))}
        </ContainerList>
    );
};

export default ListIngredientsHomePage;
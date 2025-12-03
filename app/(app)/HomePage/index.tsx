import ListRecipes from '../../components/ListOfCards/ListRecipes/index';
import { TouchableOpacity, ScrollView } from 'react-native';
import { ContainerListOFCards, ViewTitle, ViewButtonTitle } from './style';
import { useRouter } from 'expo-router';

const mockRecipes = [
  {
    id: 1,
    recipeId: 1,
    name: 'Brigadeiro Simples',
    yieldQuantity: 20,
    yieldUnit: 'unidades',
    preparation:
      'Coloque o leite condesado, a manteiga, e o chocolate. Misture até ferver',
    additionalCostPercent: 5,
    recipeIngredients: [
      {
        id: 1,
        ingredientId: 1,
        ingredientName: 'Leite Condensado',
        quantity: 1,
        unit: 'lata',
        unitPriceSnapshot: 5,
      },
    ],
  },

  {
    id: 2,
    recipeId: 2,
    name: 'Brigadeiro Gourmet',
    yieldQuantity: 15,
    yieldUnit: 'unidades',
    preparation: 'Utilize chocolate nobre e siga o processo de temperagem.',
    additionalCostPercent: 10,
    recipeIngredients: [
      {
        id: 2,
        ingredientId: 2,
        ingredientName: 'Chocolate Nobre',
        quantity: 300,
        unit: 'g',
        unitPriceSnapshot: 15,
      },
    ],
  },
];

const HomePage = () => {

  const router = useRouter();
  const handleNavigateToDetails = (recipeId: number) => {
    router.push({
      pathname: "/DetailsRecipe",
      params: { id: recipeId },
    } as any);
  };
  return (
    <ScrollView>
      <ContainerListOFCards>
        <ViewButtonTitle>

          <ViewTitle>Receitas</ViewTitle>
          <TouchableOpacity
            onPress={() => router.push('/SeeMoreRecipes')}
            style={{ margin: 10 }}> Ver mais </TouchableOpacity>
        </ViewButtonTitle>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <ListRecipes
            onCardPress={handleNavigateToDetails}
            dataRecipe={mockRecipes}
            style={{
              flexDirection: 'row',
              margin: 10,
            }}
            cardItemStyle={{}}
          />
        </ScrollView>
      </ContainerListOFCards>
    </ScrollView>
  );
};

export default HomePage;

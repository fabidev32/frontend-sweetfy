import ListRecipes from '../../components/ListOfCards/ListRecipes/index';
import ListProducts from '../../components/ListOfCards/ListProducts/index'
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { ContainerListOFCards, ViewButtonTitle, Title } from './style';
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
        quantity: 2,
        unit: 'g',
        unitPriceSnapshot: 15,
      },
    ],
  },
];

const mockProducts = [
  {
    productId: 1,
    name: "Bolo de chocolate",
    preparation: "Pegue a massa e o recheio que foram produzidos",
    salePrice: 50.00,
    profitPercent: 20,
    productIngredients: [
      {
        ingredientId: 1,
        quantity: 2,
        unit: 'unidade',
      }
    ],
    productRecipes: [
      {
        recipeId: 1,
        quantity: 2,
      }
    ],
    productServices: [
      {
        serviceId: 1,
        quantity: 2,
      }
    ]
  },
  {
    productId: 2,
    name: "Bolo de Cenoura",
    preparation: "Misture a cenoura, ovo e farinha e leve ao forno.",
    salePrice: 45.50,
    profitPercent: 25,
    productIngredients: [
      {
        ingredientId: 2,
        quantity: 500,
        unit: 'gramas',
      }
    ],
    productRecipes: [
      {
        recipeId: 2,
        quantity: 1,
      }
    ],
    productServices: [
      {
        serviceId: 2,
        quantity: 1,
      }
    ]
  }
];

interface RecipeData {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  additionalCostPercent: number;
  totalCost: number;
  recipeIngredients: any[];
}

const HomePage = () => {

  const router = useRouter();
  const handleNavigateToDetailsRecipe = (recipe: RecipeData) => {
    const recipeDataString = JSON.stringify(recipe);

    router.push({
      pathname: "/DetailsRecipe",
      params: {
        recipeData: recipeDataString
      },
    } as any);
  };

  const handleNavigateToDetailsProduct = (productId: number) => {
    router.push({
      pathname: "/DetailsProduct",
      params: { id: productId },
    } as any);
  };

  return (
    <ScrollView>
      <ContainerListOFCards>
        <View>
          <ViewButtonTitle>
            <Title>Receitas</Title>
            <TouchableOpacity
              onPress={() => router.push('/SeeMoreRecipes')}
              style={{ margin: 10 }}> Ver mais </TouchableOpacity>
          </ViewButtonTitle>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <ListRecipes
              onCardPress={handleNavigateToDetailsRecipe}
              dataRecipe={mockRecipes}
              style={{
                flexDirection: 'row',
                margin: 10,
              }}
              cardItemStyle={{}}
            />
          </ScrollView>
        </View>

        <View>
          <ViewButtonTitle>
            <Title>Produtos</Title>
            <TouchableOpacity
              onPress={() => router.push('/SeeMoreProducts')}
              style={{ margin: 10 }}> Ver mais </TouchableOpacity>
          </ViewButtonTitle>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <ListProducts
              onCardPress={handleNavigateToDetailsProduct}
              dataProduct={mockProducts}
              style={{
                flexDirection: 'row',
                margin: 10,
              }}
              cardItemStyle={{}}
            >
            </ListProducts>
          </ScrollView>
        </View>

      </ContainerListOFCards>
    </ScrollView>
  );
};

export default HomePage;

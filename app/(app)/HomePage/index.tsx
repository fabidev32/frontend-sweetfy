import React, { useState, useEffect } from 'react'; 
import ListRecipes from '../../components/ListOfCards/ListRecipes/index';
import ListProducts from '../../components/ListOfCards/ListProducts/index'
import ListOrders from '../../components/ListOfCards/ListOrders/index'
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { ContainerListOFCards, ViewButtonTitle, Title } from './style';
import { useRouter } from 'expo-router';
import { ProductData, OrderData, RecipeData } from '@/utils/typse';


const mockOrders = [
  {
    id: 1,
    name: "Bolo de morango",
    description: "Encomenda realizada pela Eliana, no bairro Taquaril",
    totalYield: 5,
    totalCost: 200,
    salePrice: 100,
    profit: 100,
    status: "Em produção",
    orderProducts: [
      {
        productId: 1,
        name: "Bolo de Cenoura",
        preparation: "Misture a cenoura, ovo e farinha e leve ao forno.",
        salePrice: 45.50,
        profitPercent: 25,
        productIngredients: [
          {
            id: 1,
            ingredientId: 1,
            ingredientName: 'Leite condesado',
            quantity: 3,
            unit: 'kilo',
            unitPriceSnapshot: 5,
            itemCost: 15,
          }
        ],
        productRecipes: [
          {
            id: 1,
            recipeId: 1,
            recipeName: 'Brigadeiro Simples',
            quantity: 2,
            unitPriceSnapshot: 10.50,
            costSnapshot: 5.25,
            totalCost: 10.50,
            totalProfit: 10.50,
          }
        ],
        productServices: [
          {
            id: 1,
            name: "Uber",
            description: "Entrega",
            providerName: "Marcelo",
            unit: "Dinheiro",
            unitPrice: 10,
          }
        ]
      },
    ],
    orderRecipes: [
      {
        id: 1,
        recipeId: 1,
        recipeName: 'Brigadeiro Simples',
        quantity: 5,
        unitPriceSnapshot: 10.50,
        costSnapshot: 5.25,
        totalCost: 26.25,
        totalProfit: 26.25,

      }
    ]
  }
];

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
    productServices: [
      {
        id: 1,
        name: "Uber",
        description: "Entrega",
        providerName: "Marcelo",
        unit: "Dinheiro",
        unitPrice: 10,
      }
    ]
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
] as any;

const mockProducts = [
  {
    productId: 1,
    name: "Bolo de Cenoura",
    preparation: "Misture a cenoura, ovo e farinha e leve ao forno.",
    salePrice: 45.50,
    profitPercent: 25,
    productIngredients: [
      {
        id: 1,
        ingredientId: 1,
        ingredientName: 'Leite condesado',
        quantity: 3,
        unit: 'kilo',
        unitPriceSnapshot: 5,
      }
    ],
    productRecipes: [
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
        productServices: [
          {
            id: 1,
            name: "Uber",
            description: "Entrega",
            providerName: "Marcelo",
            unit: "Dinheiro",
            unitPrice: 10,
          }
        ]
      }
    ],
    productServices: [
      {
        id: 1,
        name: "Uber",
        description: "Entrega",
        providerName: "Marcelo",
        unit: "Dinheiro",
        unitPrice: 10,
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
        id: 1,
        ingredientId: 1,
        ingredientName: 'Leite condesado',
        quantity: 3,
        unit: 'kilo',
        unitPriceSnapshot: 5,
      }
    ],
    productRecipes: [
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
      }
    ],
    productServices: [
      {
        id: 1,
        name: "Uber",
        description: "Entrega",
        providerName: "Marcelo",
        unit: "Dinheiro",
        unitPrice: 10,
      }
    ]
  }
];

interface RecipeId {
  id: number;
}


const HomePage = () => {
  const router = useRouter();

  const [recipes, setRecipes] = useState<RecipeData[]>(mockRecipes as RecipeData[]);
  const [products, setProducts] = useState<ProductData[]>(mockProducts);
  //const [orders, setOrders] = useState<OrderData[]>(mockOrders);
  const [postStatus, setPostStatus] = useState<string | null>(null);

  const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZ..."; // Use apenas o JWT, não o objeto inteiro
  const endpointRecipes = 'http://localhost:5190/api/recipes';


  const mockNewRecipe: Omit<RecipeData, 'id'> = {
    // ... Seus dados de mockNewRecipe aqui ...
    id: 1, 
    recipeId: 1, 
    name: 'Brigadeiro Simples',
    yieldQuantity: 20, 
    yieldUnit: 'unidades',
    preparation: 'Coloque o leite condesado, a manteiga, e o chocolate. Misture até ferver',
    additionalCostPercent: 5,
    recipeIngredients: [
      { id: 1, ingredientId: 1, ingredientName: 'Leite Condensado', quantity: 1, unit: 'lata', unitPriceSnapshot: 5 },
    ],
    productServices: [
      { id: 1, name: "Uber", description: "Entrega", providerName: "Marcelo", unit: "Dinheiro", unitPrice: 10 }
    ]
  };

  const fetchAllRecipes = async () => {
    try {
      const initialResponse = await fetch(endpointRecipes);
      if (!initialResponse.ok) {
        throw new Error(
          `Erro de servidor ao buscar a lista de IDs: ${initialResponse.status}`
        );
      }
      const listRecipesById: RecipeId[] = await initialResponse.json();

      const detailPromises = listRecipesById.map(async (item: RecipeId) => {
        const URL = `${endpointRecipes}/${item.id}`;
        const response = await fetch(URL);
        return response.json();
      });

      const allDetails = await Promise.all(detailPromises);

      const dataFromDetails = allDetails.filter(
        (data): data is RecipeData => data !== null
      );
      setRecipes(dataFromDetails);
    } catch (err) {
      console.error('Erro ao carregar receitas:', err);
    }
  };


  const handlePostRecipe = async () => {
    setPostStatus('Enviando receita...');
        if (!ACCESS_TOKEN || ACCESS_TOKEN.length < 50) { 
      setPostStatus('Erro: Token não configurado.');
      return;
    }

    try {
      const response = await fetch(endpointRecipes, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${ACCESS_TOKEN}`, 
        },
        body: JSON.stringify(mockNewRecipe),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        const errorMessage = `Falha ao cadastrar: ${response.status} ${response.statusText}. Detalhe: ${errorBody.substring(0, 150)}...`;
        setPostStatus(`Falha: ${response.statusText}`);
        throw new Error(errorMessage);
      }
      
      setPostStatus('Receita postada com sucesso!');
      
      await fetchAllRecipes(); 
      
    } catch (err) {
      console.error('Erro ao postar receita:', err);
      if (err instanceof Error) {
        setPostStatus(`Erro: ${err.message.substring(0, 50)}...`);
      } else {
        setPostStatus('Erro desconhecido ao postar.');
      }
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []); 

  const handleNavigateToDetailsRecipe = (recipe: RecipeData) => {
    const recipeDataString = JSON.stringify(recipe);
    router.push({
      pathname: "/DetailsRecipe",
      params: { recipeData: recipeDataString },
    } as any);
  };

  const handleNavigateToDetailsProduct = (product: ProductData) => {
    const recipeDataString = JSON.stringify(product);
    router.push({
      pathname: "/DetailsProduct",
      params: { recipeData: recipeDataString },
    } as any);
  }

  const handleNavigateToDetailsOrder = (order: OrderData) => {
    const orderDataString = JSON.stringify(order);
    router.push({
      pathname: "/DetailsOrder",
      params: { orderData: orderDataString },
    } as any);
  }

  return (
    <ScrollView>
      <ContainerListOFCards>
        <View>
          <ViewButtonTitle>
            <Title>Receitas {postStatus && `(${postStatus})`}</Title> 
            <TouchableOpacity onPress={() => router.push('/SeeMoreRecipes')} style={{ margin: 10 }}> Ver mais </TouchableOpacity>
            <TouchableOpacity onPress={handlePostRecipe} style={{ margin: 10, backgroundColor: 'lightblue', padding: 5 }}> POST TESTE </TouchableOpacity>
          </ViewButtonTitle>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <ListRecipes
              onCardPress={handleNavigateToDetailsRecipe}
              dataRecipe={recipes} 
              style={{ flexDirection: 'row', margin: 10 }}
              cardItemStyle={{}}
            />
          </ScrollView>
        </View>

        <View>
          <ViewButtonTitle>
            <Title>Produtos</Title>
            <TouchableOpacity onPress={() => router.push('/SeeMoreProducts')} style={{ margin: 10 }}> Ver mais </TouchableOpacity>
          </ViewButtonTitle>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ListProducts
              onCardPress={handleNavigateToDetailsProduct}
              dataProduct={mockProducts} 
              style={{ flexDirection: 'row', margin: 10 }}
              cardItemStyle={{}}
            />
          </ScrollView>
        </View>

        <View>
          <ViewButtonTitle>
            <Title> Encomendas</Title>
            <TouchableOpacity onPress={() => router.push('/SeeMoreOrders')} style={{ margin: 10 }}> Ver mais </TouchableOpacity>
          </ViewButtonTitle>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ListOrders
              onCardPress={handleNavigateToDetailsOrder}
              data={mockOrders} 
              style={{ flexDirection: 'row', margin: 10 }}
              cardItemStyle={{}}
            />
          </ScrollView>
        </View>
      </ContainerListOFCards>
    </ScrollView>
  );
};

export default HomePage;
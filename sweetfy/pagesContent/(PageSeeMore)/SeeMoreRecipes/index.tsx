import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useRouter } from 'expo-router';
import ListRecipes from '@/components/ListOfCards/ListRecipes';
import { ContainerHomePage, ViewTitle } from './style';
import DinamicButton from '@/components/Buttons';

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

////const YOUR_ACCESS_TOKEN = '[SEU_ACCESS_TOKEN_AQUI]';

const SeeMoreRecipes = () => {
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  /*const endpointRecipes = 'http://localhost:5190/api/recipes'; // --- MÉTODO POST CORRIGIDO E COM AUTENTICAÇÃO ---
  const handlePostRecipe = async () => {

    setPostStatus('Enviando receita...'); // Verifica se o token de acesso foi configurado.

    if (YOUR_ACCESS_TOKEN === '[SEU_ACCESS_TOKEN_AQUI]') {

      Alert.alert(

        'Aviso de Token',

        'Por favor, substitua a variável YOUR_ACCESS_TOKEN pelo seu token de acesso real para que o POST funcione.'

      );

      setPostStatus('Erro: Token não configurado.');

      return;

    }



    try {

      const response = await fetch(endpointRecipes, {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json', // INCLUSÃO CRÍTICA: Autenticação com o token JWT

          Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,

        },

        body: JSON.stringify(mockNewRecipe),

      });



      if (!response.ok) {

        const errorBody = await response.text();

        const errorMessage = `Falha ao cadastrar: ${response.status} ${

          response.statusText

        }. Detalhe: ${errorBody.substring(0, 150)}...`;

        setPostStatus(`Falha: ${response.statusText}`);

        throw new Error(errorMessage);

      } // Sucesso (código 201 Created é comum para POST)



      setPostStatus('Receita postada com sucesso!');

      Alert.alert(

        'Sucesso',

        'Receita MOCK postada! Recarregue para ver na lista.'

      ); // Opcional: Recarregar receitas após o sucesso // fetchAllRecipes();

    } catch (err) {

      console.error('Erro ao postar receita:', err);

      if (err instanceof Error) {

        setPostStatus(`Erro: ${err.message.substring(0, 50)}...`);

      } else {

        setPostStatus('Erro desconhecido ao postar.');

      }

    }

  }; // MÉTODO GET (mantido como solicitado)



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

  useEffect(() => {

    fetchAllRecipes();

  }, []); */

  const router = useRouter();
  const handleNavigateToDetailsRecipe = (recipe: RecipeData) => {
    const recipeDataString = JSON.stringify(recipe);

    router.push({
      pathname: '/DetailsRecipe',
      params: {
        recipeData: recipeDataString,
      },
    } as any);
  };

  const toggleItemSelection = (itemId: number) => {
    setSelectedItemIds((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };
  const handleSelectPress = () => {
    if (isSelectionModeActive) {
      setSelectedItemIds([]);
    }
    setIsSelectionModeActive((prev) => !prev);
  };
  const handleSelectAllPress = () => {
    const allIds = mockRecipes.map((p) => p.id);
    const currentlyAllSelected = selectedItemIds.length === mockRecipes.length;

    if (currentlyAllSelected) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(allIds);
    }

    if (!isSelectionModeActive) {
      setIsSelectionModeActive(true);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ContainerHomePage>
        <Text> Header </Text>

        <View style={{ backgroundColor: '#f1e5ebff' }}>
          <ViewTitle>Receitas</ViewTitle>

          <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
              <DinamicButton
                type="brownLight"
                onPress={handleSelectPress}
                buttonText="Selecionar"
                buttonStyle={{
                  margin: 10,
                  width: 150,
                  backgroundColor: 'white',
                }}
              />

              <DinamicButton
                type="brownLight"
                onPress={handleSelectAllPress}
                buttonText={
                  selectedItemIds.length === mockRecipes.length
                    ? 'Remover'
                    : 'Todos'
                }
                disabled={false}
                buttonStyle={{
                  margin: 10,
                  width: 150,
                  backgroundColor: 'white',
                }}
              />
            </View>

            {isSelectionModeActive ? (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      gap: 10,
                      borderRadius: 18,
                      width: 100,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      source={require('../../../assets/icons/edit.png')}
                      style={{
                        width: 15,
                        height: 15,
                      }}
                    />
                    Editar
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      gap: 10,
                      borderRadius: 18,
                      width: 100,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      source={require('../../../assets/icons/delete.png')}
                      style={{
                        width: 15,
                        height: 15,
                      }}
                    />
                    Excluir
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <ListRecipes
            onCardPress={handleNavigateToDetailsRecipe}
            dataRecipe={mockRecipes}
            showSelectionControls={isSelectionModeActive}
            selectedItemIds={selectedItemIds}
            onItemSelect={toggleItemSelection}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              margin: 10,
            }}
            cardItemStyle={{
              backgroundColor: '#FFFFFF',
            }}
          />
        </View>
      </ContainerHomePage>
    </ScrollView>
  );
};

export default SeeMoreRecipes;

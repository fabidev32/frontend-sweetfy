import React, { useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import ListRecipes from '@/components/ListOfCards/ListRecipes';
import { ContainerHomePage, ViewTitle } from './style';
import DinamicButton from '@/components/Buttons';
import { IRecipeData } from './type'
import {fetchAllRecipes} from './../../../api/homePage/getItem'



const SeeMoreRecipes = () => {
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
const [recipes, setRecipes] = useState<IRecipeData[]>([]);

useEffect(() => {
  fetchAllRecipes(setRecipes);
}, []); 
  fetchAllRecipes(setRecipes)


  const router = useRouter();
  const handleNavigateToDetailsRecipe = (recipe: IRecipeData) => {
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
    const allIds = recipes.map((p) => p.id);
    const currentlyAllSelected = selectedItemIds.length === recipes.length;

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
                  selectedItemIds.length === recipes.length
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
            dataRecipe={recipes}
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

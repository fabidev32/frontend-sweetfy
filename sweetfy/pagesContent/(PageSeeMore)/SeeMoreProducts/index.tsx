import React, { useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ProductData } from '@/components/Cards/ProductCard';

import DinamicButton from '@/components/Buttons';
import ListProducts from '@/components/ListOfCards/ListProducts';
import { ContainerHomePage, ViewTitle } from './style';

export const mockProducts = [
  {
    productId: 1,
    name: 'Bolo de chocolate',
    preparation: 'Pegue a massa e o recheio que foram produzidos',
    salePrice: 50.0,
    profitPercent: 20,
    productIngredients: [
      {
        ingredientId: 1,
        quantity: 2,
        unit: 'unidade',
      },
    ],
    productRecipes: [
      {
        recipeId: 1,
        quantity: 2,
      },
    ],
    productServices: [
      {
        serviceId: 1,
        quantity: 2,
      },
    ],
  },
  {
    productId: 2,
    name: 'Bolo de Cenoura',
    preparation: 'Misture a cenoura, ovo e farinha e leve ao forno.',
    salePrice: 45.5,
    profitPercent: 25,
    productIngredients: [
      {
        ingredientId: 2,
        quantity: 500,
        unit: 'gramas',
      },
    ],
    productRecipes: [
      {
        recipeId: 2,
        quantity: 1,
      },
    ],
    productServices: [
      {
        serviceId: 2,
        quantity: 1,
      },
    ],
  },
];

const SeeMoreProducts = () => {
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  const router = useRouter();

  const handleNavigateToDetailsProduct = (product: ProductData) => {
    const productDataString = JSON.stringify(product);
    router.push({
      pathname: '/DetailsRecipe',
      params: {
        productData: productDataString,
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
    const allIds = mockProducts.map((p) => p.productId);
    const currentlyAllSelected = selectedItemIds.length === mockProducts.length;

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
          <ViewTitle>Produtos</ViewTitle>

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
                  selectedItemIds.length === mockProducts.length
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

          <ListProducts
            onCardPress={handleNavigateToDetailsProduct}
            dataProduct={mockProducts}
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

export default SeeMoreProducts;

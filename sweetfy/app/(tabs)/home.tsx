import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import {fetchAllRecipes, fetchAllOrders, fetchAllProducts} from './../../api/homePage/getItem'
import { IRecipeData, IOrdersData, IProductData } from '@/api/homePage/type';
import { Title } from 'react-native-paper';
import {
  ContainerListOFCards,
  ViewButtonTitle,
} from '@/pagesContent/home/style';
import ListOrders from '@/components/ListOfCards/ListOrders';
import ListProducts from '@/components/ListOfCards/ListProducts';
import ListRecipes from '@/components/ListOfCards/ListRecipes';
 

const HomePage = () => {
  
  const [recipes, setRecipes] = useState<IRecipeData[]>([]);
  const [products, setProducts]
  = useState <IProductData[]>([]);
  const [orders, setOrders] = useState <IOrdersData[]>([]);
  
  
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
  
  useEffect(() => {
  fetchAllRecipes(setRecipes);
}, []); 
  fetchAllRecipes(setRecipes)



  const handleNavigateToDetailsProduct = (product: IProductData) => {
    const productDataString = JSON.stringify(product);
    router.push({
      pathname: '/DetailsProduct',
      params: {
        productData: productDataString,
      },
    } as any);
  };
  
  useEffect(() => {
  fetchAllProducts(setProducts);
}, []);
  fetchAllProducts(setProducts);


  const handleNavigateToDetailsOrder = (order: IOrdersData) => {
    const orderDataString = JSON.stringify(order);
    router.push({
      pathname: '/DetailsOrder',
      params: {
        orderData: orderDataString,
      },
    } as any);
  };
  
  useEffect(() => {
  fetchAllOrders(setOrders);
}, []);
fetchAllOrders(setOrders)



  return (
    <ScrollView>
      <ContainerListOFCards>
        <View>
          <ViewButtonTitle>
            <Title>Receitas</Title>
            <TouchableOpacity
              onPress={() => router.push('/seeMoreRecipes')}
              style={{ margin: 10 }}
            >
              {' '}
              Ver mais{' '}
            </TouchableOpacity>
          </ViewButtonTitle>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <ListRecipes
              onCardPress={handleNavigateToDetailsRecipe}
              dataRecipe= {recipes}
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
              onPress={() => router.push('/(tabs)/seeMoreProducts')}
              style={{ margin: 10 }}
            >
              {' '}
              Ver mais{' '}
            </TouchableOpacity>
          </ViewButtonTitle>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <ListProducts
              onCardPress={handleNavigateToDetailsProduct}
              dataProduct={products}
              style={{
                flexDirection: 'row',
                margin: 10,
              }}
              cardItemStyle={{}}
            ></ListProducts>
          </ScrollView>
        </View>

        <View>
          <ViewButtonTitle>
            <Title> Encomendas</Title>
            <TouchableOpacity
              onPress={() => router.push('/seeMoreOrders')}
              style={{ margin: 10 }}
            >
              {' '}
              Ver mais{' '}
            </TouchableOpacity>
          </ViewButtonTitle>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <ListOrders
              onCardPress={handleNavigateToDetailsOrder}
              data={orders}
              style={{
                flexDirection: 'row',
                margin: 10,
              }}
              cardItemStyle={{}}
            ></ListOrders>
          </ScrollView>
        </View>
      </ContainerListOFCards>
    </ScrollView>
  );
};

export default HomePage;
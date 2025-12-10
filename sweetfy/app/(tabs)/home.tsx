import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchAllRecipes, fetchAllOrders, fetchAllProducts, fetchAllIngredients, fetchAllServices } from './../../api/homePage/getItem'
import { IRecipeData, IOrdersData, IProductData, IIngredientData, IServiceData } from '@/api/homePage/type';
import { Title } from 'react-native-paper';
import {
  ContainerListOFCards,
  ViewButtonTitle,
  TextSeeMore

} from '@/pagesContent/home/style';
import ListOrders from '@/components/ListOfCards/ListOrders';
import ListProducts from '@/components/ListOfCards/ListProducts';
import ListRecipes from '@/components/ListOfCards/ListRecipes';
import ListIngredientsHomePage from '@/components/ListOfCards/ListingredientsHomePage/index'
import ListServicesHomePage from '@/components/ListOfCards/ListServicesHomePage/index'

const HomePage = () => {

  const [recipes, setRecipes] = useState<IRecipeData[]>([]);
  const [products, setProducts]
    = useState<IProductData[]>([]);
  const [orders, setOrders] = useState<IOrdersData[]>([]);
  const [ingredients, setIngredients] = useState<IIngredientData[]>([]);
  const [services, setServices] = useState<IServiceData[]>([]);


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

  const handleNavigateToDetailsIngredients = (ingredient: IIngredientData) => {
    const ingredientDataString = JSON.stringify(ingredient);
    router.push({
      pathname: '/DetailsIngredients',
      params: {
        ingredientData: ingredientDataString,
      },
    } as any);
  };

  useEffect(() => {
    fetchAllIngredients(setIngredients);
  }, []);


  useEffect(() => {
    fetchAllServices(setServices);
  }, []);



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
              <TextSeeMore> Ver mais</TextSeeMore>
            </TouchableOpacity>
          </ViewButtonTitle>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <ListRecipes
              onCardPress={handleNavigateToDetailsRecipe}
              dataRecipe={recipes}
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
              <TextSeeMore> Ver mais</TextSeeMore>
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
              <TextSeeMore> Ver mais</TextSeeMore>
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

        <View>
          <ViewButtonTitle>
            <Title> Ingredientes </Title>
            <TouchableOpacity
              onPress={() => router.push('/seeMoreIngredients')}
              style={{ margin: 10 }}
            >
              <TextSeeMore> Ver mais</TextSeeMore>
            </TouchableOpacity>
          </ViewButtonTitle>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <ListIngredientsHomePage
              data={ingredients}
              style={{
                flexDirection: 'row',
                margin: 10,
              }}
              cardItemStyle={{}}
            ></ListIngredientsHomePage>
          </ScrollView>
        </View>

        <View>
          <ViewButtonTitle>
            <Title> Serviços </Title>
            <TouchableOpacity
              onPress={() => router.push('/seeMoreServices')}
              style={{ margin: 10 }}
            >
              <TextSeeMore> Ver mais</TextSeeMore>
            </TouchableOpacity>
          </ViewButtonTitle>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <ListServicesHomePage
              data={services}
              style={{
                flexDirection: 'row',
                margin: 10,
              }}
              cardItemStyle={{}}
            ></ListServicesHomePage>
          </ScrollView>
        </View>
      </ContainerListOFCards>
    </ScrollView>
    
  );
};

export default HomePage;
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import FieldNameAndValue from '@/components/FieldNameAndValue';
import Product from '@/pagesContent/(PageDetails)/DetailsOrder/Items/Products';
import Recipe from '@/pagesContent/(PageDetails)/DetailsOrder/Items/Recipes';

import {
  PageText,
  PageTitle,
  ViewContainer,
  ViewDescription,
  ViewProduct,
} from './style';
import {IOrdersData} from './type'



const PageDetailsOrders = () => {
  const params = useLocalSearchParams();
  const orderDataParam = params.orderData;
  const orderDataJson = Array.isArray(orderDataParam)
    ? orderDataParam[0]
    : orderDataParam;
  const order: IOrdersData | null = orderDataJson
    ? JSON.parse(orderDataJson as string)
    : null;

  if (!order) {
    return <PageText>Encomenda não encontrada.</PageText>;
  }

  const formatCurrency = (value: string) => `R$ ${value.replace('.', ',')}`;

  return (
    <ScrollView>
      <ViewContainer>
        <ViewProduct>
          <ViewDescription>
            <PageTitle> {order.name} </PageTitle>

            <FieldNameAndValue
              name="Custo total"
              value={formatCurrency(order.totalCost.toString())}
              nameStyle={{ fontSize: 25, fontWeight: 'bold' }}
              valueStyle={{ fontSize: 25 }}
            />

            <FieldNameAndValue
              name="Preço de venda"
              value={formatCurrency(order.salePrice.toString())}
              nameStyle={{ fontSize: 25, fontWeight: 'bold' }}
              valueStyle={{ fontSize: 25 }}
            />

            <PageTitle> Modo de preparo </PageTitle>
            <PageText> {order.description}</PageText>

            <PageTitle> Receitas </PageTitle>

            <View>
              {order.ordersRecipes?.map((item) => (
                <Recipe
                  key={item.id}
                  data={item}
                  quantity={item.quantity}
                />
              ))}
            </View>

            <PageTitle> Produtos </PageTitle>

            <View>
              {order.orderProducts?.map((item) => (
                <Product
                  key={item.productId}
                  data={item}
                  quantity={item.quantity}
                />
              ))}
            </View>

            <PageTitle> Gastos totais </PageTitle>
          </ViewDescription>
        </ViewProduct>
      </ViewContainer>
    </ScrollView>
  );
};

export default PageDetailsOrders;

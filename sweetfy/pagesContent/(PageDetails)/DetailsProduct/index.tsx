import * as React from 'react';
import { View, ScrollView } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import FieldNameAndValue from '@/components/FieldNameAndValue';
import Ingredients from './Items/Ingredients/index';
import Recipes from './Items/Recipes/index'
import Services from './Items/Services/index'

import {
  PageText,
  ViewContainer,
  ViewProduct,
  ViewDescription,
  PageTitle,
} from './style';
import { IProductData } from './type';


const calculateItemCost = (
  price: number | string | undefined | null,
  quantity: number | string | undefined | null
) => {
  const p = parseFloat(price as any) || 0;
  const q = parseFloat(quantity as any) || 0;
  return p * q;
};

const PageDetailsProduct = () => {
  const [ingredientCosts, setIngredientCosts] = useState<
    Record<number, number>
  >({});
  const [serviceCosts, setServiceCosts] = useState<Record<number, number>>({});
  const [recipeCosts, setRecipeCosts] = useState<Record<number, number>>({});

  const params = useLocalSearchParams();
  const productDataParam = params.recipeData;
  const productDataJson = Array.isArray(productDataParam)
    ? productDataParam[0]
    : productDataParam;
  const product: IProductData | null = productDataJson
    ? JSON.parse(productDataJson as string)
    : null;

  if (!product) {
    return <PageText>Produto não encontrado.</PageText>;
  }

  React.useEffect(() => {
    if (!product) return;

    const initialIngredientCosts = (product.productIngredients || []).reduce(
      (acc, item) => {
        acc[item.id] = calculateItemCost(item.unitPriceSnapshot, item.quantity);
        return acc;
      },
      {} as Record<number, number>
    );

    const initialServiceCosts = (product.productServices || []).reduce(
      (acc, item) => {
        const cost = (item.unitPriceSnapshot|| 0) * (item.quantity || 1);
        acc[item.id] = cost;
        return acc;
      },
      {} as Record<number, number>
    );

    const initialRecipeCosts = (product.productRecipes || []).reduce(
      (acc, item) => {
        const costPerUnit = parseFloat(item.unitPriceSnapshot as any) || 0;
        const quantity = parseFloat(item.quantity as any) || 1;

        acc[item.id] = costPerUnit * quantity;
        return acc;
      },
      {} as Record<number, number>
    );

    setIngredientCosts(initialIngredientCosts);
    setServiceCosts(initialServiceCosts);
    setRecipeCosts(initialRecipeCosts);
  }, [product.id]);

  const updateIngredientCost = useCallback((itemId: number, cost: number) => {
    setIngredientCosts((prevCosts) => ({
      ...prevCosts,
      [itemId]: cost,
    }));
  }, []);

  const updateServiceCost = useCallback((itemId: number, cost: number) => {
    setServiceCosts((prevCosts) => ({
      ...prevCosts,
      [itemId]: cost,
    }));
  }, []);

  const updateRecipeCost = useCallback((itemId: number, cost: number) => {
    setRecipeCosts((prevCosts) => ({
      ...prevCosts,
      [itemId]: cost,
    }));
  }, []);

  const totalCostValue = useMemo(() => {
    const ingredientsBaseCost = Object.values(ingredientCosts).reduce(
      (sum, cost) => sum + cost,
      0
    );
    const servicesBaseCost = Object.values(serviceCosts).reduce(
      (sum, cost) => sum + cost,
      0
    );
    const recipesBaseCost = Object.values(recipeCosts).reduce(
      (sum, cost) => sum + cost,
      0
    );

    const baseCost = ingredientsBaseCost + servicesBaseCost + recipesBaseCost;
    return baseCost.toFixed(2);
  }, [ingredientCosts, serviceCosts, recipeCosts]);

  const formatCurrency = (value: string) => `R$ ${value.replace('.', ',')}`;

  return (
    <ScrollView>
      <ViewContainer>
        <ViewProduct>
          <ViewDescription>
            <PageTitle> {product.name} </PageTitle>

            <FieldNameAndValue
              name="Custo total"
              value={formatCurrency(totalCostValue)}
              nameStyle={{ fontSize: 25, fontWeight: 'bold' }}
              valueStyle={{ fontSize: 25 }}
            />

            <FieldNameAndValue
              name="Preço de venda"
              value={formatCurrency(product.salePrice.toString())}
              nameStyle={{ fontSize: 25, fontWeight: 'bold' }}
              valueStyle={{ fontSize: 25 }}
            />

            <PageTitle> Modo de preparo </PageTitle>
            <PageText> {product.preparation}</PageText>

            <PageTitle> Receitas </PageTitle>

            <View>
              {product.productRecipes?.map((item) => (
                <Recipes
                  key={item.id}
                  data={item}
                  quantity={item.quantity}
                />
              ))}
            </View>

            <PageTitle> Gastos totais </PageTitle>

            <View>
              {product.productIngredients?.map((item) => (
                <Ingredients
                  key={item.id}
                  data={item}
                  onCostCalculated={updateIngredientCost}
                />
              ))}
            </View>

            <View>
              {product.productServices?.map((item) => (
                <Services
                  key={item.id}
                  data={item}
                  onCostCalculated={updateServiceCost}
                  quantity={item.quantity}
                />
              ))}
            </View>
          </ViewDescription>
        </ViewProduct>
      </ViewContainer>
    </ScrollView>
  );
};

export default PageDetailsProduct;

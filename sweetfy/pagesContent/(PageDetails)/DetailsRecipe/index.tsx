import { View, ScrollView } from 'react-native';
import { IRecipeData } from './type';

import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FieldNameAndValue from '@/components/FieldNameAndValue';
import { applyRecipeMargin } from './../../../components/ListOfCards/utils';
import Ingredients from './Items/Ingredients/index';
import Service from './Items/Services/index';
import {
  PageText,
  ViewContainer,
  ViewRecipe,
  ViewDescription,
  PageTitle,
} from './style';


const calculateItemCost = (
  price: number | string | undefined | null,
  quantity: number | string | undefined | null
) => {
  const p = parseFloat(price as any) || 0;
  const q = parseFloat(quantity as any) || 0;
  return p * q;
};

const PageDetailsRecipe = () => {
  const [ingredientCosts, setIngredientCosts] = useState<
    Record<number, number>
  >({});
  const [serviceCosts, setServiceCosts] = useState<Record<number, number>>({});

  const params = useLocalSearchParams();
  const recipeDataParam = params.recipeData;
  const recipeDataJson = Array.isArray(recipeDataParam)
    ? recipeDataParam[0]
    : recipeDataParam;
  const recipe: IRecipeData | null = recipeDataJson
    ? JSON.parse(recipeDataJson as string)
    : null;

  if (!recipe) {
    return <PageText>Receita não encontrada.</PageText>;
  }

  let quantityServices = 0;

  useEffect(() => {
    if (!recipe) return;

    const initialIngredientCosts = (recipe.recipeIngredients || []).reduce(
      (acc, item) => {
        acc[item.id] = calculateItemCost(item.unitPriceSnapshot, item.quantity);
        return acc;
      },
      {} as Record<number, number>
    );

    const initialServiceCosts = (recipe.recipeServices || []).reduce((acc, item) => {
      quantityServices += 1;
      const cost = (item.unitPriceSnapshot || 0) * 1;
      acc[item.id] = cost;
      return acc;
    }, {} as Record<number, number>);

    setIngredientCosts(initialIngredientCosts);
    setServiceCosts(initialServiceCosts);
  }, [recipe.id]);

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

  const totalCostValue = useMemo(() => {
    const ingredientsBaseCost = Object.values(ingredientCosts).reduce(
      (sum, cost) => sum + cost,
      0
    );
    const servicesBaseCost = Object.values(serviceCosts).reduce(
      (sum, cost) => sum + cost,
      0
    );
    const baseCost = ingredientsBaseCost + servicesBaseCost;

    if (baseCost === 0 && recipe.totalCost > 0) {
      return String(recipe.totalCost.toFixed(2));
    }

    const finalCost = applyRecipeMargin(baseCost, recipe.additionalCostPercent);

    return finalCost.toFixed(2);
  }, [
    ingredientCosts,
    serviceCosts,
    recipe.additionalCostPercent,
    recipe.totalCost,
  ]);

  const formatYield = `${recipe.yieldQuantity} ${recipe.yieldUnit}`;
  const formatCurrency = (value: string) => `R$ ${value.replace('.', ',')}`;

  return (
    <ScrollView>
      <ViewContainer>
        <ViewRecipe>
          <ViewDescription>
            <PageTitle> {recipe.name} </PageTitle>

            <FieldNameAndValue
              name="Rendimento"
              value={formatYield}
              nameStyle={{ fontSize: 25, fontWeight: 'bold' }}
              valueStyle={{ fontSize: 25 }}
            />
            <FieldNameAndValue
              name="Custo total"
              value={formatCurrency(totalCostValue)}
              nameStyle={{ fontSize: 25, fontWeight: 'bold' }}
              valueStyle={{ fontSize: 25 }}
            />
            <PageText> {recipe.preparation}</PageText>

            <PageTitle> Gastos totais </PageTitle>

            <View>
              {recipe.recipeIngredients?.map((item) => (
                <Ingredients
                  key={item.id} 
                  data={item}
                  onCostCalculated={(cost, id) => console.log(cost, id)}
                />
              ))}
        
            </View>

            <View>
              {recipe.recipeServices.map((item) => (
                <Service
                  key={item.id}
                  data={item}
                  onCostCalculated={updateServiceCost}
                  quantity={item.quantity}
                />
              ))}
            </View>
          </ViewDescription>
        </ViewRecipe>
      </ViewContainer>
    </ScrollView>
  );
};

export default PageDetailsRecipe;

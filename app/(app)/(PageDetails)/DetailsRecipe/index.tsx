import * as React from 'react';
import { View } from 'react-native';
import { PageText, PageTitle, ViewDescription, ViewContainer, ViewRecipe } from './style';
import FieldNameAndValue from '@/components/FieldNameAndValue';
import Ingredients from "@/components/Items/ContainerItems/Ingredients/index";
import Service from "@/components/Items/ContainerItems/Services/index";
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { fontSize } from '@/theme/theme';

interface RecipeIngredient {
  id: number;
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  unit: string;
  unitPriceSnapshot: number;
}

interface RecipeService {
  id: number;
  serviceId: number;
  serviceName: string;
  quantity: number;
  unitPriceSnapshot: number;
}

interface RecipeData {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  additionalCostPercent: number;
  recipeIngredients: RecipeIngredient[];
  services: RecipeService[];
}

interface RecipeDataWithCost extends RecipeData {
  totalCost: number;
}

const calculateItemCost = (price: number, quantity: number) => {
  const p = typeof price === 'number' ? price : 0;
  const q = typeof quantity === 'number' ? quantity : 0;
  return p * q;
};

const PageDetailsRecipe = () => {

  const [ingredientCosts, setIngredientCosts] = useState<Record<number, number>>({});
  const [serviceCosts, setServiceCosts] = useState<Record<number, number>>({});

  const params = useLocalSearchParams();
  const recipeDataParam = params.recipeData;

  const recipeDataJson = Array.isArray(recipeDataParam) ? recipeDataParam[0] : recipeDataParam;

  const recipe: RecipeDataWithCost | null = recipeDataJson
    ? JSON.parse(recipeDataJson as string)
    : null;

  if (!recipe) {
    return <PageText>Receita não encontrada.</PageText>;
  }

  React.useEffect(() => {

    if (!recipe) return;

    const initialIngredientCosts = (recipe.recipeIngredients || []).reduce((acc, item) => {
      acc[item.id] = calculateItemCost(item.unitPriceSnapshot, item.quantity);
      return acc;
    }, {} as Record<number, number>);

    const initialServiceCosts = (recipe.services || []).reduce((acc, item) => {
      acc[item.id] = calculateItemCost(item.unitPriceSnapshot, item.quantity);
      return acc;
    }, {} as Record<number, number>);

    setIngredientCosts(initialIngredientCosts);
    setServiceCosts(initialServiceCosts);

  }, [recipe.id]);


  const updateIngredientCost = useCallback((itemId: number, cost: number) => {
    setIngredientCosts(prevCosts => ({
      ...prevCosts,
      [itemId]: cost,
    }));
  }, []);

  const updateServiceCost = useCallback((itemId: number, cost: number) => {
    setServiceCosts(prevCosts => ({
      ...prevCosts,
      [itemId]: cost,
    }));
  }, []);



  const totalCostValue = useMemo(() => {

    const ingredientsBaseCost = Object.values(ingredientCosts).reduce((sum, cost) => sum + cost, 0);
    const servicesBaseCost = Object.values(serviceCosts).reduce((sum, cost) => sum + cost, 0);

    const baseCost = ingredientsBaseCost + servicesBaseCost;

    if (baseCost === 0 && recipe.totalCost > 0) {
      return String(recipe.totalCost.toFixed(2));
    }

    const additionalCost = baseCost * (recipe.additionalCostPercent / 100);

    return (baseCost + additionalCost).toFixed(2);

  }, [ingredientCosts, serviceCosts, recipe.additionalCostPercent, recipe.totalCost]);
  const formatYield = `${recipe.yieldQuantity} ${recipe.yieldUnit}`;
  const formatCurrency = (value: string) => `R$ ${value.replace('.', ',')}`;


  return (
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



          <View>
            {recipe.recipeIngredients?.map((item) => (
              <Ingredients
                key={item.id}
                data={item}
                onCostCalculated={updateIngredientCost}
              />
            ))}
          </View>

          <View>
            {recipe.services?.map((item) => (
              <Service
                key={item.id}
                data={item}
                onCostCalculated={updateServiceCost}
              />
            ))}
          </View>
        </ViewDescription>
      </ViewRecipe>
    </ViewContainer>
  );
};

export default PageDetailsRecipe;
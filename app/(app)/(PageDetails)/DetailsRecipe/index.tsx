import * as React from 'react';
import { View, Text } from 'react-native';
import FieldNameAndValue from '@/components/FieldNameAndValue';
import Ingredients from "@/components/Items/ContainerItems/Ingredients/index";
import Service from "@/components/Items/ContainerItems/Services/index";
import { H3 } from '@/theme/fontsTheme';

const mockRecipes = [
  // ... Receita 1 ...
  {
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
    services: [
      { "id": 1, "serviceId": 1, "serviceName": "Uber", "quantity": 1, "unitPriceSnapshot": 20 }
    ]
  },
  // ... Receita 2 ...
  {
    id: 2,
    recipeId: 2,
    name: 'Brigadeiro Gourmet',
    yieldQuantity: 15,
    yieldUnit: 'unidades',
    preparation: 'Utilize chocolate nobre e siga o processo de temperagem.',
    additionalCostPercent: 10,
    recipeIngredients: [
      { id: 2, ingredientId: 2, ingredientName: 'Chocolate Nobre', quantity: 300, unit: 'g', unitPriceSnapshot: 15 },
    ],
    services: [], 
  },
];

interface PropsPageDetails {
  id: number;
}

const PageDetailsRecipe = ({ id }: PropsPageDetails) => {

  const recipe = mockRecipes.find(r => r.id === id); 
  
  const [ingredientCosts, setIngredientCosts] = React.useState<Record<number, number>>({});
  const [serviceCosts, setServiceCosts] = React.useState<Record<number, number>>({});

  if (!recipe) {
    return <Text>Receita não encontrada.</Text>;
  }

  const updateIngredientCost = React.useCallback((itemId: number, cost: number) => {
    setIngredientCosts(prevCosts => ({
      ...prevCosts,
      [itemId]: cost,
    }));
  }, []);

  const updateServiceCost = React.useCallback((itemId: number, cost: number) => {
    setServiceCosts(prevCosts => ({
      ...prevCosts,
      [itemId]: cost,
    }));
  }, []);

  const totalCostValue = React.useMemo(() => {
    const ingredientsBaseCost = Object.values(ingredientCosts).reduce((sum, cost) => sum + cost, 0);
    const servicesBaseCost = Object.values(serviceCosts).reduce((sum, cost) => sum + cost, 0);
    const baseCost = ingredientsBaseCost + servicesBaseCost;
    
    const additionalCost = baseCost * (recipe.additionalCostPercent / 100); 
    
    return (baseCost + additionalCost).toFixed(2);
  }, [ingredientCosts, serviceCosts, recipe.additionalCostPercent]); 
  
  const formatYield = `${recipe.yieldQuantity} ${recipe.yieldUnit}`;
  const formatCurrency = (value: string) => `R$ ${value.replace('.', ',')}`;

  return (
    <View>
      <H3> {recipe.name} </H3>

      <FieldNameAndValue
        name="Rendimento"
        value={formatYield}
      />
      <FieldNameAndValue
        name="Custo total"
        value={formatCurrency(totalCostValue)} 
      />
      <Text> {recipe.preparation}</Text>

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
    </View>
  );
};

export default PageDetailsRecipe;
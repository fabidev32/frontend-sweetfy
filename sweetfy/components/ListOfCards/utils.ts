import {IRecipeData} from './ListRecipes/type'
import {IProductData} from './ListProducts/type'


export const calculateBaseItemsCost = (
  items: any[],
  priceKey: string,
  quantityKey: string = 'quantity'
): number => {
  return (items || []).reduce((soma, item) => {
    const rawPrice = item[priceKey] || item.unitPrice;
    const price = parseFloat(rawPrice as any) || 0;
    const quantity = parseFloat(item[quantityKey] as any) || 0;

    return soma + price * quantity;
  }, 0);
};

export const applyRecipeMargin = (
  baseCost: number,
  percent: number
): number => {
  const additionalCost = baseCost * (percent / 100);
  return baseCost + additionalCost;
};

// Receitas

export const calculateRecipeTotalCost = (dataRecipe: IRecipeData): number => {
  const costAllItensIngredients = calculateBaseItemsCost(
    dataRecipe.recipeIngredients,
    'unitPriceSnapshot'
  );

  const costAllItensServices = calculateBaseItemsCost(
    dataRecipe.recipeServices || [],
    'unitPriceSnapshot'
  );

  const baseCostTotal = costAllItensIngredients + costAllItensServices;

  const additionalFeeRate = dataRecipe.additionalCostPercent / 100;
  const totalCostWithAdditionalFee =
    baseCostTotal * (1 + additionalFeeRate);

  const yieldQuantity = parseFloat(dataRecipe.yieldQuantity as any) || 1;

  return yieldQuantity > 0
    ? totalCostWithAdditionalFee / yieldQuantity
    : 0;
};

//Produtos


export const calculateProductTotalCost = (
  dataProduct: IProductData,
  calculateRecipeTotalCost: (data: any) => number 
): number => {
  const costAllItensIngredients = calculateBaseItemsCost(
    dataProduct.productIngredients,
    'unitPriceSnapshot'
  );

  const costAllItensServices = calculateBaseItemsCost(
    dataProduct.productServices,
    'unitPriceSnapshot'
  );

  const costAllItensRecipes = (dataProduct.productRecipes || []).reduce(
    (soma, productRecipeItem) => {

      const recipeUnitCost =
        calculateRecipeTotalCost(productRecipeItem as unknown as IRecipeData) || 0;

      const quantity = parseFloat(productRecipeItem.quantity as any) || 0;

      const totalCostRecipeItem = recipeUnitCost * quantity;

      return soma + totalCostRecipeItem;
    },
    0
  );

  const baseCostTotal =
    costAllItensIngredients + costAllItensServices + costAllItensRecipes;

  return baseCostTotal;
};
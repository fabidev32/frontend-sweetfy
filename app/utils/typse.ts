export interface ServiceData {
  id: number;
  name: string;
  description: string;
  providerName: string;
  unit: string;
  unitPrice: number;
}

export interface IngredientData {
  id: number;
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  unit: string;
  unitPriceSnapshot: number | string | undefined | null;
  itemCost?: number;
}

export interface RecipeData {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  additionalCostPercent: number;
  recipeIngredients: IngredientData[];
  recipeServices?: ServiceData[];
}

export interface ProductData {
  productId: number;
  name: string;
  preparation: string;
  salePrice: number;
  profitPercent: number;
  productIngredients: IngredientData[];
  productRecipes: RecipeData[];
  productServices: ServiceData[];
}

export interface OrderData {
    id: number,
    name: string,
    description: string,
    totalYield: number,
    totalCost: number,
    salePrice: number,
    profit: number,
    status: string,
    orderProducts: OrderProduct[];
    orderRecipes: OrderRecipe[];
}

//Order data

export interface OrderProduct {
      id: number,
      productId: number,
      productName: string,
      quantity: number,
      unitPriceSnapshot: number,
      costSnapshot: number
}

export interface OrderRecipe {
       id: number,
       recipeId: number,
       recipeName: string,
       quantity: number,
       unitPriceSnapshot: number,
       costSnapshot: number

}

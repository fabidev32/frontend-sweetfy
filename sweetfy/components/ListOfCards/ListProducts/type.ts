export interface IProductData {
  id: number;
  name: string;
  preparation: string;
  baseCost: number;
  salePrice: number;
  profitPercent: number;
  profitAmount: number;
  totalCost: number;
  productIngredients: IProductIngredients[];
  productRecipes: IProductRecipes[];
  productServices: IProductServices[];
}

export interface IProductIngredients {
  id: number;
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  unit: string;
  unitPriceSnapshot: number;
}

export interface IProductRecipes {
  id: number;
  recipeId: number;
  recipeName: number;
  quantity: number;
  unitPriceSnapshot: number;
}

export interface IProductServices {
  id: number;
  serviceId: number;
  serviceName: string;
  quantity: number;
  unitPriceSnapshot: number;
}

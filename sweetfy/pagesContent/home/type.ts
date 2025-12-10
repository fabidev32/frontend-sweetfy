
// Ingredientes 

export interface IIngredientsData {
  id: number;
  name: string,
  description: string,
  brand: string,
  quantity: number,
  unit: string,
  unitPrice: number
}

//Serviços

export interface IServiceData {

    id: number,
    name: string,
    description: string,
    providerName: string,
    unit: string,
    unitPrice: number,
}




// Receitas

export interface IRecipeData {
  id: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  totalCost: number;
  preparation: string;
  additionalCostPercent: number;
  recipeIngredients: IRecipeIngredients[];
  recipeServices?: IRecipeServices[];
}

export interface IRecipeIngredients {
  id: number;
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  unit: string;
  unitPriceSnapshot: string;
}

export interface IRecipeServices {
  id: number;
  serviceId: number;
  serviceName: string;
  quantity: number;
  unitPriceSnapshot: number;
}

//Produtos

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

//Encomendas

export interface IOrdersData {
  id: number;
  name: string;
  description: string;
  totalYield: number;
  totalCost: number;
  salePrice: number;
  profit: number;
  status: string;
  orderProducts: IOrdersProducts[];
  orderRecipes: IOrdersRecipes[];
}

export interface IOrdersProducts {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPriceSnapshot: number;
  costSnapshot: number;
}

export interface IOrdersRecipes {
  id: number;
  recipeId: number;
  recipeName: string;
  quantity: number;
  unitPriceSnapshot: number;
  costSnapshot: number;
}

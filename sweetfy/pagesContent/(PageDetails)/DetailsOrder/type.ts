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
  ordersRecipes: IOrdersRecipes[];
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

export interface IRecipeData {
  id: number,
  name: string,
  yieldQuantity: number,
  yieldUnit: string,
  totalCost: number,
  preparation: string,
  additionalCostPercent: number,
  recipeIngredients: IRecipeIngredients[],
  recipeServices?: IRecipeServices[]
}

export interface IRecipeIngredients {
    id: number,
    ingredientId: number,
    ingredientName: string,
    quantity: number,
    unit: string,
    unitPriceSnapshot: string 
}

export interface IRecipeServices {
    id: number,
    serviceId: number,
    serviceName: string,
    quantity: number,
    unitPriceSnapshot: number
}
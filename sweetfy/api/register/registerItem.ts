import { IIngredient, IPostProductRequest, IProduct, IRecipe, IRegisterIngredientsRequest, IRegisterRecipeRequest, IRegisterServiceRequest, IService } from './types';
import api from "../pathConfiguration";

// Ingredients
export async function fetchRegisterIngredients(request: IRegisterIngredientsRequest) {
  const response = await api.post('/ingredients', request);
  return response.data;
}

export async function fetchGetIngredients():Promise<IIngredient[]>{
  const response = await api.get('/ingredients')
  return response.data;
}

// Services
export async function fetchRegisterServices(request: IRegisterServiceRequest) {
  const response = await api.post('/services', request);
  return response.data;
}

export async function fetchGetServices():Promise<IService[]>{
  const response = await api.get('/services')
  return response.data;
}

//Recipes
export async function fetchRegisterRecipes(request: IRegisterRecipeRequest) {
  const response = await api.post('/recipes', request);
  return response.data;
}

export async function fetchGetRecipes():Promise<IRecipe[]>{
  const response = await api.get('/recipes')
  return response.data;
}

//Products
export async function postProducts(request: IPostProductRequest) {
  const response = await api.post('/products', request);
  return response.data;
}

export async function getProducts():Promise<IProduct[]>{
  const response = await api.get('/products')
  return response.data;
}

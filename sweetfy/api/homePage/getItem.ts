import {
  IRecipeData,
  IProductData,
  IOrdersData,
  IIngredientData,
  IServiceData,
  ServiceId,
  RecipeId,
  ProductId,
  OrderId,
  IngredientId,
} from './type';

import api from '../pathConfiguration';

type SetRecipesFunction = (data: IRecipeData[]) => void;
type SetProductsFunction = (data: IProductData[]) => void;
type SetOrdersFunction = (data: IOrdersData[]) => void;
type SetIngredientsFunction = (data: IIngredientData[]) => void;
type SetServicesFunction = (data: IServiceData[]) => void;

const endpointRecipes = '/recipes';
const endpointProducts = '/products';
const endpointOrders = '/orders';
const endpointIngredients = '/ingredients';
const endpointServices = '/services';


export const fetchAllRecipes = async (setRecipes: SetRecipesFunction) => {
  try {
    const initialResponse = await api.get<RecipeId[]>(endpointRecipes);

    const listRecipesById: RecipeId[] = initialResponse.data;

    const detailPromises = listRecipesById.map(async (item: RecipeId) => {
      const URL = `${endpointRecipes}/${item.id}`;
      const response = await api.get<IRecipeData>(URL);
      return response.data;
    });

    const allDetails = await Promise.all(detailPromises);

    const dataFromDetails = allDetails.filter(
      (data): data is IRecipeData => data !== null
    );

    setRecipes(dataFromDetails);
  } catch (err) {
    console.error('Erro ao carregar receitas:', err);
  }
};

export const fetchAllProducts = async (setProducts: SetProductsFunction) => {
  try {
    const initialResponse = await api.get<ProductId[]>(endpointProducts);
    const listProductsById: ProductId[] = initialResponse.data;

    const detailPromises = listProductsById.map(async (item: ProductId) => {
      const URL = `${endpointProducts}/${item.id}`;
      const response = await api.get<IProductData>(URL);
      return response.data;
    });

    const allDetails = await Promise.all(detailPromises);

    const dataFromDetails = allDetails.filter(
      (data): data is IProductData => data !== null
    );

    setProducts(dataFromDetails);
  } catch (err) {
    console.error('Erro ao carregar produtos:', err);
  }
};

export const fetchAllOrders = async (setOrders: SetOrdersFunction) => {
  try {
    const initialResponse = await api.get<OrderId[]>(endpointOrders);
    const listOrdersById: OrderId[] = initialResponse.data;

    const detailPromises = listOrdersById.map(async (item: OrderId) => {
      const URL = `${endpointOrders}/${item.id}`;
      const response = await api.get<IOrdersData>(URL);
      return response.data;
    });

    const allDetails = await Promise.all(detailPromises);

    const dataFromDetails = allDetails.filter(
      (data): data is IOrdersData => data !== null
    );

    setOrders(dataFromDetails);
  } catch (err) {
    console.error('Erro ao carregar encomendas:', err);
  }
};

export const fetchAllIngredients = async (
  setIngredients: SetIngredientsFunction
) => {
  try {
    const initialResponse = await api.get<IngredientId[]>(endpointIngredients);
    const listIngredinetsById: IngredientId[] = initialResponse.data;

    const detailPromises = listIngredinetsById.map(
      async (item: IngredientId) => {
        const URL = `${endpointIngredients}/${item.id}`;
        const response = await api.get<IIngredientData>(URL);
        return response.data;
      }
    );

    const allDetails = await Promise.all(detailPromises);

    const dataFromDetails = allDetails.filter(
      (data): data is IIngredientData => data !== null
    );

    setIngredients(dataFromDetails);
  } catch (err) {
    console.error('Erro ao carregar ingredientes:', err);
  }
};


export const fetchAllServices = async (
  setServices: SetServicesFunction
) => {
  try {
    const initialResponse = await api.get<ServiceId[]>(endpointServices);

    const listServicesById: ServiceId[] = initialResponse.data; 

    const detailPromises = listServicesById.map(
      async (item: ServiceId) => {
        const URL = `${endpointServices}/${item.id}`;
        const response = await api.get<IServiceData>(URL);
        return response.data;
      }
    );

    const allDetails = await Promise.all(detailPromises);

    const dataFromDetails = allDetails.filter(
      (data): data is IServiceData => data !== null
    );

    setServices(dataFromDetails);
  } catch (err) {
    console.error('Erro ao carregar serviços:', err);
  }
};

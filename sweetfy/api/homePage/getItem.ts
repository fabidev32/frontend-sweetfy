import {
  IRecipeData,
  IProductData,
  IOrdersData,
  RecipeId,
  ProductId,
  OrderId,
} from './type';

type SetRecipesFunction = (data: IRecipeData[]) => void;
type SetProductsFunction = (data: IProductData[]) => void;
type SetOrdersFunction = (data: IOrdersData[]) => void;

const endpointRecipes = 'http://localhost:5190/api/recipes';

export const fetchAllRecipes = async (setRecipes: SetRecipesFunction) => {
  try {
    const initialResponse = await fetch(endpointRecipes);
    if (!initialResponse.ok) {
      throw new Error(
        `Erro de servidor ao buscar a lista de IDs: ${initialResponse.status}`
      );
    }
    const listRecipesById: RecipeId[] = await initialResponse.json();

    const detailPromises = listRecipesById.map(async (item: RecipeId) => {
      const URL = `${endpointRecipes}/${item.id}`;
      const response = await fetch(URL);
      return response.json();
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

const endpointProducts = 'http://localhost:5190/api/products';

export const fetchAllProducts = async (setProducts: SetProductsFunction) => {
  try {
    const initialResponse = await fetch(endpointProducts);
    if (!initialResponse.ok) {
      throw new Error(
        `Erro de servidor ao buscar a lista de IDs: ${initialResponse.status}`
      );
    }
    const listProductsById: ProductId[] = await initialResponse.json();

    const detailPromises = listProductsById.map(async (item: ProductId) => {
      const URL = `${endpointProducts}/${item.id}`;
      const response = await fetch(URL);
      return response.json();
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

const endpointOrders = 'http://localhost:5190/api/orders';

export const fetchAllOrders = async (setOrders: SetOrdersFunction) => {
  try {
    const initialResponse = await fetch(endpointOrders);
    if (!initialResponse.ok) {
      throw new Error(
        `Erro de servidor ao buscar a lista de IDs: ${initialResponse.status}`
      );
    }
    const listOrdersById: OrderId[] = await initialResponse.json();

    const detailPromises = listOrdersById.map(async (item: OrderId) => {
      const URL = `${endpointOrders}/${item.id}`;
      const response = await fetch(URL);
      return response.json();
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

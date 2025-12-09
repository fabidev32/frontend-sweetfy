const endpointDeleteRecipes = 'SUA_URL_BASE_AQUI'; 

const endpointDeleteProducts = 'SUA_URL_BASE_AQUI'; 

 const endpointDeleteOrders = 'SUA_URL_BASE_AQUI'; 

export const Delete = async (endpointDelete: string) => {
    try {
        const response = await fetch(endpointDeleteRecipes, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(
                `Erro ao deletar: ${response.status} ${response.statusText}`
            );
        }
        if (response.status === 204) {
            return { success: true, message: 'Recurso deletado com sucesso.' };
        }
        return await response.json(); 

    } catch (err) {
        console.error('Falha na requisição DELETE:', err);
        throw err;
    }
};



const BASE_URL = 'http://localhost:5190/api'; 

// --- Receitas ---
export const deleteRecipeById = async (id: number) => {
    const endpoint = `${BASE_URL}/recipes/${id}`;
    return Delete(endpoint);
};

// --- Produtos ---
export const deleteProductById = async (id: number) => {
    const endpoint = `${BASE_URL}/products/${id}`;
    return Delete(endpoint);
};

// --- Encomendas ---
export const deleteOrderById = async (id: number) => {
    const endpoint = `${BASE_URL}/orders/${id}`;
    return Delete(endpoint);
};
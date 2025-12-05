import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(app)/HomePage/index"
        options={{ title: 'Início', headerShown: true }}
      />
      <Stack.Screen
        name="(app)/SeeMoreRecipes/index"
        options={{ title: 'Todas as Receitas' }}
      />
      <Stack.Screen
        name="(app/DetailsRecipe)/index"
        options={{ title: 'Detalhes de uma receita' }}
      />
      <Stack.Screen
        name="(app)/SeeMoreProducts/index"
        options={{ title: 'Todos os Produtos' }}
      />
      <Stack.Screen
        name="(app/DetailsProduct)/index"
        options={{ title: 'Detalhes de um produto' }}
      />


    </Stack>
  );
}
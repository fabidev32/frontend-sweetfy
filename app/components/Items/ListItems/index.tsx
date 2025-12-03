import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface Ingredient {
  id: number;
  ingredientId: number;
  ingredientName: string; 
  quantity: number;
  unit: string;
  unitPriceSnapshot: number;
}

interface IngredientsProps {
  items: Ingredient[];
}

const Ingredients = ({ items }: IngredientsProps) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={item.id.toString() || index.toString()} style={styles.viewIngredientes}>
          <Text style={styles.name}> {item.ingredientName} </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewIngredientes: {
    width: 90,
    margin: 2,
    backgroundColor: '#F5F0F0',
    borderRadius: 18,
    textAlign: 'center',
  },
  name: {
    color: '#880741',
    fontFamily: 'Montserrat',
    fontSize: 11.5,
    margin: 3,
  },
});

export default Ingredients;

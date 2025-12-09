import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type ItemsInput =  {
  id: number;
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  unit: string;
  unitPriceSnapshot: number | string | undefined | null;
  itemCost?: number;
}

interface ItemsInputProps {
  items: ItemsInput[];
}

const ItemsInput = ({ items }: ItemsInputProps) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View style={styles.viewIngredientes}>
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
    width: 150,
    margin: 2,
    backgroundColor: '#F5F0F0',
    borderRadius: 18,
    textAlign: 'center',
    padding: 5,
  },
  name: {
    color: '#880741',
    fontFamily: 'Montserrat',
    fontSize: 14,
    margin: 3,
  },
});

export default ItemsInput;
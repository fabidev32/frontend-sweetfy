import { View, Text, StyleSheet } from 'react-native';
import {IOrdersProducts} from './../../type'
import React from 'react';


interface ProductProps {
  data: IOrdersProducts;
  quantity: number;
}

const Product = ({ data, quantity }: ProductProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}> {data.productName} </Text>
      <Text style={styles.name}> {quantity} </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 18,
    backgroundColor: 'white',
    padding: 12,
  },

  name: {
    color: '#880741',
    fontFamily: 'Montserrat',
    fontSize: 18,
    margin: 3,
  },
});

export default Product;

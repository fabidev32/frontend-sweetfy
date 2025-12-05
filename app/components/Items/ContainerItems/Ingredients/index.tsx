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

    data: Ingredient;
    onCostCalculated: (cost: number, id: number) => void;

}

const Ingredient = ({ data, onCostCalculated}: IngredientsProps) => {

    const totalCost = () => {
        return data.quantity * data.unitPriceSnapshot;
    }

    React.useEffect(() => {
        onCostCalculated(totalCost(), data.id);
    }, [totalCost(), onCostCalculated]); 

        return (
        <View style={styles.container}>
            <Text style={styles.name}> {data.ingredientName} </Text>
            <Text style={styles.name}> {data.unitPriceSnapshot} </Text>
            <Text style={styles.name}> {data.quantity}</Text>
            <Text style={styles.name}> {totalCost()} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: 20,
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

export default Ingredient;

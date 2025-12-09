import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { IRecipeServices } from '../../type';

const safeParseFloat = (value: any): number => {
    return parseFloat(value as any) || 0;
};


interface ServiceProps {
    data: IRecipeServices;
    onCostCalculated?: (cost: number, id: number) => void;
    quantity: number;
}

const Service = ({ data, onCostCalculated, quantity}: ServiceProps) => {

    const totalCost = () => {
        const price = safeParseFloat(data.unitPriceSnapshot);
        return price;
    }

    const cost = totalCost();

    React.useEffect(() => {
        onCostCalculated?.(cost, data.id);
    }, [cost, data.id, onCostCalculated]);


    return (
        <View style={styles.container}>
            <Text style={styles.name}> {data.serviceName} </Text>
            <Text style={styles.name}> {data.unitPriceSnapshot} </Text>
            <Text style={styles.name}> {quantity}</Text>
            <Text style={styles.name}> {cost} </Text>
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

export default Service;
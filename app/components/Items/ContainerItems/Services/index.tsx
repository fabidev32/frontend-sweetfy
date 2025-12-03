import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface Service {

  id: number;
  serviceId: number;
  serviceName: string;
  quantity: number;
  unitPriceSnapshot: number;
    
}

interface ServiceProps {

    data: Service;
    onCostCalculated: (cost: number, id: number) => void;


}

const Service = ({ data, onCostCalculated }: ServiceProps) => {

    const totalCost = () => {
        return data.quantity * data.unitPriceSnapshot;
    }
        React.useEffect(() => {
            onCostCalculated(totalCost(), data.id);
        }, [totalCost(), onCostCalculated]); 
    

    return (
        <View style={styles.container}>
            <Text style={styles.name}> {data.serviceName} </Text>
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
    },

    name: {
        color: '#880741',
        fontFamily: 'Montserrat',
        fontSize: 11.5,
        margin: 3,
    },
});

export default Service;

import { View, Text, StyleSheet } from 'react-native';
import { IProductRecipes } from '../../type';



interface RecipeProps {
    data: IProductRecipes;
    quantity: number;
}

const Recipe = ({ data, quantity}: RecipeProps) => {

    return (
        <View style={styles.container}>
            <Text style={styles.name}> {data.recipeName} </Text>
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

export default Recipe;
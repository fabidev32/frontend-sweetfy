export const getAbbreviationUnitType = (unitType: string)=>{
    switch(unitType){
        case 'Grama':
            return 'g';
        case 'Quilograma':
            return 'kg';
        case 'Mililitro':
            return 'ml';
        case 'Litro':
            return 'l';
        case 'Unidade':
            return 'unid.(s)';
        case 'ColherDeSopa':
            return 'c. de sopa';
        case 'ColherDeCha':
            return 'c. de chá';
        case 'Xicara': 
            return 'xícara(s)';
        case 'Hora':
            return 'hora(s)';
        default:
            return '';
    }
}
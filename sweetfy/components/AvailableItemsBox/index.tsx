import { H6_medium, P } from '../../theme/fontsTheme';
import { theme, transparentStepperTheme } from '../../theme/theme';
import { useState } from 'react';
import InputItens from '../Inputs';
import {
  ButtonBox,
  CalculationButtonBox,
  Container,
  VerticalLine,
} from './styles';
import { getAbbreviationUnitType } from '../../pagesContent/registerItems/utils';
import { UnitTypeEnum } from '../../pagesContent/registerItems/types';
import { IconButton } from 'react-native-paper';

interface IAvailableItemsBox {
  itemName: string;
  quantity: number;
  quantityUnit: UnitTypeEnum;
  inDropDown: boolean;
  isSelected: boolean;
  onSelect(item: any): void;
  removeItem?(): void;
}

const AvailableItemsBox = ({
  itemName,
  quantity,
  quantityUnit,
  inDropDown,
  isSelected,
  onSelect,
  removeItem,
}: IAvailableItemsBox) => {
  const [totalValue, setTotalValue] = useState<number>(quantity);
  const [multiplier, setMultiplier] = useState<number>(1);
  const unitLabel = getAbbreviationUnitType(quantityUnit.toString());

  const handleInputChange = (text: string) => {
    const cleanText = text.replace(/[^0-9.,]/g, '').replace(',', '.');
    const newTotal = parseFloat(cleanText);

    if (!isNaN(newTotal)) {
      setTotalValue(newTotal);

      const newMultiplier = quantity > 0 ? Math.ceil(newTotal / quantity) : 1;
      setMultiplier(newMultiplier);
    } else {
      setTotalValue(quantity);
      setMultiplier(1);
    }
  };

  const handleStepperChange = (change: number) => {
    const newMultiplier = Math.max(0, multiplier + change);
    setMultiplier(newMultiplier);

    setTotalValue(newMultiplier * quantity);
  };
  return (
    <Container
      onPress={onSelect}
      selectedBackgroundColor={isSelected}
    >
      <P
        colorKey="pinkRed"
        style={{ width: '30%' }}
      >
        {itemName}
      </P>
      <InputItens
        containerStyle={{ width: '35%' }}
        inputStyle={{
          ...theme.typography.p_medium,
          textAlign: 'center',
          textDecorationLine: !inDropDown ? 'underline' : 'none',
          textDecorationColor: !inDropDown ? theme.colors.pinkRed : '',
        }}
        inputMode="numeric"
        keyboardType="number-pad"
        placeholder=""
        onChangeText={handleInputChange}
        theme={transparentStepperTheme}
        value={totalValue + unitLabel}
        disabled={inDropDown}
      />
      {!inDropDown && (
        <>
          <CalculationButtonBox>
            <ButtonBox
              onPress={() => (multiplier > 1 ? handleStepperChange(-1) : {})}
            >
              <H6_medium colorKey="pinkRed">-</H6_medium>
            </ButtonBox>
            <VerticalLine />
            <P
              colorKey="pinkRed"
              style={{ padding: 3 }}
            >
              {multiplier}
            </P>
            <VerticalLine />

            <ButtonBox onPress={() => handleStepperChange(+1)}>
              <H6_medium colorKey="pinkRed">+</H6_medium>
            </ButtonBox>
          </CalculationButtonBox>
          <IconButton
            icon={require('../../assets/icons/close.png')}
            size={12}
            style={{ margin: 0 }}
            onPress={removeItem}
            iconColor={theme.colors.pinkRed}
          />
        </>
      )}
    </Container>
  );
};

export default AvailableItemsBox;

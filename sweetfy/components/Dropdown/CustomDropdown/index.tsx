import { memo, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { primaryTheme, theme } from '../../../theme/theme';
import { Icon } from 'react-native-paper';
import { H5 } from '../../../theme/fontsTheme';
import { ICustomDropdownItem } from '../types';
import { Container } from '@/components/Inputs/style';
import AvailableItemsBox from '@/components/AvailableItemsBox';

interface ICustomDropdownProps {
  options: ICustomDropdownItem[];
  placeholder: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  requiredField?: boolean;
  title?: string;
  selectedOptions: any;
  setSelectedOptions(value: any): void;
}

const CustomDropdownInput = ({
  options,
  placeholder,
  searchPlaceholder,
  requiredField,
  title,
  selectedOptions,
  setSelectedOptions,
}: ICustomDropdownProps) => {
  const [showDropDownOptions, setShowDropDownOptions] = useState(false);
  return (
    <Container
      style={{ flex: 1 }}
      theme={primaryTheme}
    >
      {title && (
        <H5 colorKey="white">
          {title}
          {requiredField && ' *'}
        </H5>
      )}
      <DropDownPicker
        multiple
        open={showDropDownOptions}
        value={selectedOptions}
        multipleText="Selecionando..."
        ListEmptyComponent={() => <></>}
        items={options}
        renderListItem={(props) => {
          const item = props.item as ICustomDropdownItem;
          return (
            <AvailableItemsBox
              inDropDown
              itemName={item.label}
              quantityUnit={item.quantityUnit}
              quantity={item.itemInitialQuantity}
              onSelect={() => props.onPress(item)}
              isSelected={props.isSelected}
            />
          );
        }}
        dropDownDirection="BOTTOM"
        setOpen={setShowDropDownOptions}
        setValue={setSelectedOptions}
        searchable
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        extendableBadgeContainer
        labelProps={{ numberOfLines: 1 }}
        style={{
          backgroundColor: 'transparent',
          maxWidth: '100%',
          borderColor: theme.colors.yellow,
          minHeight: 41,
        }}
        autoScroll
        containerStyle={{ width: 'auto', maxWidth: '100%', zIndex: 20000 }}
        dropDownContainerStyle={{
          maxWidth: '100%',
          borderColor: theme.colors.yellowLight,
        }}
        selectedItemContainerStyle={{ backgroundColor: theme.colors.white }}
        labelStyle={{ color: theme.colors.inputWhite }}
        placeholderStyle={{
          color: theme.colors.yellow,
          opacity: '60%',
        }}
        ArrowDownIconComponent={() => {
          return (
            <Icon
              source="menu-down"
              size={24}
              color={theme.colors.yellow}
            />
          );
        }}
        ArrowUpIconComponent={() => {
          return (
            <Icon
              source="menu-up"
              size={24}
              color={theme.colors.yellow}
            />
          );
        }}
      />
    </Container>
  );
};
export default memo(CustomDropdownInput);

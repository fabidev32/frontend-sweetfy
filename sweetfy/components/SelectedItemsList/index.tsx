import AvailableItemsBox from '../AvailableItemsBox';
import { ICustomDropdownItem } from '../Dropdown/types';
import { SelectedItemListBox } from './style';

interface ISelectedItemsList {
  ingredientsOptions: ICustomDropdownItem[];
  selectedItemsIds: number[];
  removeItemsFunction(newIdsList: number[]): void;
}

const SelectedItemList = ({
  ingredientsOptions,
  removeItemsFunction,
  selectedItemsIds,
}: ISelectedItemsList) => {
  return (
    <SelectedItemListBox>
      {ingredientsOptions
        .filter((ingredientItem) =>
          selectedItemsIds.includes(ingredientItem.value)
        )
        .map((ingredient) => (
          <AvailableItemsBox
            key={ingredient.value}
            isSelected={false}
            inDropDown={false}
            itemName={ingredient.label}
            quantity={ingredient.itemInitialQuantity}
            quantityUnit={ingredient.quantityUnit}
            onSelect={() => {}}
            removeItem={() => {
              removeItemsFunction(
                selectedItemsIds.filter((id) => id !== ingredient.value)
              );
            }}
          />
        ))}
    </SelectedItemListBox>
  );
};

export default SelectedItemList;

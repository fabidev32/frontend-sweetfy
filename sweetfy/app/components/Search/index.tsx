import InputItens from '../Inputs';
import { primaryTheme } from '@/theme/theme';

interface ISearchComponent {
  placeholderText: string;
  handleSearch?: () => void;
}

const SearchComponent = ({
  handleSearch,
  placeholderText,
}: ISearchComponent) => {
  const searchFunction = () => {
    console.log('implementar function');
  };

  return (
    <InputItens
      theme={primaryTheme}
      inputMode="text"
      placeholder={placeholderText}
      rightIcon="magnify"
      rightIconFunction={searchFunction}
      inputStyle={{ height: 40 }}
      containerStyle={{ flex: 1 }}
    />
  );
};

export default SearchComponent;

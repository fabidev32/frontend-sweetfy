import SearchComponent from '@/components/Search';
import { HeaderContainerStyled, Line, PropsContainer } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import { theme } from '@/theme/theme';
import { H3 } from '@/theme/fontsTheme';

interface IHeader {
  returnable?: boolean;
  searchable?: boolean;
}

const DinamicHeader = ({ returnable, searchable }: IHeader) => {
  const { top: top } = useSafeAreaInsets();
  return (
    <HeaderContainerStyled
      flexDirection="column"
      elevation={4}
      style={{
        padding: 20,
        gap: 10,
        borderBottomWidth: 2,
        paddingTop: top + 20,
      }}
    >
      <PropsContainer>
        {returnable && (
          <IconButton
            icon="arrow-left"
            iconColor={theme.colors.darkBrown}
            size={24}
            style={{ margin: 0, position: 'absolute', left: 0 }}
            onPress={() => console.log('implementar')}
          />
        )}
        <H3 colorKey="darkBrown">Sweetfy</H3>
      </PropsContainer>

      <Line lineHeight={1.5} />

      <PropsContainer>
        {searchable && <SearchComponent placeholderText="Busque aqui..." />}
      </PropsContainer>
    </HeaderContainerStyled>
  );
};

export default DinamicHeader;

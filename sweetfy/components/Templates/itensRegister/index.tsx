import ConfirmModal from '@/components/ConfirmationModal';
import DinamicSnackbar, {
  DinamicSnackbarType,
} from '@/components/DinamicSnackbar';
import { IDropdownItem } from '@/components/Dropdown/types';
import TemplateComponent from '@/components/ItemsTemplate';
import DinamicHeader from '@/components/PageTips/DinamicHeader';
import {
  ContentContainer,
  FormContainer,
  IconsContainer,
  PageContainer,
  TitleContainer,
} from '../../../pagesContent/registerItems/styles';
import { pageType } from '../../../pagesContent/registerItems/types';
import { H4 } from '../../../theme/fontsTheme';
import { theme } from '../../../theme/theme';
import { ReactNode } from 'react';
import { IconButton } from 'react-native-paper';

interface IItensRegisterTemplate {
  registerItemName: string;
  type: pageType;
  children: ReactNode;
  showSnackbar: boolean;
  snackbarType: DinamicSnackbarType;
  showConfirmModal: boolean;
  OnDismissSnackbar(): void;
  onDismissModal(): void;
  onConfirmModal(): void;
  templateOptions?: IDropdownItem[];
}

const ItensRegisterTemplate = ({
  registerItemName,
  type,
  children,
  showSnackbar,
  snackbarType,
  showConfirmModal,
  OnDismissSnackbar,
  templateOptions,
  onDismissModal,
  onConfirmModal,
}: IItensRegisterTemplate) => {
  const lastLetter = () => {
    const getFirstWord = registerItemName.split(' ');
    const stringLenght = getFirstWord.length;
    return registerItemName[stringLenght - 1];
  };
  return (
    <PageContainer>
      <DinamicHeader returnable />
      <ContentContainer>
        <TitleContainer>
          <H4>{registerItemName}</H4>
          {type === 'edit' && (
            <IconsContainer>
              <IconButton
                icon={require('../../../assets/icons/edit.png')}
                size={20}
                iconColor={theme.colors.yellow}
                onPress={() => {}} //implementar
              />
              <IconButton
                icon={require('../../../assets/icons/delete.png')}
                size={20}
                iconColor={theme.colors.yellow}
                onPress={() => {}} //implementar
              />
            </IconsContainer>
          )}
        </TitleContainer>

        {templateOptions && (
          <TemplateComponent
            options={templateOptions}
            placeholder="Template de receitas"
            searchPlaceholder="Busque receitas já cadastradas"
          />
        )}
        <FormContainer>{children}</FormContainer>
      </ContentContainer>
      <DinamicSnackbar
        isVisible={showSnackbar}
        OnDismissFunction={OnDismissSnackbar}
        type={snackbarType}
      />
      <ConfirmModal
        onConfirm={onConfirmModal}
        onDismiss={onDismissModal}
        visible={showConfirmModal}
        cancelText="Mais tarde ;)"
        confirmText="Sim :)"
        message={`Já salvamos esse aqui! Deseja incluir mais um${
          lastLetter() === 'a' ? 'a' : ''
        } ${registerItemName.toLowerCase()} ou prefere voltar para o página inicial?`}
        title="Quer adicionar outro?"
      />
    </PageContainer>
  );
};

export default ItensRegisterTemplate;

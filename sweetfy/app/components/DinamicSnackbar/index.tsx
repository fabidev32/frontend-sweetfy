import { H5, H6 } from '@/theme/fontsTheme';
import { StyledSnackbar } from './style';

interface IDinamicSnackbar {
  isVisible: boolean;
  OnDismissFunction(): void;
  messageTitle: string;
  message: string;
}

const DinamicSnackbar = ({
  isVisible,
  OnDismissFunction,
  messageTitle,
  message,
}: IDinamicSnackbar) => {
  return (
    <StyledSnackbar
      visible={isVisible}
      onDismiss={OnDismissFunction}
    >
      <H5
        colorKey="brown"
        style={{ marginBottom: 8 }}
      >
        {messageTitle}
      </H5>
      <H6 colorKey="brown">{message}</H6>
    </StyledSnackbar>
  );
};

export default DinamicSnackbar;

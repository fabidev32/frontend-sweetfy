import DinamicButton from '@/components/Buttons';
import DividerWithText from '@/components/DividerWithText';
import InputItens from '@/components/Inputs';
import { H1, H5, H6 } from '@/theme/fontsTheme';
import { primaryTheme, theme } from '@/theme/theme';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Snackbar, Surface } from 'react-native-paper';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { fetchLogin } from '../../api/auth/auth';
import AuthTemplate from '@/components/Templates/auth';
import { InputsContent } from '@/components/Templates/auth/styles';
import DinamicSnackbar from '@/components/DinamicSnackbar';

const LoginPageComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [showResponseStatus, setShowResponseStatus] = useState(false);
  const [responseStatusMessage, setResponseStatusMessage] = useState('');

  const { signIn } = useAuth();

  const errorMessage = (status: number) => {
    if (!email || !password)
      return setResponseStatusMessage('Por favor, preencha todos os campos!');
    if (status >= 500)
      return setResponseStatusMessage(
        'Erro ao tentar fazer login. Tente novamente mais tarde.'
      );
    if (status >= 400)
      return setResponseStatusMessage(
        'Erro ao tentar fazer login. Confira os dados e tente novamente.'
      );
  };
  const handleLogin = async () => {
    try {
      setEmail('');
      setPassword('');
      setLoading(true);
      const response = await fetchLogin({ email, password });
      signIn(response.accessToken);
    } catch (error: any) {
      console.log(error);
      errorMessage(error.status);
    } finally {
      setShowResponseStatus(true);
      setLoading(false);
    }
  };

  return (
    <AuthTemplate subtitle="Insira seus dados para que possamos começar!">
      <InputsContent>
        <InputItens
          inputStyle={{ height: 40 }}
          inputMode="email"
          theme={primaryTheme}
          placeholder="Email"
          title="Insira seu email"
          setInputValue={setEmail}
          value={email}
        />
        <InputItens
          inputStyle={{ height: 40 }}
          inputMode="text"
          theme={primaryTheme}
          placeholder="Senha"
          title="Insira sua senha"
          securityRequired
          setInputValue={setPassword}
          value={password}
        />
      </InputsContent>
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={theme.colors.yellowLight}
        />
      ) : (
        <DinamicButton
          buttonStyle={{ width: '80%' }}
          buttonText="Confirmar"
          type="brownLight"
          onPress={handleLogin}
        />
      )}

      <DividerWithText
        text="Ainda não tem uma conta?"
        style={{ maxWidth: '85%' }}
      />

      <DinamicButton
        buttonStyle={{ width: '80%' }}
        buttonText="Cadastre-se"
        onPress={() => router.push('/register')}
        type="outlined"
        disabled={loading}
      />

      <DinamicSnackbar
        isVisible={showResponseStatus}
        OnDismissFunction={() => setShowResponseStatus(false)}
        messageTitle="Algo deu errado no cadastro ):"
        message="Confirme os dados e tente novamente"
      />
    </AuthTemplate>
  );
};

export default LoginPageComponent;

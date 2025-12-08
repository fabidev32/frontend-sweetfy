import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { secondaryTheme } from '../../../theme/theme';
import { QuantityInputsContainer } from '../styles';
import {
  fetchGetIngredients,
  fetchGetRecipes,
  fetchRegisterRecipes,
} from '../../../api/register/registerItem';
import {
  ICustomDropdownItem,
  IDropdownItem,
} from '@/components/Dropdown/types';
import SpecificFormatInput from '@/components/Inputs/SpecificFormatInput';
import CustomDropdownInput from '@/components/Dropdown/CustomDropdown';
import { router, useFocusEffect } from 'expo-router';
import SelectedItemList from '@/components/SelectedItemsList';
import {
  IIngredient,
  includedIngredients,
  IRecipe,
} from '../../../api/register/types';
import DropdownInput from '@/components/Dropdown';
import {
  ingredientRegisterUnitOptions,
  pageType,
  UnitTypeEnum,
} from '../types';
import DinamicButton from '@/components/Buttons';
import { DinamicSnackbarType } from '@/components/DinamicSnackbar';
import ItensRegisterTemplate from '@/components/Templates/itensRegister';
import InputItens from '@/components/Inputs';

interface PageProps {
  type: pageType;
}

const RegisterRecipesComponent = ({ type }: PageProps) => {
  const [name, setName] = useState('');
  const [yieldQuantity, setYieldQuantity] = useState('');
  const [preparation, setPreparation] = useState('');
  const [additionalCostPercent, setAdditionalCostPercent] = useState<
    number | null
  >();
  const [yieldUnit, setYieldUnit] = useState<UnitTypeEnum>();

  const [recipeIngredientsIds, setRecipeIngredientsIds] = useState<number[]>(
    []
  );
  const [ingredientsOptions, setIngredientsOptions] = useState<IIngredient[]>(
    []
  );
  const [recipesForTemplateOptions, setRecipesForTemplateOptions] = useState<
    IRecipe[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [showResponseStatus, setShowResponseStatus] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [responseStatusMessage, setResponseStatusMessage] =
    useState<DinamicSnackbarType>('error');

  useFocusEffect(
    useCallback(() => {
      return () => {
        setRecipeIngredientsIds([]);
        setRecipesForTemplateOptions([]);
      };
    }, [])
  );

  const hasEmpty =
    !name ||
    !yieldQuantity ||
    recipeIngredientsIds.length === 0 ||
    !additionalCostPercent;

  const getIngredients = async () => {
    try {
      setLoading(true);
      const response = await fetchGetIngredients();
      setIngredientsOptions(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const getRecipesForTemplate = async () => {
    try {
      setLoading(true);
      const response = await fetchGetRecipes();
      setRecipesForTemplateOptions(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const postRecipe = async () => {
    const finalIngredientsList: includedIngredients[] = [];
    ingredientsOptions
      .filter((ingredients) => recipeIngredientsIds.includes(ingredients.id))
      .map((ingredient) =>
        finalIngredientsList.push({
          ingredientId: ingredient.id,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        })
      );
    try {
      setLoading(true);
      await fetchRegisterRecipes({
        name,
        preparation,
        additionalCostPercent: additionalCostPercent ?? 0,
        recipeIngredients: finalIngredientsList,
        recipeServices: [],
        yieldQuantity: Number(yieldQuantity),
        yieldUnit: Number(yieldUnit),
      });
      setResponseStatusMessage('success');
      setShowConfirmModal(true);
    } catch (e) {
      console.error(e);
      setResponseStatusMessage('error');
    } finally {
      setLoading(false);
      setShowResponseStatus(true);
    }
  };

  const clearFields = () => {
    setName('');
    setAdditionalCostPercent(undefined);
    setPreparation('');
    setYieldQuantity('');
    setYieldUnit(undefined);
    setRecipeIngredientsIds([]);
  };

  useEffect(() => {
    getIngredients();
    getRecipesForTemplate();
  }, []);

  const ingredientsOptionsLabel: ICustomDropdownItem[] = useMemo(() => {
    return ingredientsOptions
      .filter(
        (ingredientOption) =>
          ingredientOption.name && ingredientOption.name.trim() !== ''
      )
      .map((ingredientObject) => ({
        label: ingredientObject.name,
        value: ingredientObject.id,
        itemInitialQuantity: ingredientObject.quantity,
        quantityUnit: ingredientObject.unit,
      }));
  }, [ingredientsOptions]);

  const recipesOptionsLabel: IDropdownItem[] = useMemo(() => {
    return recipesForTemplateOptions
      .filter(
        (recipeOption) => recipeOption.name && recipeOption.name.trim() !== ''
      )
      .map((recipeObject) => ({
        label: recipeObject.name,
        value: recipeObject.id,
      }));
  }, [recipesForTemplateOptions]);

  return (
    <ItensRegisterTemplate
      type={type}
      registerItemName="Nova receita"
      showSnackbar={showResponseStatus}
      templateOptions={recipesOptionsLabel}
      snackbarType={responseStatusMessage}
      showConfirmModal={showConfirmModal}
      OnDismissSnackbar={() => setShowResponseStatus(false)}
      onConfirmModal={() => {
        clearFields();
        setShowConfirmModal(false);
      }}
      onDismissModal={() => {
        setShowConfirmModal(false);
        router.push('/home');
      }}
    >
      <InputItens
        title="Nome da receita"
        placeholder="ex.: Massa de brigadeiro, Massa de bolo de chocolate..."
        inputMode="text"
        onChangeText={setName}
        requiredField
        keyboardType="default"
        value={name}
        theme={secondaryTheme}
        outlinedInput
      />
      <QuantityInputsContainer>
        <InputItens
          title="Rendimento da receita"
          placeholder="ex.: 30, 1,..."
          inputMode="numeric"
          onChangeText={setYieldQuantity}
          value={yieldQuantity}
          theme={secondaryTheme}
          containerStyle={{ flex: 1 }}
          keyboardType="number-pad"
          requiredField
          outlinedInput
        />
        <DropdownInput
          options={ingredientRegisterUnitOptions}
          placeholder="Selecione"
          requiredField
          title="Medida de rendimento"
          selectedOptions={yieldUnit}
          setSelectedOptions={setYieldUnit}
        />
      </QuantityInputsContainer>
      <InputItens
        title="Modo de preparo"
        placeholder="ex.: Deixar descansar, horas no forno..."
        inputMode="text"
        onChangeText={setPreparation}
        value={preparation}
        theme={secondaryTheme}
        keyboardType="default"
        outlinedInput
        multiline
        style={{ minHeight: 60 }}
      />

      <SpecificFormatInput
        onChangeValue={setAdditionalCostPercent}
        value={Number(additionalCostPercent)}
        placeholder="ex.: 20%, 34.5%..."
        title="Custos incalculáveis"
        type="percentage"
      />

      <CustomDropdownInput
        options={ingredientsOptionsLabel}
        placeholder="Selecione os ingredientes"
        selectedOptions={recipeIngredientsIds}
        title="Insumos utilizados"
        setSelectedOptions={setRecipeIngredientsIds}
        requiredField
        searchPlaceholder="Busque aqui"
        searchable
      />
      {recipeIngredientsIds.length > 0 && (
        <SelectedItemList
          ingredientsOptions={ingredientsOptionsLabel}
          selectedItemsIds={recipeIngredientsIds}
          removeItemsFunction={setRecipeIngredientsIds}
        />
      )}
      <DinamicButton
        buttonText="Criar receita"
        onPress={postRecipe}
        type="yellow"
        disabled={loading || hasEmpty}
      />
    </ItensRegisterTemplate>
  );
};

export default RegisterRecipesComponent;

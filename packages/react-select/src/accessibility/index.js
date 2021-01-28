// @flow

import { type OptionType, type OptionsType } from '../types';

export type InstructionsContext = {
  isSearchable?: boolean,
  isMulti?: boolean,
  label?: string,
  isDisabled?: boolean
};
export type ValueEventContext = { value: string, isDisabled?: boolean };

export const instructionsAriaMessage = (
  event: string,
  context?: InstructionsContext = {}
) => {
  const { isSearchable, isMulti, label, isDisabled } = context;
  switch (event) {
    case 'menu':
      return `Use Arriba y Abajo para elegir opciones${isDisabled ? '' : ', presione Enter para seleccionar la opción actualmente enfocada'}, presione Escape para salir del menú, presione Tab para seleccionar la opción y salir del menú.`;
    case 'input':
      return `${label ? label : 'Seleccione'} Está enfocado ${
        isSearchable ? ',escriba para refinar la lista' : ''
        }, presione Abajo para abrir el menú, ${
        isMulti ? ' presione hacia la izquierda para enfocar los valores seleccionados' : ''
        }`;
    case 'value':
      return 'Use la izquierda y la derecha para alternar entre los valores enfocados, presione Retroceso para eliminar el valor enfocado actualmente';
  }
};

export const valueEventAriaMessage = (
  event: string,
  context: ValueEventContext
) => {
  const { value, isDisabled } = context;
  if (!value) return;
  switch (event) {
    case 'deselect-option':
    case 'pop-value':
    case 'remove-value':
      return `opcion ${value}, deseleccionada.`;
    case 'select-option':
      return isDisabled ? `opcion ${value} está desactivado. Seleccione otra opción.` : `opcion ${value}, seleccionada.`;
  }
};

export const valueFocusAriaMessage = ({
  focusedValue,
  getOptionLabel,
  selectValue,
}: {
  focusedValue: OptionType,
  getOptionLabel: (option: OptionType) => string,
  selectValue: OptionsType,
}) =>
  `valor ${getOptionLabel(focusedValue)} enfocado, ${selectValue.indexOf(
    focusedValue
  ) + 1} de ${selectValue.length}.`;

export const optionFocusAriaMessage = ({
  focusedOption,
  getOptionLabel,
  options,
}: {
  focusedOption: OptionType,
  getOptionLabel: (option: OptionType) => string,
  options: OptionsType,
}) =>
  `opcion ${getOptionLabel(focusedOption)} enfocado${focusedOption.isDisabled ? ' deshabilitado' : ''}, ${options.indexOf(
    focusedOption
  ) + 1} de ${options.length}.`;

export const resultsAriaMessage = ({
  inputValue,
  screenReaderMessage,
}: {
  inputValue: string,
  screenReaderMessage: string,
}) =>
  `${screenReaderMessage}${
  inputValue ? ' para el término de búsqueda ' + inputValue : ''
  }.`;

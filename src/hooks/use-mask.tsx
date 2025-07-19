import { useState, useCallback } from "react";

export type UseMaskProps = {
  mask: string;
  placeholder?: string; // Placeholder que mostra a máscara
  showMask?: boolean; // Se deve mostrar a máscara mesmo sem valor
  allowEmpty?: boolean; // Se permite valor vazio
  transform?: "uppercase" | "lowercase" | "capitalize"; // Transformação do texto
};

export const useMask = ({ mask, ...options }: UseMaskProps) => {
  const [value, setValue] = useState("");

  const applyMask = useCallback(
    (inputValue: string) => {
      if (!inputValue || !mask) return "";

      // Remove todos os caracteres que não são letras ou números
      const cleanValue = inputValue.replace(/[^a-zA-Z0-9]/g, "");

      let maskedValue = "";
      let cleanIndex = 0;

      for (let i = 0; i < mask.length && cleanIndex < cleanValue.length; i++) {
        const maskChar = mask[i];
        const inputChar = cleanValue[cleanIndex];

        if (maskChar === "9") {
          // Só aceita números
          if (/\d/.test(inputChar)) {
            maskedValue += inputChar;
            cleanIndex++;
          } else {
            // Se não for número, pula esse caractere do input
            cleanIndex++;
            i--; // Volta um passo na máscara para tentar novamente
          }
        } else if (maskChar === "A") {
          // Só aceita letras
          if (/[a-zA-Z]/.test(inputChar)) {
            let char = inputChar;
            // Aplica transformação se especificada
            if (options.transform === "uppercase") char = char.toUpperCase();
            else if (options.transform === "lowercase")
              char = char.toLowerCase();
            maskedValue += char;
            cleanIndex++;
          } else {
            // Se não for letra, pula esse caractere do input
            cleanIndex++;
            i--; // Volta um passo na máscara para tentar novamente
          }
        } else {
          // Caractere literal da máscara (parênteses, hífen, etc.)
          maskedValue += maskChar;
        }
      }

      return maskedValue;
    },
    [mask, options.transform]
  );

  const handleSetValue = useCallback(
    (newValue: string) => {
      const maskedValue = applyMask(newValue);
      setValue(maskedValue);
    },
    [applyMask]
  );

  // Função para obter valor sem máscara (raw)
  const getRawValue = useCallback(() => {
    return value.replace(/[^a-zA-Z0-9]/g, "");
  }, [value]);

  // Função para verificar se está completo
  const isComplete = useCallback(() => {
    return value.length === mask.length;
  }, [value, mask]);

  // Função para verificar se é válido
  const isValid = useCallback(() => {
    // Implementar validação específica
    return isComplete() && value.length > 0;
  }, [isComplete, value]);

  // Função para limpar o valor
  const clear = useCallback(() => {
    setValue("");
  }, []);

  // Compatibilidade com react-hook-form
  const getFormProps = useCallback(
    () => ({
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSetValue(e.target.value);
      },
      placeholder: options.placeholder,
    }),
    [value, handleSetValue, options.placeholder]
  );

  return {
    value,
    setValue: handleSetValue,
    rawValue: getRawValue(),
    isComplete: isComplete(),
    isValid: isValid(),
    applyMask,
    clear,
    placeholder: options.placeholder || mask.replace(/[9A]/g, "_"),
    formProps: getFormProps(),
  };
};

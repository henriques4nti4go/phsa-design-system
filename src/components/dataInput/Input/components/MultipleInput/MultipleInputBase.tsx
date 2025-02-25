import { useFormContext } from "react-hook-form";
import { InputProps } from "../Input";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../../../../../components/actions";
import { Icon, Text } from "../../../../../components/dataDisplay";
import _ from "lodash";

export type MultipleInputProps = {
  /** Dados iniciais do input múltiplo */
  data?: string[];
  /** Callback chamado quando os dados são alterados */
  onChangeData?: (data: string[]) => void;
  /** Renderiza o input individual */
  children: (props: InputProps) => React.ReactNode;
  /** Função para formatar os itens na lista */
  formatItems?: (item: string) => string | null;
  /** Nome do campo (obrigatório quando usado com formulário) */
  name?: string;
  /** Define se o componente será usado fora de um formulário */
  withoutForm?: boolean;
  /** ID para testes */
  "data-testid"?: string;
  /** Desabilita o campo */
  disabled?: boolean;
};

export const MultipleInputBase = ({
  data = [],
  onChangeData = () => {},
  children = () => null,
  formatItems = (item) => item,
  name,
  withoutForm,
  disabled,
  "data-testid": testId,
}: MultipleInputProps) => {
  const [value, setValue] = useState("");
  const form = useFormContext();
  const hasForm = !withoutForm && !!form && !!name;

  const items = useMemo(
    () => (hasForm ? form.watch()?.[name] || [] : data),
    [hasForm, form, name, data]
  );

  const handleAddData = useCallback(() => {
    if (!value?.trim()) return;

    const newData = [...items, value];
    onChangeData(newData);
    if (hasForm && name) {
      form.setValue(name, newData);
    }
    setValue("");
  }, [form, hasForm, items, name, onChangeData, value]);

  const handleRemove = useCallback(
    (item: string) => {
      const newData = _.without(items, item);

      onChangeData(newData);
      if (hasForm && name) {
        form.setValue(name, newData);
      }
    },
    [form, hasForm, items, name, onChangeData]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-end">
        {children({
          withoutForm: true,
          value,
          onChange: (value) => {
            if (value === undefined || value === null) {
              setValue("");
              return;
            }
            setValue(String(value));
          },
          disabled,
          "data-testid": testId,
          component: (
            <Button
              onClick={handleAddData}
              disabled={!value?.trim() || disabled}
              type="button"
              data-testid={testId ? `add-button-${testId}` : undefined}
            >
              <Icon name="MdAdd" />
            </Button>
          ),
        })}
      </div>
      {items.map((item: string, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between"
          data-testid={testId ? `item-${testId}-${index}` : undefined}
        >
          <Text>{formatItems(item)}</Text>
          <Button
            variant="ghost"
            onClick={() => handleRemove(item)}
            disabled={disabled}
            type="button"
            data-testid={
              testId ? `remove-button-${testId}-${index}` : undefined
            }
          >
            <Icon name="MdDelete" className="fill-destructive" />
          </Button>
        </div>
      ))}
    </div>
  );
};

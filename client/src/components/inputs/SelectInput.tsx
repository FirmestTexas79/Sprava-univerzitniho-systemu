import { InputProps } from "./InputProps.ts";
import { FormHelperText, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export interface Option<T> {
  label: string;
  value: T;
}

interface SelectInputProps<T> extends InputProps<T> {
  error?: boolean;
  helperText?: string;
  label?: string;
  options: Option<T>[];
  lockedOptions?: T[];
  onOpen?: () => void;
  required?: boolean;
  placeholder?: string;
}

export function SelectInput<T>({
                                 options,
                                 required,
                                 label,
                                 error,
                                 helperText,
                                 placeholder,
                                 value,
                                 lockedOptions,
                                 onChange,
                                 onOpen,
                                 disabled,
                               }: SelectInputProps<T>) {

  return (
    <>
      <Select
        label={label}
        required={required}
        onChange={(event) => onChange(event.target.value as T)}
        value={value ?? ""}
        fullWidth
        multiple={value instanceof Array}
        onOpen={() => onOpen && onOpen()}
        disabled={disabled}
        error={error}
        placeholder={placeholder ?? label}>
        {options.map((option, index) =>
          (<MenuItem
            key={index}
            disabled={lockedOptions?.includes(option.value)}
            value={option.value}>{option.label}</MenuItem>))}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </>
  );
}

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
  options: Array<Option<T>>;
  onOpen?: () => void;
  required?: boolean;
  placeholder?: string;
}

export function SelectInput<T extends any>({
                                             options,
                                             required,
                                             label,
                                             error,
                                             helperText,
                                             placeholder,
                                             value,
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
        value={value || ""}
        fullWidth
        onOpen={() => onOpen && onOpen()}
        disabled={disabled}
        error={error}
        placeholder={placeholder || label}>
        {options.map((option, index) =>
          (<MenuItem key={index} value={option.value}>{option.label}</MenuItem>))}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </>
  );
}

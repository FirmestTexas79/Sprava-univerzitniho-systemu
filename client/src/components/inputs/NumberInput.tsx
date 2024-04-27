import { TextField } from "@mui/material";
import { InputProps } from "./InputProps.ts";

interface NumberInputProps extends InputProps<number> {
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  numberType?: "integer" | "float";
  min?: number;
  max?: number;
}

export function NumberInput({
                              label,
                              error,
                              helperText,
                              onChange,
                              placeholder,
                              required,
                              value,
                              numberType = "integer",
  min,
  max
                            }: NumberInputProps) {
  return (<>
    <TextField
      label={label}
      type="number"
      onChange={(event) => numberType === "integer" ? onChange(parseInt(event.target.value)) : onChange(parseFloat(event.target.value))}
      value={value}
      error={error}
      fullWidth
      inputProps={{ min, max }}
      helperText={helperText}
      placeholder={placeholder || label}
      required={required} />
  </>);
}

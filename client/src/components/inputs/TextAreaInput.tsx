import { TextField } from "@mui/material";
import { InputProps } from "./InputProps.ts";

interface TextAreaInputProps extends InputProps<string> {
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export function TextAreaInput({
                                value,
                                helperText,
                                placeholder,
                                required,
                                label,
                                error,
                                onChange,
                                disabled,
                              }: TextAreaInputProps) {
  return (
    <TextField
      fullWidth
      required={required}
      disabled={disabled}
      multiline
      onChange={(e) => onChange && onChange(e.target.value)}
      rows={4}
      maxRows={4}
      variant="outlined"
      error={error}
      value={value}
      label={label}
      placeholder={placeholder || label}
      helperText={helperText}
    />
  );
}

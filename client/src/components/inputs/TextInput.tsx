import { InputProps } from "./InputProps.ts";
import { FormHelperText, InputAdornment, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

interface TextInputProps extends InputProps<string> {
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  type?: "tel" | "email" | "password" | "text";
  required?: boolean;
}

export function TextInput({ value, onChange, type, helperText, error, label, placeholder,required }: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <OutlinedInput
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={showPassword ? "text" : type}
        autoComplete={type}
        endAdornment={type === "password" &&
          <InputAdornment position="end">
            {/* @ts-ignore */}
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        fullWidth
        error={error}
        placeholder={placeholder || label}
        label={label}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </>);
}

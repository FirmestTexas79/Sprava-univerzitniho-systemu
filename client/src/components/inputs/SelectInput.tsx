import { InputProps } from "./InputProps.ts";
import { FormHelperText, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, { ChangeEvent, useEffect, useState } from "react";

export interface Option<T> {
  label: string;
  value: T;
}

interface SelectInputProps<T> extends InputProps<T | T[]> {
  error?: boolean;
  helperText?: string;
  label?: string;
  options: Option<T>[];
  lockedOptions?: T[];
  onOpen?: () => void;
  required?: boolean;
  placeholder?: string;
  defaultValue?: T | T[];
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
                                 defaultValue,
                                 onChange,
                                 onOpen,
                                 disabled,
                               }: SelectInputProps<T>) {

  function handleChange(event: ChangeEvent<{ value: unknown }>) {
    if (Array.isArray(value)) {
      onChange && onChange(event.target.value as T[]);
    } else {
      onChange && onChange(event.target.value as T);
    }
  }

  return (
    <>
      <Select
        label={label}
        required={required}
        defaultValue={defaultValue}
        onChange={handleChange}
        value={value}
        fullWidth
        multiple={Array.isArray(value)}
        onOpen={() => onOpen && onOpen()}
        disabled={disabled}
        error={error}
        placeholder={placeholder ?? label}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            disabled={lockedOptions?.includes(option.value)}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </>
  );
}



import { Checkbox } from "@mui/material";
import { InputProps } from "./InputProps.ts";

interface CheckBoxProps extends InputProps<boolean> {
  onPress: () => void;
}


export function CheckBox({ onPress, value, onChange }: CheckBoxProps) {
  return (<Checkbox onClick={() => {
    onPress();
    onChange(!value);
  }} value={value} />);
}

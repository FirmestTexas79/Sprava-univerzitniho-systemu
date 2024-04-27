export interface InputProps<T extends any> {
  onChange: (value: T) => void;
  value?: T | null;
  disabled?: boolean;
}

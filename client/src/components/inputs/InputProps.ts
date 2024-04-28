export interface InputProps<T> {
  onChange?: (value: T) => void;
  value?: T | null;
  disabled?: boolean;
}

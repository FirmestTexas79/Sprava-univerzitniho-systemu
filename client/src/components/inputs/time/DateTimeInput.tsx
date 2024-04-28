import { InputProps } from "../InputProps.ts";
import dayjs from "dayjs";
import { DateTimePicker, DateView, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateTimeInputProps extends InputProps<Date | null> {
  onAccept?: (value: Date | null) => void;
  defaultValue?: Date;
  disableFuture?: boolean;
  helperText?: string;
  error?: boolean;
  label?: string;
  minDate?: dayjs.Dayjs;
  views?: DateView[];
}

export function DateTimeInput({
                                onChange,
                                defaultValue,
                                value,
                                disableFuture,
                                error,
                                onAccept,
                                helperText,
                                label,
                                minDate,
                                views,
                              }: Readonly<DateTimeInputProps>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
      <DateTimePicker
        label={label}
        minDate={minDate}
        defaultValue={defaultValue && dayjs(defaultValue.toISOString())}
        sx={{ marginBottom: "5px" }}
        value={value && dayjs(value.toISOString())}
        onChange={(value) => value && value.isValid() && onChange && onChange(value.toDate())}
        onAccept={(value) => value && value.isValid() && onAccept && onAccept(value.toDate())}
        slotProps={{
          textField: {
            helperText: helperText,
            error: error,
          },
        }}
        disableFuture={disableFuture}
        views={views}
      />
    </LocalizationProvider>
  );
}

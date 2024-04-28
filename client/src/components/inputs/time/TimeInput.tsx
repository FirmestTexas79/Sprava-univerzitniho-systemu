import { InputProps } from "../InputProps.ts";
import dayjs from "dayjs";
import { DateView, DesktopTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface TimeInputProps extends InputProps<Date | null> {
  onAccept?: (value: Date | null) => void;
  defaultValue?: Date;
  disableFuture?: boolean;
  helperText?: string;
  error?: boolean;
  label?: string;
  min?: dayjs.Dayjs;
  max?: dayjs.Dayjs;
  views?: DateView[];
}

export function TimeInput({
                            onChange,
                            defaultValue,
                            value,
                            disableFuture,
                            error,
                            onAccept,
                            helperText,
                            label,
                            min,
                            max,
                            views,
                          }: Readonly<TimeInputProps>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
      <DesktopTimePicker
        label={label}
        minTime={min}
        maxTime={max}
        ampmInClock={false}
        ampm={false}
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

import { Controller, useController } from "react-hook-form";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";

export const HeatPumpTextField = ({
  name,
  control,
  label,
  disabled,
  required,
}) => {
  const { formState } = useController({ name, control });

  return (
    <Controller
      name={name}
      control={control}
      rules={
        required && {
          required: { value: true, message: "This field is required!" },
        }
      }
      render={({ field }) => (
        <TextField
          label={label}
          variant="standard"
          error={!!formState.errors[name]}
          helperText={
            !!formState.errors[name] && formState.errors[name].message
          }
          disabled={disabled}
          {...field}
        />
      )}
    />
  );
};

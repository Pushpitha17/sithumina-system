import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers'

const DateTimePicker = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    }
  };

  if(meta && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
		<TextField
      {...configDateTimePicker}
    />
  )
};

export default DateTimePicker;


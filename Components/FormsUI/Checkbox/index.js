import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

const CheckboxWrapper = ({
  name,
  label,
  legend,
  setState,
  ...otherProps
}) => {


  const handleChange = evt => {
    const { checked } = evt.target;
    setState(checked)
  };

  const configCheckbox = {
    color: "primary",
    onChange: handleChange
  };


  return (
    <FormControl>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;

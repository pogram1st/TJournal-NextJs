import { TextField } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type FormFieldProps = {
  name: string;
  label: string;
};

export const FormField: React.FC<FormFieldProps> = ({ name, label }) => {
  const { register, formState } = useFormContext();
  return (
    <TextField
      {...register(name)}
      name={name}
      className='mb-20'
      size='small'
      error={Boolean(formState.errors[name])}
      helperText={formState.errors[name]?.message}
      label={label}
      variant='outlined'
      fullWidth
    />
  );
};

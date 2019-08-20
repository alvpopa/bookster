import React from 'react';
import { Input, FormFeedback } from 'reactstrap';

const CustomInput = ({ field, form: { touched, errors }, ...props }) => (
  <>
    <Input
      invalid={!!(touched[field.name] && errors[field.name])}
      {...field}
      {...props}
    />
    {touched[field.name] && errors[field.name] && (
      <FormFeedback>{errors[field.name]}</FormFeedback>
    )}
  </>
);

export default CustomInput;

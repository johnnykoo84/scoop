import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Message } from 'semantic-ui-react';

export default function FormField({
  input, label, type, placeholder,
  meta: { touched, error, warning },
  as: As = Input,
  ...props
}) {
  console.log('props', props, 'touched', touched, 'error', error, 'label', label)
  return (
    <Form.Field>
      <As
        {...props}
        {...input}
        value={input.value}
        type={type}
        label={label}
        placeholder={placeholder}
      />
      {
        touched
        && ((error && <Message negative><i>{error}</i></Message>)
        || (warning && <Message negative><i>{warning}</i></Message>))
      }
    </Form.Field>
  );
}

FormField.propTypes = {
  as: PropTypes.any,
  input: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object
};

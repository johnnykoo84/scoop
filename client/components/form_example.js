// semantic-ui-form.js

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';

export default function semanticFormField ({ input, type, label, placeholder, meta: { touched, error, warning }, as: As = Input, ...props }) {
  function handleChange (e, { value }) {
    return input.onChange(value);
  }
  return (
    <Form.Field>
      <As
        {...props}
        {...input}
        value={input.value} 
        type={type}
        label={label}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {touched && ((error && <span><i>{error}</i></span>) || (warning && <span><i>{warning}</i></span>))}
    </Form.Field>
  );
}

semanticFormField.propTypes = {
  as: PropTypes.any,
  input: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object
};

// validation.js

export const required = value => (value ? undefined : 'Required');
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const email = value => {
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
};

// your-component.js

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { Button, Form } from 'semantic-ui-react';

import semanticFormField from './semanticFormField';
import { required, number, minValue } from './validation';

const options = [
  { key: '0', text: 'Option 1', value: '0' },
  { key: '1', text: 'Option 2', value: '1' }
];

const ComponentForm = (props) => {
  return (
    <Form name="product" onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="selectExample"
        component={semanticFormField}
        as={Form.Select}
        options={options}
        label="Select label"
        placeholder="Select an option"
        validate={required}
      />
      <Field name="textInputExample" component={semanticFormField} as={Form.Input} type="text" label="Input label" placeholder="Text Input" validate={required} />
      <Field name="numberInputExample" component={semanticFormField} as={Form.Input} type="text" label="Number label" placeholder="Number Input" validate={number} />
      <Field name="emailInputExample" component={semanticFormField} as={Form.Input} type="email" label="Email label" placeholder="Email Input" validate={[required, email]} />
      <Button primary loading={submitting} disabled={pristine || submitting}>Submit</Button>
    </Form>
  );
};

ComponentForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  onSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
};

export default compose(
  reduxForm({
    form: 'yourComponent',
    enableReinitialize: true
  })
)(ComponentForm);

// Use the above created form component anywhere else in the code base

import ComponentForm from './your-component';

class ComponentWhereFormIsUsed extends React.Component {

  // Capturing redux form values from redux form store (pay attention to the name we defined in the previous component)
  onSubmit = values => {(
    values.selectExample,
    values.textInputExample,
    values.numberInputExample,
    values.emailInputExample
  )};

  render() {
    return (
      <ComponentForm onSubmit={this.onSubmit} />
    );
  }
}

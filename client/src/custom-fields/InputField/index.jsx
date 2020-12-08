import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';


InputField.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
};
InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disable: false,
}

function InputField(props) {
  const { form, field,
    type, label, placeholder, disable } = props;

  const { name } = field;
  const { errors, touched } = form;

  const showErrors = errors[name] && touched[name];
  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Input
        id={name}
        name={name}
        {...field}

        type={type}
        placeholder={placeholder}
        disabled={disable}
        invalid={showErrors}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;
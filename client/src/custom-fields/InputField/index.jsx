import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';


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
  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Input
        name={name}
        {...field}

        type={type}
        placeholder={placeholder}
        disabled={disable}
      />
    </FormGroup>
  );
}

export default InputField;
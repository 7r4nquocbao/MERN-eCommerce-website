import React from 'react';
import PropTypes from 'prop-types';
import './RadioField.scss';
import { CustomInput, FormGroup, Label } from 'reactstrap';

RadioField.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,

  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};
RadioField.defaultProps = {
  type: 'radio',
  id: '',
  label: '',

}

function RadioField(props) {
  const {
    form, field,
    type, label, id
  } = props;
  const { name, value, onChange, onBlur } = field;
  return (
    <div className="radio-button">
      <FormGroup>
        <CustomInput
          name={name}
          id={id}
          type={type}
          value={id}
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {label && <Label for={name}>{label}</Label>}
      </FormGroup>
    </div >
  );
}

export default RadioField;
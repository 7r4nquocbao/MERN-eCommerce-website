import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormGroup } from '@material-ui/core';
import { Label } from 'reactstrap';

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  disable: PropTypes.bool,
};
SelectField.defaultProps = {
  label: '',
  placeholder: '',
  options: [],
  disable: false,
}

function SelectField(props) {
  const { form, field,
    label, placeholder, options, disable } = props;
  const { name, value } = field;

  const selectOption = options.find(option => option.value === value);
  const handleChangeValue = (selectOption) => {
    const selectValue = selectOption ? selectOption.value : selectOption;

    const changValue = {
      target: {
        name: name,
        value: selectValue,
      }
    };
    field.onChange(changValue);
  }

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Select
        name={name}
        {...field}
        value={selectOption}
        onChange={handleChangeValue}
        options={options}
        placeholder={placeholder}
        disable={disable}
      />
    </FormGroup>
  );
}

export default SelectField;
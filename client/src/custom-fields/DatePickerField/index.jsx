import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'react-datepicker';
import { FormGroup, Label } from 'reactstrap';
import { useFormikContext } from 'formik';

DatePickerField.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
};
DatePickerField.defaultProps = {
  label: '',
  placeholder: '',
  disable: false,
}

function DatePickerField(props) {
  const { form, field,
    label, placeholder, disable
  } = props;

  const { name, value } = field;

  const { setFieldValue } = useFormikContext();


  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <DatePicker
        selected={(value && new Date(value)) || null}
        closeOnScroll={true}
        style={{ width: 100 }}
        format="dd//mm/yyyy"

        {...field}
        onChange={date => { setFieldValue(name, date) }}

        placeholder={placeholder}
        disable={disable}
      />
    </FormGroup>

  );
}

export default DatePickerField;
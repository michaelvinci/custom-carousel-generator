import React from 'react';

const CheckboxField = (props) => (
  <label htmlFor={props.id} className="checkbox-field__label">
    <div className="checkbox-field__wrapper">
      <input
        className="checkbox-field__input"
        onChange={props.handleChange}
        type="checkbox"
        id={props.id}
        name={props.id}
        checked={props.value}
        tabIndex={props.tabIndex}
      />
      <span className="checkbox-field"></span>
    </div>
    <span>{props.label}</span>
  </label>
);

export default CheckboxField;

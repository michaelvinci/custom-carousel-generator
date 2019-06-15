import React from 'react';

const SelectField = (props) => {
  const label = props.label ? <label className="input-group__label" htmlFor={props.id}>{props.label}</label> : null;
  const unit = props.unit ? <span className="input-group__unit">{props.unit}</span> : null;
  const renderOptions = () => {
    return props.options.map((option, i) => {
      return <option key={option} value={props.optionValues
        ? props.optionValues[i]
        : option.toLowerCase()}>{option}</option>
    });
  }

  return (
    <>
      {label}
      <select className={props.styles ? props.styles : null}
        name={props.id}
        id={props.id}
        value={props.value}
        disabled={props.isDisabled}
        onChange={props.handleChange}
        tabIndex={props.tabIndex}
      >
      {renderOptions()}
      </select>
      {unit}
    </>
  );
}

export default SelectField;

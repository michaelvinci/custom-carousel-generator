import React from 'react';

const NumberRangeField = (props) => {
  const label = props.label ? <label className="input-group__label" htmlFor={props.id}>{props.label}</label> : null;
  const unit = props.unit ? <span className="input-group__unit">{props.unit}</span> : null;

  return (
    <>
      {label}
      <input
        type={props.type}
        id={props.id}
        className={props.styles}
        name={props.name || props.id}
        value={props.value}
        onChange={props.handleChange}
        min={props.min}
        max={props.max}
        step={props.step}
        disabled={props.isDisabled}
      />
      {unit}
    </>
  );
}

export default NumberRangeField;

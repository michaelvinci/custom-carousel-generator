import React from 'react';

const TextField = (props) => {
  const label = props.label ? <label className="input-group__label" htmlFor={props.id}>{props.label}</label> : null;
  const unit = props.unit ? <span className="input-group__unit">{props.unit}</span> : null;
  
  return (
    <>
      {label}
      <input type="text"
        id={props.id}
        className={props.styles || 'text-field'}
        name={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        tabIndex={props.tabIndex}
      />
      {unit}
    </>
  );
}

export default TextField;

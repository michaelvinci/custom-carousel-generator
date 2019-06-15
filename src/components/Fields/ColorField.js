import React from 'react';

const ColorField = (props) => {
  const label = props.label ? <label className="input-group__label" htmlFor={props.id}>{props.label}</label> : null;

  return (
    <>
      {label}
      <input type="color"
        id={props.id}
        className='color-field'
        name={props.id}
        value={props.value}
        onChange={props.handleChange}
        disabled={props.isDisabled}
        tabIndex={props.tabIndex}
      />
    </>
  );
}

export default ColorField;

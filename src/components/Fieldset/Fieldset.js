import React from 'react';

const Fieldset = (props) => {

  return (
    <fieldset className={`fieldset ${props.styles}`}>
      <legend className="fieldset__legend">
        <h2 className="fieldset__heading">{props.heading}</h2>
      </legend>
      {props.children}
    </fieldset>
  );
}

export default Fieldset;

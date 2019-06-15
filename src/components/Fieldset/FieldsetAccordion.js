import React from 'react';

const FieldsetAccordion = (props) => (
  <fieldset className="fieldset">
    <legend className="fieldset__legend">
      <div className="fieldset__legend-flexwrap">
        <h2 className="fieldset__heading">{props.heading}</h2>
        <hr className="fieldset__legend-hr" />
        <button type="button" className="fieldset__accordion-btn" aria-expanded="true" aria-controls="carousel-settings">&minus;</button>
      </div>
    </legend>
    <div className="fieldset__accordion-content">
      {props.children}
    </div>
  </fieldset>
);

export default FieldsetAccordion;

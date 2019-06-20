import React, { useState } from 'react';

const FieldsetAccordion = (props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [visibility, setVisibility] = useState('');

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
    setVisibility('');
  }

  const toggleVisibility = (e) => {
    if (e.propertyName === 'opacity' && !isExpanded) {
      setVisibility('hidden');
    }
  }

  return (
    <fieldset className="fieldset">
      <legend className="fieldset__legend--accordion">
        <div className="fieldset__legend-flexwrap">
          <h2 className="fieldset__heading">{props.heading}</h2>
          <hr className="fieldset__legend-hr" />
          <button
            type="button"
            onClick={toggleAccordion}
            className="fieldset__accordion-btn"
            aria-expanded={isExpanded}
            aria-controls={props.id}
          >
            {isExpanded ? <span>&minus;</span> : <span>+</span>}
          </button>
        </div>
      </legend>
      <div
        id={props.id}
        className={`${isExpanded ? 'fieldset__accordion-content' : 'fieldset__accordion-content fieldset__accordion-content--collapsed'} ${visibility}`}
        aria-hidden={!isExpanded}
        onTransitionEnd={toggleVisibility}
      >
        {props.children}
      </div>
    </fieldset>
  );
}

export default FieldsetAccordion;

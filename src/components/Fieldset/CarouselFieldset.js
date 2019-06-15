import React from 'react';
import FieldsetAccordion from './FieldsetAccordion';
import FormControlGroup from '../FormControl/FormControlGroup';
import FormControl from '../FormControl/FormControl';

const CarouselFieldset = (props) => (
  <FieldsetAccordion heading="Carousel" id="carousel-settings">
    <div className="fieldset__group">
      <FormControlGroup>
        <FormControl
          type="text"
          label="Namespace ID"
          id="carouselNamespace"
          handleChange={props.updateNamespace}
          placeholder="i.e. my-carousel"
        />
      </FormControlGroup>
      <div className="input-group">
        <span className="fieldset__description">A unique string used as html ID for Carousel instance</span>
      </div>
    </div>
    <hr className="fieldset__divider"/>
    <div className="fieldset__group">
      <FormControlGroup>
        <FormControl
          type="checkbox"
          label="Autoplay"
          id="carouselAutoplay"
          value={props.carouselAutoplay}
          handleChange={props.handleChange}
        />
      </FormControlGroup>
      <FormControlGroup isDisabled={!props.carouselAutoplay}>
        <FormControl
          isDisabled={!props.carouselAutoplay}
          type="number"
          unit="secs"
          styles="number-field--lg"
          id="autoplayDuration"
          value={props.autoplayDuration}
          handleChange={props.handleChange}
          min="1" max="12" step="0.5"
        />
      </FormControlGroup>
    </div>
  </FieldsetAccordion>
);

export default CarouselFieldset;

import React from 'react';
import FieldsetAccordion from './FieldsetAccordion';
import FormControlGroup from '../FormControl/FormControlGroup';
import FormControl from '../FormControl/FormControl';

const ImageFieldset = (props) => {
  return (
    <FieldsetAccordion heading="Image">

      <div className="fieldset__group">
        <FormControlGroup>
          <FormControl
            type="select"
            id="imageSize"
            label="Size"
            options={['contain', 'cover']}
            value={props.imageSize}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
        <FormControlGroup>
          <FormControl
            type="color"
            label="End-caps"
            id="endCapColor"
            value={props.endCapColor}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
      </div>
      <hr className="fieldset__divider"/>
      <div className="fieldset__group">
        <FormControlGroup>
          <FormControl
            type="checkbox"
            label="Overlay"
            id="imageOverlay"
            value={props.imageOverlay}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
        <FormControlGroup isDisabled={!props.imageOverlay}>
          <FormControl
            type="color"
            id="imageOverlayColor"
            value={props.imageOverlayColor}
            handleChange={props.handleChange}
            isDisabled={!props.imageOverlay}
          />
        </FormControlGroup>
        <FormControlGroup isDisabled={!props.imageOverlay}>
          <FormControl
            isDisabled={!props.imageOverlay}
            type="number"
            label="Opacity"
            styles="number-field--md"
            id="imageOverlayOpacity"
            value={props.imageOverlayOpacity}
            handleChange={props.handleChange}
            min="1" max="100" step="1"
          />
        </FormControlGroup>
      </div>
      <hr className="fieldset__divider"/>
      <div className="fieldset__group">
        <FormControlGroup>
          <FormControl
            type="select"
            id="transitionStyle"
            label="Slide Animation"
            options={['horizontal', 'view-master', 'vertical', 'dissolve']}
            value={props.transitionStyle}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
      </div>

    </FieldsetAccordion>
  );
}

export default ImageFieldset

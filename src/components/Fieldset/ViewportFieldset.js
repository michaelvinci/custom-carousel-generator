import React from 'react';
import FieldsetAccordion from './FieldsetAccordion';
import FormControlGroup from '../FormControl/FormControlGroup';
import FormControl from '../FormControl/FormControl';

const ViewportFieldset = (props) => {
  const viewportWidth = props.widthUnits === "%"
    ? <FormControl
        type="number"
        id="percentWidth"
        label="Width"
        min="10" max="100" step="1"
        value={props.percentWidth}
        handleChange={props.handleChange}
        styles="number-field--lg"
      />
    : <FormControl
        type="text"
        id="pixelWidth"
        label="Width"
        value={props.pixelWidth}
        handleChange={props.handleChange}
        styles="number-field--lg"
      />

  return (
    <FieldsetAccordion heading="Viewport" id="viewport-settings">
      <div className="fieldset__group">
        <FormControlGroup>
          {viewportWidth}
          <FormControl
            type="select"
            id="widthUnits"
            value={props.widthUnits}
            handleChange={props.handleChange}
            options={['%', 'px']}
            styles="input-group__width-unit"
          />
          <FormControl
            type="range"
            id="widthRange"
            name="percentWidth"
            min="10" max="100" step="1"
            value={props.percentWidth}
            handleChange={props.handleChange}
            styles={props.widthUnits === 'px' ? 'input-group--sub-field disabled' : 'input-group--sub-field'}
            isDisabled={props.widthUnits === 'px' ? true : null}
          />
        </FormControlGroup>
        <FormControlGroup>
          <FormControl
            type="select"
            id="aspectRatio"
            label="Aspect Ratio"
            options={['4:3', '3:2', '1:1', '16:9', '10:3', '3:4', '2:3']}
            value={props.aspectRatio}
            handleChange={props.updateAspectRatio}
          />
        </FormControlGroup>
      </div>
      <hr className="fieldset__divider"/>
      <div className="fieldset__group">
        <FormControlGroup>
          <FormControl
            type="checkbox"
            label="Border"
            id="viewportBorder"
            value={props.viewportBorder}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
        <FormControlGroup isDisabled={!props.viewportBorder}>
          <FormControl
            type="color"
            id="viewportBorderColor"
            value={props.viewportBorderColor}
            handleChange={props.handleChange}
            isDisabled={!props.viewportBorder}
          />
        </FormControlGroup>
        <FormControlGroup isDisabled={!props.viewportBorder}>
          <FormControl
            isDisabled={!props.viewportBorder}
            type="number"
            label="Thickness"
            styles="number-field--sm"
            id="viewportBorderThickness"
            value={props.viewportBorderThickness}
            handleChange={props.handleChange}
            min="1" max="10" step="1"
          />
        </FormControlGroup>
      </div>
      <hr className="fieldset__divider"/>
      <div className="fieldset__group">
        <FormControlGroup>
          <FormControl
            type="select"
            id="viewportUnits"
            label="Rounded Corners"
            options={['circular (px)', 'elliptical (%)']}
            optionValues={['px', '%']}
            value={props.viewportUnits}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
        <FormControlGroup>
          <FormControl
            type="range"
            id="viewportRounding"
            min="0" max="50" step="1"
            value={props.viewportRounding}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
      </div>
    </FieldsetAccordion>
  );
}

export default ViewportFieldset;

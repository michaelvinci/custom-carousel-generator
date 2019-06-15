import React from 'react';
import FieldsetAccordion from './FieldsetAccordion';
import FormControlGroup from '../FormControl/FormControlGroup';
import FormControl from '../FormControl/FormControl';

const ControlsFieldset = (props) => {
  return (
    <FieldsetAccordion heading="Controls">
    <div className="fieldset__group">
      <FormControlGroup>
        <FormControl
          type="color"
          label="Arrows"
          id="arrowColor"
          value={props.arrowColor}
          handleChange={props.handleChange}
        />
      </FormControlGroup>
      <FormControlGroup>
        <FormControl
          type="number"
          label="Opacity"
          styles="number-field--md"
          id="arrowOpacity"
          value={props.arrowOpacity}
          handleChange={props.handleChange}
          min="1" max="100" step="1"
        />
      </FormControlGroup>
    </div>
    <hr className="fieldset__divider"/>
    <div className="fieldset__group">
      <FormControlGroup>
        <FormControl
          type="checkbox"
          label="Indicator Bar"
          id="indicatorBar"
          value={props.indicatorBar}
          handleChange={props.handleChange}
        />
      </FormControlGroup>
      <FormControlGroup isDisabled={!props.indicatorBar}>
        <FormControl
          type="select"
          id="indicatorBarLocation"
          label="Location"
          options={['interior', 'exterior']}
          value={props.indicatorBarLocation}
          isDisabled={!props.indicatorBar}
          handleChange={props.handleChange}
        />
      </FormControlGroup>
      <FormControlGroup isDisabled={!props.indicatorBar}>
        <FormControl
          type="number"
          label="Opacity"
          styles="number-field--md"
          id="indicatorBarOpacity"
          value={props.indicatorBarOpacity}
          min="1" max="100" step="1"
          isDisabled={!props.indicatorBar}
          handleChange={props.handleChange}
        />
      </FormControlGroup>
      <div className="input-group--wrappable">
        <FormControlGroup isDisabled={!props.indicatorBar}>
          <FormControl
            type="select"
            id="indicatorBarStyle"
            label="Style"
            options={['one color', 'two colors']}
            optionValues={['1', '2']}
            value={props.indicatorBarStyle}
            isDisabled={!props.indicatorBar}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
        <div className="input-group--wrappable">
          <FormControlGroup isDisabled={!props.indicatorBar}>
            <FormControl
              type="color"
              id="indicatorActiveColor"
              label="Active"
              value={props.indicatorActiveColor}
              handleChange={props.handleChange}
              isDisabled={!props.indicatorBar}
            />
          </FormControlGroup>
          <FormControlGroup
            isDisabled={!props.indicatorBar}
            isRemoved={props.indicatorBarStyle === '1' ? true : false}
          >
            <FormControl
              type="color"
              id="indicatorInactiveColor"
              label="Inactive"
              value={props.indicatorInactiveColor}
              handleChange={props.handleChange}
              isDisabled={!props.indicatorBar}
            />
          </FormControlGroup>
        </div>
      </div>
    </div>
    <hr className="fieldset__divider"/>
    <div className="fieldset__group fieldset__group--space">
      <div className="input-group--wrappable">
        <FormControlGroup>
          <FormControl
            type="checkbox"
            label="Arrow Background"
            id="arrowBackground"
            value={props.arrowBackground}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
        <FormControlGroup isDisabled={!props.arrowBackground}>
          <FormControl
            type="select"
            id="arrowBackgroundVisibility"
            label="Visibility"
            options={['viewport hover', 'always']}
            optionValues={['viewport', 'always']}
            value={props.arrowBackgroundVisibility}
            isDisabled={!props.arrowBackground}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
      </div>
      <div className="input-group--wrappable">
        <FormControlGroup>
          <FormControl
            type="checkbox"
            label="Indicator Background"
            id="indicatorBackground"
            value={props.indicatorBackground}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
        <FormControlGroup isDisabled={!props.indicatorBackground}>
          <FormControl
            type="select"
            id="indicatorBackgroundVisibility"
            label="Visibility"
            options={['local hover', 'viewport hover', 'always']}
            optionValues={['local', 'viewport', 'always']}
            value={props.indicatorBackgroundVisibility}
            isDisabled={!props.indicatorBackground}
            handleChange={props.handleChange}
          />
        </FormControlGroup>
      </div>

    </div>

    <div className="fieldset__group">
      <FormControlGroup>
        <FormControl
          type="color"
          label="Background Style"
          id="controlsBackgroundColor"
          value={props.controlsBackgroundColor}
          handleChange={props.handleChange}
        />
      </FormControlGroup>
      <FormControlGroup>
        <FormControl
          type="number"
          label="Opacity"
          styles="number-field--md"
          id="controlsBackgroundOpacity"
          value={props.controlsBackgroundOpacity}
          min="1" max="100" step="1"
          handleChange={props.handleChange}
        />
      </FormControlGroup>
      <FormControlGroup>
        <FormControl
          type="checkbox"
          label="Feather"
          id="controlsBackgroundFeather"
          value={props.controlsBackgroundFeather}
          handleChange={props.handleChange}
        />
      </FormControlGroup>
    </div>
    </FieldsetAccordion>
  );
}

export default ControlsFieldset;

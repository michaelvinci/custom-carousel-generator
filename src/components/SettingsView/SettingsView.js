import React from 'react';
import CarouselFieldset from '../Fieldset/CarouselFieldset';
import ViewportFieldset from '../Fieldset/ViewportFieldset';
import ImageFieldset from '../Fieldset/ImageFieldset';
import ControlsFieldset from '../Fieldset/ControlsFieldset';
import PreviewFieldset from '../Fieldset/PreviewFieldset';

const SettingsView = (props) => (
  <form id="settingsView" role="tabpanel" aria-labelledby="settingsTab" className={`settings-form ${props.visibility}`} autoComplete="off">
    <PreviewFieldset />
    <div className="settings-form__group">
      <CarouselFieldset />
      <ViewportFieldset />
      <ImageFieldset />
      <ControlsFieldset />
    </div>
  </form>
);

export default SettingsView;

import React from 'react';
import SettingsForm from '../SettingsForm/SettingsForm';
import FixedPanel from '../Fieldset/Fieldset';


class SettingsView extends React.Component {

  render() {
    return (
      <div className="settings-view">
        <FixedPanel />
        <SettingsForm />
      </div>
    );
  }
}

export default SettingsView;

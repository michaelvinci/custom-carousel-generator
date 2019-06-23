import React from 'react';
import CheckboxField from '../Fields/CheckboxField';
import TextField from '../Fields/TextField';
import NumberRangeField from '../Fields/NumberRangeField';
import SelectField from '../Fields/SelectField';
import ColorField from '../Fields/ColorField';

class FormControl extends React.Component {
  renderField() {
    const {type, ...fieldProps} = this.props;
    switch (type) {
      case 'text':
        return <TextField {...fieldProps} />;
      case 'checkbox':
        return <CheckboxField {...fieldProps} />;
        case 'number':
        case 'range':
          return <NumberRangeField {...this.props} />;
        case 'select':
          return <SelectField {...fieldProps} />;
          case 'color':
            return <ColorField {...fieldProps} />;
      default:
        return;
    }
  }

  render() {
    return (
      <>
        {this.renderField()}
      </>
    );
  }
}

export default FormControl;

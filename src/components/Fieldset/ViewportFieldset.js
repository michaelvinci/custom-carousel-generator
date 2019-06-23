import React from 'react';
import FieldsetAccordion from './FieldsetAccordion';
import FormControlGroup from '../FormControl/FormControlGroup';
import FormControl from '../FormControl/FormControl';
import { connect } from 'react-redux';
import { updateSettings, updateCarouselStyle, addInstanceOption, removeInstanceOption } from '../../actions';

class ViewportFieldset extends React.Component {
  constructor(props) {
    super(props);
    this.currentField = null;
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let props = {};
    switch (name) {
      case 'pixelWidth':
        let numOnly = value.match(/[0-9]/g);
        numOnly = numOnly ? numOnly.join('') : '';
        if (numOnly === this.props.pixelWidth) return;
        props = { [name]: numOnly };
        break;
      default:
        props = { [name]: value };
    }
    this.currentField = name;
    this.props.updateSettings(props);
  }

  updateStyles (currentField) {
    switch (currentField) {
      case 'percentWidth':
      case 'pixelWidth':
      case 'widthUnits':
        this.updateViewportWidth();
        break;
      case 'aspectRatio':
        this.updateAspectRatio();
        break;
      case 'viewportBorder':
      case 'viewportBorderColor':
      case 'viewportBorderThickness':
        this.updateViewportBorder();
        break;
      case 'roundingUnits':
      case 'viewportRounding':
        this.updateViewportRounding();
        break;
      default:
    }
    this.currentField = null;
  }

  updateViewportWidth() {
    const currentWidth = this.props.widthUnits === '%' ? this.props.percentWidth : this.props.pixelWidth;
    this.props.updateCarouselStyle('carousel', 'width', `${currentWidth}${this.props.widthUnits}`);
    if (this.props.widthUnits === 'px' && this.props.roundingUnits === 'px') this.updateViewportRounding();
  }

  updateAspectRatio() {
    this.props.updateCarouselStyle('viewport', 'paddingBottom', `${parseFloat(((100 * this.props.y) / this.props.x).toFixed(2), 10)}%`);
    this.props.aspectRatio === '4:3'
    ? this.props.removeInstanceOption('aspectRatio')
    : this.props.addInstanceOption({ aspectRatio: this.props.aspectRatio });
  }

  updateViewportBorder() {
    if (this.props.viewportBorder) {
      this.props.updateCarouselStyle('viewportWrapper', 'border', `${this.props.viewportBorderThickness}px solid ${this.props.viewportBorderColor}`);
    } else {
      this.props.updateCarouselStyle('viewportWrapper', 'border', 'none');
    }
  }

  updateViewportRounding() {
    const [x, y] = [this.props.x, this.props.y]
    if (this.props.widthUnits === 'px') {
      if (this.props.roundingUnits === 'px') {
        const shortLength = x > y ? (this.props.pixelWidth * y) / x : (this.props.pixelWidth * x) / y;
        const roundingValue = (shortLength * (this.props.viewportRounding / 100)).toFixed(2);
        this.props.updateCarouselStyle('viewportWrapper', 'borderRadius', `${roundingValue}px`)
      } else {
        this.props.updateCarouselStyle('viewportWrapper', 'borderRadius', `${this.props.viewportRounding}%`)
      }
    } else if (this.props.roundingUnits === 'px') {
      const shortRound = x > y ? (this.props.viewportRounding * y) / x : (this.props.viewportRounding * x) / y;
      const roundingValue = x > y ? `${shortRound}%/${this.props.viewportRounding}%` : `${this.props.viewportRounding}%/${shortRound}%`;
      this.props.updateCarouselStyle('viewportWrapper', 'borderRadius', roundingValue)
    } else {
      this.props.updateCarouselStyle('viewportWrapper', 'borderRadius', `${this.props.viewportRounding}%`)
    }
  }

  componentDidMount() {
    if (window.innerWidth <= 600) {
      this.props.updateCarouselStyle('viewportWrapper', 'borderRadius', `${this.props.viewportRounding}%`)
      this.props.updateCarouselStyle('carousel', 'width', `${this.props.percentWidth}${this.props.widthUnits}`);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.currentField) this.updateStyles(this.currentField);
    if (this.props.aspectRatio !== prevProps.aspectRatio) this.updateStyles('viewportRounding');
  }

  render() {
    const viewportWidth = this.props.widthUnits === "%"
      ? <FormControl
          type="number"
          id="percentWidth"
          label="Width"
          min="10" max="100" step="1"
          value={this.props.percentWidth}
          handleChange={this.handleChange}
          styles="number-field--xl"
        />
      : <FormControl
          type="text"
          id="pixelWidth"
          label="Width"
          placeholder="i.e. 640"
          value={this.props.pixelWidth}
          handleChange={this.handleChange}
          styles="number-field--xl"
        />

    return (
      <FieldsetAccordion heading="Viewport" id="viewport-settings">
        <div className="fieldset__group">
          <FormControlGroup>
            {viewportWidth}
            <FormControl
              type="select"
              id="widthUnits"
              value={this.props.widthUnits}
              handleChange={this.handleChange}
              options={['%', 'px']}
              styles="input-group__width-unit"
            />
            <FormControl
              type="range"
              id="widthRange"
              name="percentWidth"
              min="10" max="100" step="1"
              value={this.props.percentWidth}
              handleChange={this.handleChange}
              styles={this.props.widthUnits === 'px' ? 'input-group--sub-field disabled' : 'input-group--sub-field'}
              isDisabled={this.props.widthUnits === 'px' ? true : null}
            />
          </FormControlGroup>
          <FormControlGroup>
            <FormControl
              type="select"
              id="aspectRatio"
              label="Aspect Ratio"
              options={['4:3', '3:2', '1:1', '16:9', '10:3', '3:4', '2:3']}
              value={this.props.aspectRatio}
              handleChange={this.handleChange}
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
              value={this.props.viewportBorder}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
          <FormControlGroup isDisabled={!this.props.viewportBorder}>
            <FormControl
              type="color"
              id="viewportBorderColor"
              value={this.props.viewportBorderColor}
              handleChange={this.handleChange}
              isDisabled={!this.props.viewportBorder}
            />
          </FormControlGroup>
          <FormControlGroup isDisabled={!this.props.viewportBorder}>
            <FormControl
              isDisabled={!this.props.viewportBorder}
              type="number"
              label="Thickness"
              styles="number-field--sm"
              id="viewportBorderThickness"
              value={this.props.viewportBorderThickness}
              handleChange={this.handleChange}
              min="1" max="10" step="1"
            />
          </FormControlGroup>
        </div>
        <hr className="fieldset__divider"/>
        <div className="fieldset__group">
          <FormControlGroup>
            <FormControl
              type="select"
              id="roundingUnits"
              label="Rounded Corners"
              options={['circular (px)', 'elliptical (%)']}
              optionValues={['px', '%']}
              value={this.props.roundingUnits}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
          <FormControlGroup>
            <FormControl
              type="range"
              id="viewportRounding"
              min="0" max="50" step="1"
              value={this.props.viewportRounding}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
        </div>
      </FieldsetAccordion>
    );
  }
}

const mapStateToProps = (state) => {
  const [x, y] = state.settings.aspectRatio.split(':').map(val => parseInt(val, 10));
  return {
    percentWidth: state.settings.percentWidth,
    pixelWidth: state.settings.pixelWidth,
    widthUnits: state.settings.widthUnits,
    aspectRatio: state.settings.aspectRatio,
    x, y,
    viewportBorder: state.settings.viewportBorder,
    viewportBorderColor: state.settings.viewportBorderColor,
    viewportBorderThickness: state.settings.viewportBorderThickness,
    viewportRounding: state.settings.viewportRounding,
    roundingUnits: state.settings.roundingUnits,
  };
}

export default connect(
  mapStateToProps,
  { updateSettings, updateCarouselStyle, addInstanceOption, removeInstanceOption }
)(ViewportFieldset);

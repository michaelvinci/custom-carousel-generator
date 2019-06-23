import React from 'react';
import FieldsetAccordion from './FieldsetAccordion';
import FormControlGroup from '../FormControl/FormControlGroup';
import FormControl from '../FormControl/FormControl';
import { connect } from 'react-redux';
import { updateSettings, updateCarouselStyle, addInstanceOption, removeInstanceOption } from '../../actions';

class ControlsFieldset extends React.Component {
  constructor(props) {
    super(props);
    this.currentField = null;
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    
    this.currentField = name;
    this.props.updateSettings({ [name]: value });
  }

  updateStyles() {
    switch(this.currentField) {
      case 'arrowColor':
      case 'arrowOpacity':
        this.updateArrows();
        break;
      case 'indicatorBar':
      case 'indicatorBarLocation':
      case 'indicatorBarOpacity':
      case 'indicatorBarStyle':
      case 'indicatorActiveColor':
      case 'indicatorInactiveColor':
        this.updateIndicatorBar();
        if (this.props.indicatorBar && this.props.indicatorBarLocation !== 'interior') {
          this.props.addInstanceOption({ indicatorBar: this.props.indicatorBarLocation });
        } else if (!this.props.indicatorBar) {
          this.props.addInstanceOption({ indicatorBar: 'off' });
        } else {
          this.props.removeInstanceOption('indicatorBar');
        }
        break;
      case 'arrowBackground':
      case 'arrowBackgroundVisibility':
      case 'indicatorBackground':
      case 'indicatorBackgroundVisibility':
      case 'controlsBackgroundColor':
      case 'controlsBackgroundOpacity':
      case 'controlsBackgroundFeather':
        this.updateControlBackgrounds();
        break;
      default:
    }
    this.currentField = null;
  }

  updateArrows() {
    this.props.updateCarouselStyle('arrowSvg', 'opacity', `${this.props.arrowOpacity / 100}`);
    this.props.updateCarouselStyle('arrowPath', 'stroke', this.props.arrowColor);
  }

  updateIndicatorBar() {
    if (this.props.carouselRef.querySelector('.carousel__indicator-bar--exterior') === null) {
       this.props.carouselRef.insertAdjacentHTML('beforeend', '<div class="carousel__indicator-bar carousel__indicator-bar--exterior"></div>');
    }

    const indicatorBarInterior = this.props.carouselRef.querySelector('.carousel__indicator-bar--interior');
    const indicatorBarExterior = this.props.carouselRef.querySelector('.carousel__indicator-bar--exterior');
    const indicatorWrapper = this.props.carouselRef.querySelector('.carousel__indicator-wrapper');

    this.props.indicatorBar
      ? this.props.updateCarouselStyle('indicatorBar', 'visibility', 'visible')
      : this.props.updateCarouselStyle('indicatorBar', 'visibility', 'hidden')

    if (this.props.indicatorBarLocation === 'interior') {
      indicatorBarInterior.appendChild(indicatorWrapper);
      indicatorBarInterior.style.visibility = '';
    } else {
      indicatorBarExterior.appendChild(indicatorWrapper);
      indicatorBarInterior.style.visibility = 'hidden';
    }

    this.props.updateCarouselStyle('indicatorActive', 'backgroundColor', this.props.indicatorActiveColor);
    this.props.updateCarouselStyle('indicatorActive', 'boxShadow', `0 0 5px 0 ${this.props.indicatorActiveColor}`);
    this.props.updateCarouselStyle('indicatorActive', 'border', `1px solid ${this.props.indicatorActiveColor}`);
    this.props.updateCarouselStyle('indicatorMarker', 'opacity', `${this.props.indicatorBarOpacity / 100}`);

    if (this.props.indicatorBarStyle === '1') {
      this.props.updateCarouselStyle('indicatorMarker', 'border', `1px solid ${this.props.indicatorActiveColor}`);
      this.props.updateCarouselStyle('indicatorMarker', 'backgroundColor', 'transparent');
    } else {
      this.props.updateCarouselStyle('indicatorMarker', 'border', `1px solid ${this.props.indicatorInactiveColor}`);
      this.props.updateCarouselStyle('indicatorMarker', 'backgroundColor', this.props.indicatorInactiveColor);
    }
  }

  updateControlBackgrounds() {
    this.props.arrowBackground
      ? this.props.updateCarouselStyle('arrowBackground', 'display', 'block')
      : this.props.updateCarouselStyle('arrowBackground', 'display', 'none')

    this.props.indicatorBackground
      ? this.props.updateCarouselStyle('indicatorBackground', 'display', 'block')
      : this.props.updateCarouselStyle('indicatorBackground', 'display', 'none')

    if (this.props.arrowBackgroundVisibility === 'viewport') {
      this.props.updateCarouselStyle('viewportArrowHover', 'opacity', `${this.props.controlsBackgroundOpacity / 100}`);
      this.props.updateCarouselStyle('arrowBackground', 'opacity', '0');
    } else {
      this.props.updateCarouselStyle('viewportArrowHover', 'opacity', '');
      this.props.updateCarouselStyle('arrowBackground', 'opacity', `${this.props.controlsBackgroundOpacity / 100}`);
    }

    if (this.props.indicatorBackgroundVisibility === 'viewport') {
      this.props.updateCarouselStyle('viewportIndicatorHover', 'opacity', `${this.props.controlsBackgroundOpacity / 100}`);
      this.props.updateCarouselStyle('indicatorBackground', 'opacity', '0');
      this.props.updateCarouselStyle('localIndicatorHover', 'opacity', '');
    } else if (this.props.indicatorBackgroundVisibility === 'local') {
      this.props.updateCarouselStyle('viewportIndicatorHover', 'opacity', '');
      this.props.updateCarouselStyle('indicatorBackground', 'opacity', '0');
      this.props.updateCarouselStyle('localIndicatorHover', 'opacity', `${this.props.controlsBackgroundOpacity / 100}`);
    } else {
      this.props.updateCarouselStyle('viewportIndicatorHover', 'opacity', '');
      this.props.updateCarouselStyle('indicatorBackground', 'opacity', `${this.props.controlsBackgroundOpacity / 100}`);
      this.props.updateCarouselStyle('localIndicatorHover', 'opacity', '');
    }

    // controlsBackground1 = actual background, controlsBackground2 = ::after pseudoelement used to fill in rounded corner gaps
    this.props.updateCarouselStyle('controlsBackground1', 'backgroundColor', this.props.controlsBackgroundColor);
    this.props.updateCarouselStyle('controlsBackground2', 'backgroundColor', this.props.controlsBackgroundColor);

    if (this.props.controlsBackgroundFeather) {
      this.props.updateCarouselStyle('arrowBackground', 'boxShadow', `${this.props.controlsBackgroundColor} 0px 0px 8px 9px`);
      this.props.updateCarouselStyle('indicatorBackground', 'boxShadow', `${this.props.controlsBackgroundColor} 0px 0px 8px 9px`);
    } else {
      this.props.updateCarouselStyle('arrowBackground', 'boxShadow', `${this.props.controlsBackgroundColor} 0px 0px 0px 6px`);
      this.props.updateCarouselStyle('indicatorBackground', 'boxShadow', `${this.props.controlsBackgroundColor} 0px 0px 0px 3px`);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.carouselRef !== nextProps.carouselRef) {
     return false;
    }
    return true;
  }

  componentDidUpdate () {
    if (this.currentField) this.updateStyles();
  }

  render() {
    return (
      <FieldsetAccordion heading="Controls" id="controls-settings">
        <div className="fieldset__group">
          <FormControlGroup>
            <FormControl
              type="color"
              label="Arrows"
              id="arrowColor"
              value={this.props.arrowColor}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
          <FormControlGroup>
            <FormControl
              type="number"
              label="Opacity"
              styles="number-field--md"
              id="arrowOpacity"
              value={this.props.arrowOpacity}
              handleChange={this.handleChange}
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
              value={this.props.indicatorBar}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
          <FormControlGroup isDisabled={!this.props.indicatorBar}>
            <FormControl
              type="select"
              id="indicatorBarLocation"
              label="Location"
              options={['interior', 'exterior']}
              value={this.props.indicatorBarLocation}
              isDisabled={!this.props.indicatorBar}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
          <FormControlGroup isDisabled={!this.props.indicatorBar}>
            <FormControl
              type="number"
              label="Opacity"
              styles="number-field--md"
              id="indicatorBarOpacity"
              value={this.props.indicatorBarOpacity}
              min="1" max="100" step="1"
              isDisabled={!this.props.indicatorBar}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
          <div className="input-group--wrappable">
            <FormControlGroup isDisabled={!this.props.indicatorBar}>
              <FormControl
                type="select"
                id="indicatorBarStyle"
                label="Style"
                options={['one color', 'two colors']}
                optionValues={['1', '2']}
                value={this.props.indicatorBarStyle}
                isDisabled={!this.props.indicatorBar}
                handleChange={this.handleChange}
              />
            </FormControlGroup>
            <div className="input-group--wrappable">
              <FormControlGroup isDisabled={!this.props.indicatorBar}>
                <FormControl
                  type="color"
                  id="indicatorActiveColor"
                  label="Active"
                  value={this.props.indicatorActiveColor}
                  handleChange={this.handleChange}
                  isDisabled={!this.props.indicatorBar}
                />
              </FormControlGroup>
              <FormControlGroup
                isDisabled={!this.props.indicatorBar}
                isRemoved={this.props.indicatorBarStyle === '1' ? true : false}
              >
                <FormControl
                  type="color"
                  id="indicatorInactiveColor"
                  label="Inactive"
                  value={this.props.indicatorInactiveColor}
                  handleChange={this.handleChange}
                  isDisabled={!this.props.indicatorBar}
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
                value={this.props.arrowBackground}
                handleChange={this.handleChange}
              />
            </FormControlGroup>
            <FormControlGroup isDisabled={!this.props.arrowBackground}>
              <FormControl
                type="select"
                id="arrowBackgroundVisibility"
                label="Visibility"
                options={['viewport hover', 'always']}
                optionValues={['viewport', 'always']}
                value={this.props.arrowBackgroundVisibility}
                isDisabled={!this.props.arrowBackground}
                handleChange={this.handleChange}
              />
            </FormControlGroup>
          </div>
          <div className="input-group--wrappable">
            <FormControlGroup>
              <FormControl
                type="checkbox"
                label="Indicator Background"
                id="indicatorBackground"
                value={this.props.indicatorBackground}
                handleChange={this.handleChange}
              />
            </FormControlGroup>
            <FormControlGroup isDisabled={!this.props.indicatorBackground}>
              <FormControl
                type="select"
                id="indicatorBackgroundVisibility"
                label="Visibility"
                options={['local hover', 'viewport hover', 'always']}
                optionValues={['local', 'viewport', 'always']}
                value={this.props.indicatorBackgroundVisibility}
                isDisabled={!this.props.indicatorBackground}
                handleChange={this.handleChange}
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
              value={this.props.controlsBackgroundColor}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
          <FormControlGroup>
            <FormControl
              type="number"
              label="Opacity"
              styles="number-field--md"
              id="controlsBackgroundOpacity"
              value={this.props.controlsBackgroundOpacity}
              min="1" max="100" step="1"
              handleChange={this.handleChange}
            />
          </FormControlGroup>
          <FormControlGroup>
            <FormControl
              type="checkbox"
              label="Feather"
              id="controlsBackgroundFeather"
              value={this.props.controlsBackgroundFeather}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
        </div>
      </FieldsetAccordion>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrowColor: state.settings.arrowColor,
    arrowOpacity: state.settings.arrowOpacity,
    indicatorBar: state.settings.indicatorBar,
    indicatorBarLocation: state.settings.indicatorBarLocation,
    indicatorBarOpacity: state.settings.indicatorBarOpacity,
    indicatorBarStyle: state.settings.indicatorBarStyle,
    indicatorActiveColor: state.settings.indicatorActiveColor,
    indicatorInactiveColor: state.settings.indicatorInactiveColor,
    arrowBackground: state.settings.arrowBackground,
    arrowBackgroundVisibility: state.settings.arrowBackgroundVisibility,
    indicatorBackground: state.settings.indicatorBackground,
    indicatorBackgroundVisibility: state.settings.indicatorBackgroundVisibility,
    controlsBackgroundColor: state.settings.controlsBackgroundColor,
    controlsBackgroundOpacity: state.settings.controlsBackgroundOpacity,
    controlsBackgroundFeather: state.settings.controlsBackgroundFeather,
    carouselRef: state.carouselRef
  };
}

export default connect(
  mapStateToProps,
  { updateSettings, updateCarouselStyle, addInstanceOption, removeInstanceOption }
)(ControlsFieldset);

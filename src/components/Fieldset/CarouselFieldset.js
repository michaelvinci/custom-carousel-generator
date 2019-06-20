import React from 'react';
import FieldsetAccordion from './FieldsetAccordion';
import FormControlGroup from '../FormControl/FormControlGroup';
import FormControl from '../FormControl/FormControl';
import { connect } from 'react-redux';
import { updateSettings, updateNamespace, addInstanceOption, removeInstanceOption } from '../../actions';

class CarouselFieldset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayedNamespace: '' };
    this.currentField = null;
  }

  handleChange = (e) => {
    const name = e.target.name;
    let value;

    switch (name) {
      case 'carouselNamespace':
        value = e.target.value;
        let validID = value.match(/[\w-]/g);
        validID = validID ? validID.join('').replace(/^[0-9-]+/, '') : '';
        if (validID === this.state.displayedNamespace) return;
        value = validID === '' ? 'my-carousel' : e.target.value;
        this.setState({displayedNamespace: validID})
        break;
      default:
        value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    }
    this.currentField = name;
    this.props.updateSettings({ [name]: value });
  }

  updateStyles () {
    switch (this.currentField) {
      case 'carouselNamespace':
        this.props.updateNamespace(this.props.carouselNamespace)
        break;
        case 'carouselAutoplay':
        case 'autoplayDuration':
          this.updateAutoplay();
          break;
      default:
    }
    this.currentField = null;
  }

  updateAutoplay() {
    if (this.props.carouselAutoplay) {
      const duration = this.props.autoplayDuration * 1000;
      this.props.addInstanceOption({autoplay: duration})
    } else {
      this.props.removeInstanceOption('autoplay')
    }
  }

  componentDidUpdate() {
    if (this.currentField) this.updateStyles();
  }

  render() {
    return (
      <FieldsetAccordion heading="Carousel" id="carousel-settings">
        <div className="fieldset__group">
          <FormControlGroup>
            <FormControl
              type="text"
              label="Namespace ID"
              id="carouselNamespace"
              value={this.state.displayedNamespace}
              handleChange={this.handleChange}
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
              value={this.props.carouselAutoplay}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
          <FormControlGroup isDisabled={!this.props.carouselAutoplay}>
            <FormControl
              isDisabled={!this.props.carouselAutoplay}
              type="number"
              unit="secs"
              styles="number-field--lg"
              id="autoplayDuration"
              value={this.props.autoplayDuration}
              handleChange={this.handleChange}
              min="1" max="12" step="0.5"
            />
          </FormControlGroup>
        </div>
      </FieldsetAccordion>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    carouselNamespace: state.settings.carouselNamespace,
    carouselAutoplay: state.settings.carouselAutoplay,
    autoplayDuration: state.settings.autoplayDuration
  };
}

export default connect(
  mapStateToProps,
  { updateSettings, updateNamespace, addInstanceOption, removeInstanceOption }
 )(CarouselFieldset);

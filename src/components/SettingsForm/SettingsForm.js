import React from 'react';
import CarouselFieldset from '../Fieldset/CarouselFieldset';
import ViewportFieldset from '../Fieldset/ViewportFieldset';
import ImageFieldset from '../Fieldset/ImageFieldset';
import ControlsFieldset from '../Fieldset/ControlsFieldset';

class SettingsForm extends React.Component {
  state = {
    carouselNamespace: 'my-carousel',
    carouselAutoplay: false,
    autoplayDuration: 5,
    percentWidth: '85',
    pixelWidth: '',
    widthUnits: '%',
    aspectRatio: '4:3',
    aspectRatioX: 4,
    aspectRatioY: 3,
    viewportBorder: false,
    viewportBorderColor: '#000000',
    viewportBorderThickness: '1',
    viewportRounding: '3',
    roundingUnits: 'px',
    imageSize: 'contain',
    endCapColor: '#000000',
    imageOverlay: false,
    imageOverlayColor: '#000000',
    imageOverlayOpacity: '20',
    transitionStyle: 'horizontal',
    arrowColor: '#ffffff',
    arrowOpacity: '70',
    indicatorBar: true,
    indicatorBarLocation: 'interior',
    indicatorBarOpacity: '60',
    indicatorBarStyle: '1',
    indicatorActiveColor: '#ffffff',
    indicatorInactiveColor: '#ffffff',
    arrowBackground: true,
    arrowBackgroundVisibility: 'viewport',
    indicatorBackground: true,
    indicatorBackgroundVisibility: 'local',
    controlsBackgroundColor: '#000000',
    controlsBackgroundOpacity: '50',
    controlsBackgroundFeather: true,
  }

  handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value })
  }

  updateNamespace = (e) => {
    const value = e.target.value === '' ? 'my-carousel' : e.target.value;
    this.setState({ carouselNamespace: value})
  }

  updateAspectRatio = (e) => {
    const value = e.target.value;
    const [x, y] = value.split(':').map(val => parseInt(val, 10));
    this.setState({ aspectRatio: value, aspectRatioX: x, aspectRatioY: y})
  }

  render() {
    return(
      <form className="settings__form" autoComplete="off">
        <CarouselFieldset
          carouselAutoplay={this.state.carouselAutoplay}
          autoplayDuration={this.state.autoplayDuration}
          handleChange={this.handleChange}
          updateNamespace={this.updateNamespace}
        />
        <ViewportFieldset
          percentWidth={this.state.percentWidth}
          pixelWidth={this.state.pixelWidth}
          widthUnits={this.state.widthUnits}
          aspectRatio={this.state.aspectRatio}
          aspectRatioX={this.state.aspectRatioX}
          aspectRatioY={this.state.aspectRatioY}
          viewportBorder={this.state.viewportBorder}
          viewportBorderColor={this.state.viewportBorderColor}
          viewportBorderThickness={this.state.viewportBorderThickness}
          viewportRounding={this.state.viewportRounding}
          roundingUnits={this.state.roundingUnits}
          handleChange={this.handleChange}
          updateAspectRatio={this.updateAspectRatio}
        />
        <ImageFieldset
          imageSize={this.state.imageSize}
          endCapColor={this.state.endCapColor}
          imageOverlay={this.state.imageOverlay}
          imageOverlayColor={this.state.imageOverlayColor}
          imageOverlayOpacity={this.state.imageOverlayOpacity}
          transitionStyle={this.state.transitionStyle}
          handleChange={this.handleChange}
        />
        <ControlsFieldset
          arrowColor={this.state.arrowColor}
          arrowOpacity={this.state.arrowOpacity}
          indicatorBar={this.state.indicatorBar}
          indicatorBarLocation={this.state.indicatorBarLocation}
          indicatorBarOpacity={this.state.indicatorBarOpacity}
          indicatorBarStyle={this.state.indicatorBarStyle}
          indicatorActiveColor={this.state.indicatorActiveColor}
          indicatorInactiveColor={this.state.indicatorInactiveColor}
          arrowBackground={this.state.arrowBackground}
          arrowBackgroundVisibility={this.state.arrowBackgroundVisibility}
          indicatorBackground={this.state.indicatorBackground}
          indicatorBackgroundVisibility={this.state.indicatorBackgroundVisibility}
          controlsBackgroundColor={this.state.controlsBackgroundColor}
          controlsBackgroundOpacity={this.state.controlsBackgroundOpacity}
          controlsBackgroundFeather={this.state.controlsBackgroundFeather}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SettingsForm;

import React from 'react';
import CarouselFieldset from '../Fieldset/CarouselFieldset';
import ViewportFieldset from '../Fieldset/ViewportFieldset';
import ImageFieldset from '../Fieldset/ImageFieldset';
import ControlsFieldset from '../Fieldset/ControlsFieldset';
import PreviewFieldset from '../Fieldset/PreviewFieldset';

class SettingsView extends React.Component {
  // constructor(props) {
  //   super(props)
    //this.mobile = window.innerWidth <= 600 ? true : false;

    // this.state = {
    //   currentField: null,

      // carouselNamespace: 'my-carousel',
      //
      // carouselAutoplay: false,
      // autoplayDuration: 5,

      // percentWidth: this.mobile ? '100' : '85',
      // pixelWidth: '',
      // widthUnits: '%',
      // aspectRatio: '4:3',
      // aspectRatioX: 4,
      // aspectRatioY: 3,
      // viewportBorder: false,
      // viewportBorderColor: '#000000',
      // viewportBorderThickness: '1',
      // viewportRounding: this.mobile ? '0' : '3',
      // roundingUnits: 'px',

    //   imageSize: 'contain',
    //
    //   endCapColor: '#000000',
    //
    //   imageOverlay: false,
    //   imageOverlayColor: '#000000',
    //   imageOverlayOpacity: '20',
    //
    //   transitionStyle: 'horizontal',
    //
    //   arrowColor: '#ffffff',
    //   arrowOpacity: '70',
    //
    //   indicatorBar: true,
    //   indicatorBarLocation: 'interior',
    //   indicatorBarOpacity: '60',
    //   indicatorBarStyle: '1',
    //   indicatorActiveColor: '#ffffff',
    //   indicatorInactiveColor: '#ffffff',
    //
    //   arrowBackground: true,
    //   arrowBackgroundVisibility: 'viewport',
    //   indicatorBackground: true,
    //   indicatorBackgroundVisibility: 'local',
    //   controlsBackgroundColor: '#000000',
    //   controlsBackgroundOpacity: '50',
    //   controlsBackgroundFeather: true,
    // }
  // }


  // handleChange = (e) => {
  //   const name = e.target.name;
  //   let value;
  //   switch (e.target.name) {
  //     case 'carouselNamespace':
  //       value = e.target.value === '' ? 'my-carousel' : e.target.value;
  //       this.setState({ carouselNamespace: value, currentField: name });
  //       break;
  //     case 'aspectRatio':
  //       value = e.target.value;
  //       const [x, y] = value.split(':').map(val => parseInt(val, 10));
  //       this.setState({ aspectRatio: value, aspectRatioX: x, aspectRatioY: y, currentField: name});
  //       break;
  //     default:
  //     value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  //     this.setState({ [e.target.name]: value, currentField: name });
  //   }
  // }

  componentDidMount() {
    console.log('settings view has mounted')
  }

  componentDidUpdate() {
    console.log('settings view has updated')
  }

  render() {
    return (
      <form className={`settings-form ${this.props.visibility}`} autoComplete="off">
        <PreviewFieldset />
        <div className="settings-form__group">
          <CarouselFieldset
            // carouselAutoplay={this.state.carouselAutoplay}
            // autoplayDuration={this.state.autoplayDuration}
            // handleChange={this.handleChange}
          />
          <ViewportFieldset
            // percentWidth={this.state.percentWidth}
            // pixelWidth={this.state.pixelWidth}
            // widthUnits={this.state.widthUnits}
            // aspectRatio={this.state.aspectRatio}
            // aspectRatioX={this.state.aspectRatioX}
            // aspectRatioY={this.state.aspectRatioY}
            // viewportBorder={this.state.viewportBorder}
            // viewportBorderColor={this.state.viewportBorderColor}
            // viewportBorderThickness={this.state.viewportBorderThickness}
            // viewportRounding={this.state.viewportRounding}
            // roundingUnits={this.state.roundingUnits}
            // handleChange={this.handleChange}
          />
          <ImageFieldset
            // imageSize={this.state.imageSize}
            // endCapColor={this.state.endCapColor}
            // imageOverlay={this.state.imageOverlay}
            // imageOverlayColor={this.state.imageOverlayColor}
            // imageOverlayOpacity={this.state.imageOverlayOpacity}
            // transitionStyle={this.state.transitionStyle}
            // handleChange={this.handleChange}
          />
          <ControlsFieldset
            // arrowColor={this.state.arrowColor}
            // arrowOpacity={this.state.arrowOpacity}
            // indicatorBar={this.state.indicatorBar}
            // indicatorBarLocation={this.state.indicatorBarLocation}
            // indicatorBarOpacity={this.state.indicatorBarOpacity}
            // indicatorBarStyle={this.state.indicatorBarStyle}
            // indicatorActiveColor={this.state.indicatorActiveColor}
            // indicatorInactiveColor={this.state.indicatorInactiveColor}
            // arrowBackground={this.state.arrowBackground}
            // arrowBackgroundVisibility={this.state.arrowBackgroundVisibility}
            // indicatorBackground={this.state.indicatorBackground}
            // indicatorBackgroundVisibility={this.state.indicatorBackgroundVisibility}
            // controlsBackgroundColor={this.state.controlsBackgroundColor}
            // controlsBackgroundOpacity={this.state.controlsBackgroundOpacity}
            // controlsBackgroundFeather={this.state.controlsBackgroundFeather}
            // handleChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

export default SettingsView;

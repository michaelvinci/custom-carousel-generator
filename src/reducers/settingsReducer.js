const mobile = window.innerWidth <= 600 ? true : false;

const initial = {
  carouselNamespace: 'my-carousel',
  carouselAutoplay: false,
  autoplayDuration: 5,
  percentWidth: mobile ? '100' : '85',
  pixelWidth: '',
  widthUnits: '%',
  aspectRatio: '4:3',
  viewportBorder: false,
  viewportBorderColor: '#000000',
  viewportBorderThickness: '1',
  viewportRounding: mobile ? '0' : '3',
  roundingUnits: 'px',
  imageSize: 'contain',
  endCapColor: '#000000',
  slideOverlay: false,
  slideOverlayColor: '#000000',
  slideOverlayOpacity: '20',
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

const settingsReducer = (settings = initial, action) => {
  if (action.type === 'UPDATE_SETTINGS') {
    return { ...settings, ...action.payload }
  }
  return settings;
}

export default settingsReducer;

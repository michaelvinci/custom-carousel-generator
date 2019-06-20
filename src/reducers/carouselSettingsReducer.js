const initial = {
  carouselNamespace: 'my-carousel',
  carouselAutoplay: false,
  autoplayDuration: 5,
}

const carouselSettingsReducer = (settings = initial, action) => {
  if (action.type === 'UPDATE_CAROUSEL') {
    return {...settings, ...action.payload}
  }
  return settings;
}

export default carouselSettingsReducer;

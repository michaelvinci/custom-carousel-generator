import { combineReducers } from 'redux';

import carouselStyleReducer from './carouselStyleReducer';
import settingsReducer from './settingsReducer';
import instanceOptionsReducer from './instanceOptionsReducer';
import imageSourcesReducer from './imageSourcesReducer';
import carouselRefReducer from './carouselRefReducer';

export default combineReducers({
  carouselRules: carouselStyleReducer,
  settings: settingsReducer,
  instanceOptions: instanceOptionsReducer,
  imageSources: imageSourcesReducer,
  carouselRef: carouselRefReducer
});

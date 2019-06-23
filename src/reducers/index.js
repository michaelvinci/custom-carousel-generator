import { combineReducers } from 'redux';

import customStyleReducer from './customStyleReducer';
import settingsReducer from './settingsReducer';
import instanceOptionsReducer from './instanceOptionsReducer';
import imageSourcesReducer from './imageSourcesReducer';
import carouselRefReducer from './carouselRefReducer';

export default combineReducers({
  customRules: customStyleReducer,
  settings: settingsReducer,
  instanceOptions: instanceOptionsReducer,
  imageSources: imageSourcesReducer,
  carouselRef: carouselRefReducer
});

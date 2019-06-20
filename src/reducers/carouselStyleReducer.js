import cloneDeep from 'lodash.clonedeep';

const cssRulePairs = [
  { name: 'carousel', dom: '.carousel' },
  { name: 'viewportWrapper', dom: ' .carousel__viewport-wrapper' },
  { name: 'viewportArrowHover', dom: ' .carousel__viewport-wrapper:hover .carousel__controls-background--arrow' },
  { name: 'viewportIndicatorHover', dom: ' .carousel__viewport-wrapper:hover .carousel__controls-background--indicator' },
  { name: 'viewport', dom: ' .carousel__viewport' },
  { name: 'slideContainer', dom: ' .carousel__slide-container' },
  { name: 'slideOverlay', dom: ' .carousel__slide-overlay' },
  { name: 'slidePrev', dom: '.carousel .prev' },
  { name: 'slideQueue', dom: '.carousel .queue' },
  { name: 'arrowSvg', dom: ' .carousel__controls svg' },
  { name: 'arrowPath', dom: ' .carousel__controls path' },
  { name: 'indicatorBar', dom: ' .carousel__indicator-bar' },
  { name: 'localIndicatorHover', dom: ' .carousel__indicator-bar--interior:hover .carousel__controls-background--indicator' },
  { name: 'indicatorMarker', dom: ' .carousel__indicator-marker' },
  { name: 'indicatorActive', dom: ' .carousel__indicator-marker--active' },
  { name: 'controlsBackground1', dom: ' .carousel__controls-background' },
  { name: 'controlsBackground2', dom: ' .carousel__controls-background::after' },
  { name: 'arrowBackground', dom: ' .carousel__controls-background--arrow' },
  { name: 'indicatorBackground', dom: ' .carousel__controls-background--indicator' },
];

let initialState = {};
const [stylesheet] = [...document.styleSheets].filter(val => val.title === 'carousel');
const cssRules = [...stylesheet.cssRules || stylesheet.rules];

cssRulePairs.forEach((val) => {
  [initialState[val.name]] = cssRules.filter(el => el.selectorText === `#my-carousel${val.dom}`);
});

const carouselStyleReducer = (rules = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'UPDATE_STYLE':
      newState = cloneDeep(rules);
      newState[action.payload.name].style[action.payload.prop] = action.payload.value;
      return newState;
      case 'UPDATE_NAMESPACE':
        newState = cloneDeep(rules);
        cssRulePairs.forEach((val) => {
          newState[val.name].selectorText = `#${action.payload}${val.dom}`;
        });
        return newState;
    default:
      return rules;
  }
}

export default carouselStyleReducer;

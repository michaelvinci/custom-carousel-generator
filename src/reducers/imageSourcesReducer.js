const imageSourcesReducer = (sources={}, action) => {
  switch(action.type) {
    case 'FETCH_IMAGES':
      return action.payload;
      default:
        return sources;
  }
}

export default imageSourcesReducer;

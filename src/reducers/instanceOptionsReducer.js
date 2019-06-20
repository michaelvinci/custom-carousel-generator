const instanceOptionsReducer = (options = {}, action) => {
  switch (action.type) {
    case 'ADD_OPTION':
      return {...options, ...action.payload};
    case 'REMOVE_OPTION':
      const {[action.payload]:foo, ...rest} = options
        return rest;
    default:
      return options;
  }
}

export default instanceOptionsReducer;

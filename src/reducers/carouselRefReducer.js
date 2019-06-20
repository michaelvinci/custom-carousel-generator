const carouselRefReducer = (ref = null, action) => {
  if (action.type === 'STORE_REF') {
    console.log('refReducer', action.payload)
    return action.payload;
  }
  return ref;
}

export default carouselRefReducer;

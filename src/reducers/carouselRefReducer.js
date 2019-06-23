const carouselRefReducer = (ref = null, action) => {
  if (action.type === 'STORE_REF') {
    return action.payload;
  }
  return ref;
}

export default carouselRefReducer;

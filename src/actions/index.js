import axios from 'axios';

export const updateCarouselStyle = (name, prop, value) => {
  return {
    type: 'UPDATE_STYLE',
    payload: {name, prop, value}
  };
}

export const updateNamespace = (namespace) => {
  return {
    type: 'UPDATE_NAMESPACE',
    payload: namespace
  };
}

export const updateSettings = (settingsObj) => {
  return {
    type: 'UPDATE_SETTINGS',
    payload: settingsObj
  };
}

export const addInstanceOption = (optionObj) => {
  return {
    type: 'ADD_OPTION',
    payload: optionObj
  }
}

export const removeInstanceOption = (key) => {
  return {
    type: 'REMOVE_OPTION',
    payload: key
  }
}

export const fetchImages = (query, quantity) => {
  return async (dispatch) => {
    const response = await axios({
      method: 'GET',
      url: 'https://feverdreamdesigns.com/carousel-test/api-call.php',
      params: {query: query, per_page: quantity}
    });

    const sources = response.data.results.map((res) => {
      return {
        url: res.urls.regular,
        alt: res.description,
        auth: res.user.name,
        profile: res.user.links.html
      };
    });

    dispatch({ type: 'FETCH_IMAGES', payload: sources });
  };
};

export const storeRef = (ref) => {
  return {
    type: 'STORE_REF',
    payload: ref
  }
}

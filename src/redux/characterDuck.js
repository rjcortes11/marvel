import axios from 'axios';
import { makeURL, saveLocalStorage, getLocalStorage, cleanCharacter } from '../helpers/toRedux';

let initialData = {
  fetching: false,
  total: 0,
  offset: 0,
  array: [],
  favorites: [],
  showFavorites: false,
  comics: [],
  stories: [],
};

/* CONSTANTS */
let GET_CHARACTERS = 'GET_CHARACTERS';
let GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
let GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';

let GET_MORE_CHARACTERS = 'GET_MORE_CHARACTERS';
let GET_MORE_CHARACTERS_SUCCESS = 'GET_MORE_CHARACTERS_SUCCESS';
let GET_MORE_CHARACTERS_ERROR = 'GET_MORE_CHARACTERS_ERROR';

let ADD_CHARACTERS_TO_FAVORITES = 'ADD_CHARACTERS_TO_FAVORITES';
let GET_CHARACTERS_LOCAL = 'GET_CHARACTERS_LOCAL';
let SET_CHARACTERS_SHOW_FAVORITES = 'SET_CHARACTERS_SHOW_FAVORITES';

let GET_CHARACTERS_4COMISTOR = 'GET_CHARACTERS_4COMISTOR';
let GET_CHARACTERS_4COMISTOR_SUCCESS = 'GET_CHARACTERS_4COMISTOR_SUCCESS';
let GET_CHARACTERS_4COMISTOR_ERROR = 'GET_CHARACTERS_4COMISTOR_ERROR';

/* REDUCERS */
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return { ...state, fetching: true, ...action.payload };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload };

    case GET_MORE_CHARACTERS:
      return { ...state, fetching: true, ...action.payload };
    case GET_MORE_CHARACTERS_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case GET_MORE_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload };

    case GET_CHARACTERS_LOCAL:
      return { ...state, ...action.payload };
    case ADD_CHARACTERS_TO_FAVORITES:
      return { ...state, ...action.payload };
    case SET_CHARACTERS_SHOW_FAVORITES:
      return { ...state, ...action.payload };

    case GET_CHARACTERS_4COMISTOR:
      return { ...state, fetching: true, ...action.payload };
    case GET_CHARACTERS_4COMISTOR_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case GET_CHARACTERS_4COMISTOR_ERROR:
      return { ...state, fetching: false, error: action.payload };

    default:
      return state;
  }
}

/* ACTIONS (THUNKS) */

export let getCharactersLocalAction = () => (dispatch) => {
  let charsLS = getLocalStorage('character');
  if (!charsLS) {
    charsLS = [];
  }
  dispatch({
    type: GET_CHARACTERS_LOCAL,
    payload: { favorites: [...charsLS], error: '' },
  });
};

export let getCharactersAction = (limit = 10) => (dispatch) => {
  dispatch({
    type: GET_CHARACTERS,
    payload: { error: '' },
  });
  return axios
    .get(makeURL(`characters?orderBy=name&limit=${limit}`))
    .then((res) => {
      if (res.data.code === 200 && res.data.status === 'Ok') {
        let newChars = cleanCharacter(res.data.data.results);
        dispatch({
          type: GET_CHARACTERS_SUCCESS,
          payload: {
            array: newChars,
            total: res.data.data.total,
            offset: limit,
          },
        });
      } else {
        dispatch({
          type: GET_CHARACTERS_ERROR,
          payload: res.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: err.message,
      });
    });
};

export let getMoreCharactersAction = (limit = 10) => (dispatch, getState) => {
  dispatch({
    type: GET_MORE_CHARACTERS,
    payload: { error: '' },
  });
  let { offset, array } = getState().character;
  return axios
    .get(makeURL(`characters?orderBy=name&limit=${limit}&offset=${offset}`))
    .then((res) => {
      if (res.data.code === 200 && res.data.status === 'Ok') {
        let newChars = cleanCharacter(res.data.data.results);
        dispatch({
          type: GET_MORE_CHARACTERS_SUCCESS,
          payload: {
            array: [...array, ...newChars],
            offset: limit + offset,
          },
        });
      } else {
        dispatch({
          type: GET_MORE_CHARACTERS_ERROR,
          payload: res.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_MORE_CHARACTERS_ERROR,
        payload: err.message,
      });
    });
};

export let addCharacterFavoritesAction = (char, index) => (dispatch, getState) => {
  let { favorites, array, showFavorites } = getState().character;
  if (showFavorites) {
    index = array.findIndex((element) => element.id === char.id);
  }

  if (array[index].isFavorite) {
    favorites = favorites.filter((fav) => fav.id !== char.id);
  } else {
    favorites.push(char);
  }
  array[index].isFavorite = !array[index].isFavorite;
  dispatch({
    type: ADD_CHARACTERS_TO_FAVORITES,
    payload: {
      favorites: [...favorites],
      array: [...array],
    },
  });
  saveLocalStorage('character', favorites);
};

export let setShowFavoritesAction = (show) => (dispatch) => {
  dispatch({
    type: SET_CHARACTERS_SHOW_FAVORITES,
    payload: { showFavorites: show },
  });
};

export let getCharacters4ComiStorAction = (selected, id) => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS_4COMISTOR,
    payload: { error: '', [selected]: [] },
  });
  return axios
    .get(makeURL(`characters/${id}/${selected}?`))
    .then((res) => {
      if (res.data.code === 200 && res.data.status === 'Ok') {
        let newChars = cleanCharacter(res.data.data.results);
        dispatch({
          type: GET_CHARACTERS_4COMISTOR_SUCCESS,
          payload: {
            [selected]: newChars,
          },
        });
      } else {
        dispatch({
          type: GET_CHARACTERS_4COMISTOR_ERROR,
          payload: res.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_CHARACTERS_4COMISTOR_ERROR,
        payload: err.message,
      });
    });
};

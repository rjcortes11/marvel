import axios from 'axios';
import { makeURL, saveLocalStorage, getLocalStorage, cleanCharacter } from '../helpers/toRedux';

let initialData = {
  fetching: false,
  total: 0,
  offset: 0,
  array: [],
  favorites: [],
};

/* CONSTANTS */
let GET_CHARACTERS = 'GET_CHARACTERS';
let GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
let GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';

let GET_MORE_CHARACTERS = 'GET_MORE_CHARACTERS';
let GET_MORE_CHARACTERS_SUCCESS = 'GET_MORE_CHARACTERS_SUCCESS';
let GET_MORE_CHARACTERS_ERROR = 'GET_MORE_CHARACTERS_ERROR';

let ADD_CHARACTERS_TO_FAVORITES = 'ADD_CHARACTERS_TO_FAVORITES';

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

    case ADD_CHARACTERS_TO_FAVORITES:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

/* ACTIONS (THUNKS) */
export let getCharactersAction = (limit = 10) => (dispatch, getState) => {
  let charsLS = getLocalStorage('character');
  if (!charsLS) {
    charsLS = [];
  }
  dispatch({
    type: GET_CHARACTERS,
    payload: { favorites: [...charsLS], error: '' },
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
  let { favorites, array } = getState().character;
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

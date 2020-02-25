import axios from 'axios';
import { makeURL, saveLocalStorage, getLocalStorage, cleanComics } from '../helpers/toRedux';

let initialData = {
  fetching: false,
  total: 0,
  offset: 0,
  array: [],
  favorites: [],
};

/* CONSTANTS */
let GET_COMICS = 'GET_COMICS';
let GET_COMICS_SUCCESS = 'GET_COMICS_SUCCESS';
let GET_COMICS_ERROR = 'GET_COMICS_ERROR';

let GET_MORE_COMICS = 'GET_MORE_COMICS';
let GET_MORE_COMICS_SUCCESS = 'GET_MORE_COMICS_SUCCESS';
let GET_MORE_COMICS_ERROR = 'GET_MORE_COMICS_ERROR';

let ADD_COMICS_TO_FAVORITES = 'ADD_COMICS_TO_FAVORITES';

/* REDUCERS */
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_COMICS:
      return { ...state, fetching: true, ...action.payload };
    case GET_COMICS_SUCCESS:
      return { ...state, fetching: false, ...action.payload  };
    case GET_COMICS_ERROR:
      return { ...state, fetching: false, error: action.payload };

    case GET_MORE_COMICS:
      return { ...state, fetching: true, ...action.payload };
    case GET_MORE_COMICS_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case GET_MORE_COMICS_ERROR:
      return { ...state, fetching: false, error: action.payload };

    case ADD_COMICS_TO_FAVORITES:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

/* ACTIONS (THUNKS) */
export let getComicsAction = (limit = 10) => (dispatch, getState) => {
  let comicsLS = getLocalStorage('comics');
  if (!comicsLS) {
    comicsLS = [];
  }
  dispatch({
    type: GET_COMICS,
    payload: { favorites: [...comicsLS], error: '' },
  });
  return axios
    .get(makeURL(`comics?orderBy=issueNumber&limit=${limit}`))
    .then((res) => {
      if (res.data.code === 200 && res.data.status === 'Ok') {
        let newComics = cleanComics(res.data.data.results);
        dispatch({
          type: GET_COMICS_SUCCESS,
          payload: {
            array: newComics,
            total: res.data.data.total,
            offset: limit,
          },
        });
      } else {
        dispatch({
          type: GET_COMICS_ERROR,
          payload: res.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_COMICS_ERROR,
        payload: err.message,
      });
    });
};

export let getMoreComicsAction = (limit = 10) => (dispatch, getState) => {
  dispatch({
    type: GET_MORE_COMICS,
    payload: { error: '' },
  });
  let { offset, array } = getState().comic;
  return axios
    .get(makeURL(`comics?orderBy=issueNumber&limit=${limit}&offset=${offset}`))
    .then((res) => {
      if (res.data.code === 200 && res.data.status === 'Ok') {
        let newComics = cleanComics(res.data.data.results);
        dispatch({
          type: GET_MORE_COMICS_SUCCESS,
          payload: {
            array: [...array, ...newComics],
            offset: limit + offset,
          },
        });
      } else {
        dispatch({
          type: GET_MORE_COMICS_ERROR,
          payload: res.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_MORE_COMICS_ERROR,
        payload: err.message,
      });
    });
};

export let addComicFavoritesAction = (comi, index) => (dispatch, getState) => {
  let { favorites, array } = getState().comic;
  if (array[index].isFavorite) {
    favorites = favorites.filter((fav) => fav.id !== comi.id);
  } else {
    favorites.push(comi);
  }
  array[index].isFavorite = !array[index].isFavorite;
  dispatch({
    type: ADD_COMICS_TO_FAVORITES,
    payload: {
      favorites: [...favorites],
      array: [...array],
    },
  });
  saveLocalStorage('comics', favorites);
};

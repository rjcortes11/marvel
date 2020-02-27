import axios from 'axios';
import { makeURL, saveLocalStorage, getLocalStorage, cleanComics } from '../helpers/toRedux';

let initialData = {
  fetching: false,
  total: 0,
  offset: 0,
  array: [],
  favorites: [],
  showFavorites: false,
  characters: [],
  stories: [],
  filters: { format: '', titleStartsWith: '', issueNumber: '' },
};

/* CONSTANTS */
let GET_COMICS = 'GET_COMICS';
let GET_COMICS_SUCCESS = 'GET_COMICS_SUCCESS';
let GET_COMICS_ERROR = 'GET_COMICS_ERROR';

let GET_MORE_COMICS = 'GET_MORE_COMICS';
let GET_MORE_COMICS_SUCCESS = 'GET_MORE_COMICS_SUCCESS';
let GET_MORE_COMICS_ERROR = 'GET_MORE_COMICS_ERROR';

let ADD_COMICS_TO_FAVORITES = 'ADD_COMICS_TO_FAVORITES';
let GET_COMICS_LOCAL = 'GET_COMICS_LOCAL';
let SET_COMICS_SHOW_FAVORITES = 'SET_COMICS_SHOW_FAVORITES';
let SET_COMICS_FILTERS = 'SET_COMICS_FILTERS';

let GET_COMICS_4CHARSTOR = 'GET_COMICS_4CHARSTOR';
let GET_COMICS_4CHARSTOR_SUCCESS = 'GET_COMICS_4CHARSTOR_SUCCESS';
let GET_COMICS_4CHARSTOR_ERROR = 'GET_COMICS_4CHARSTOR_ERROR';

/* REDUCERS */
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_COMICS:
      return { ...state, fetching: true, ...action.payload };
    case GET_COMICS_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case GET_COMICS_ERROR:
      return { ...state, fetching: false, error: action.payload };

    case GET_MORE_COMICS:
      return { ...state, fetching: true, ...action.payload };
    case GET_MORE_COMICS_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case GET_MORE_COMICS_ERROR:
      return { ...state, fetching: false, error: action.payload };

    case GET_COMICS_LOCAL:
      return { ...state, ...action.payload };
    case ADD_COMICS_TO_FAVORITES:
      return { ...state, ...action.payload };
    case SET_COMICS_SHOW_FAVORITES:
      return { ...state, ...action.payload };
    case SET_COMICS_FILTERS:
      return { ...state, ...action.payload };

    case GET_COMICS_4CHARSTOR:
      return { ...state, fetching: true, ...action.payload };
    case GET_COMICS_4CHARSTOR_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case GET_COMICS_4CHARSTOR_ERROR:
      return { ...state, fetching: false, error: action.payload };

    default:
      return state;
  }
}

/* ACTIONS (THUNKS) */

export let getComicsLocalAction = () => (dispatch) => {
  let comicsLS = getLocalStorage('comics');
  if (!comicsLS) {
    comicsLS = [];
  }
  dispatch({
    type: GET_COMICS_LOCAL,
    payload: { favorites: [...comicsLS], error: '' },
  });
};

export let getComicsAction = (limit = 10) => (dispatch, getState) => {
  let { filters } = getState().comic;
  dispatch({
    type: GET_COMICS,
    payload: { error: '' },
  });
  return axios
    .get(makeURL(`comics?orderBy=issueNumber&limit=${limit}`, filters))
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
  let { offset, array, filters } = getState().comic;
  dispatch({
    type: GET_MORE_COMICS,
    payload: { error: '' },
  });
  return axios
    .get(makeURL(`comics?orderBy=issueNumber&limit=${limit}&offset=${offset}`, filters))
    .then((res) => {
      if (res.data.code === 200 && res.data.status === 'Ok') {
        let newComics = cleanComics(res.data.data.results);
        dispatch({
          type: GET_MORE_COMICS_SUCCESS,
          payload: {
            array: [...array, ...newComics],
            total: res.data.data.total,
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
  let { favorites, array, showFavorites } = getState().comic;
  if (showFavorites) {
    index = array.findIndex((element) => element.id === comi.id);
  }

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

export let setShowFavoritesAction = (show) => (dispatch) => {
  dispatch({
    type: SET_COMICS_SHOW_FAVORITES,
    payload: { showFavorites: show },
  });
};

export let getComics4CharStorAction = (selected, id) => (dispatch, getState) => {
  dispatch({
    type: GET_COMICS_4CHARSTOR,
    payload: { error: '', [selected]: [] },
  });
  return axios
    .get(makeURL(`comics/${id}/${selected}?`))
    .then((res) => {
      if (res.data.code === 200 && res.data.status === 'Ok') {
        let newComics = cleanComics(res.data.data.results);
        dispatch({
          type: GET_COMICS_4CHARSTOR_SUCCESS,
          payload: {
            [selected]: newComics,
          },
        });
      } else {
        dispatch({
          type: GET_COMICS_4CHARSTOR_ERROR,
          payload: res.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_COMICS_4CHARSTOR_ERROR,
        payload: err.message,
      });
    });
};

export let setComicsFilters = (newfilters) => (dispatch, getState) => {
  dispatch({
    type: SET_COMICS_FILTERS,
    payload: { error: '', array: [], filters: newfilters, offset: 0, total: 0, showFavorites: false },
  });
};

import axios from 'axios';
import { makeURL, saveLocalStorage, getLocalStorage, cleanStories } from '../helpers/toRedux';

let initialData = {
  fetching: false,
  total: 0,
  offset: 0,
  array: [],
  favorites: [],
  showFavorites: false,
  characters: [],
  comics: [],
};

/* CONSTANTS */
let GET_STORIES = 'GET_STORIES';
let GET_STORIES_SUCCESS = 'GET_STORIES_SUCCESS';
let GET_STORIES_ERROR = 'GET_STORIES_ERROR';

let GET_MORE_STORIES = 'GET_MORE_STORIES';
let GET_MORE_STORIES_SUCCESS = 'GET_MORE_STORIES_SUCCESS';
let GET_MORE_STORIES_ERROR = 'GET_MORE_STORIES_ERROR';

let ADD_STORIES_TO_FAVORITES = 'ADD_STORIES_TO_FAVORITES';
let GET_STORIES_LOCAL = 'GET_STORIES_LOCAL';
let SET_STORIES_SHOW_FAVORITES = 'SET_STORIES_SHOW_FAVORITES';

let GET_STORIES_4COMICHAR = 'GET_STORIES_4COMICHAR';
let GET_STORIES_4COMICHAR_SUCCESS = 'GET_STORIES_4COMICHAR_SUCCESS';
let GET_STORIES_4COMICHAR_ERROR = 'GET_STORIES_4COMICHAR_ERROR';

/* REDUCERS */
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_STORIES:
      return { ...state, fetching: true, ...action.payload };
    case GET_STORIES_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case GET_STORIES_ERROR:
      return { ...state, fetching: false, error: action.payload };

    case GET_MORE_STORIES:
      return { ...state, fetching: true, ...action.payload };
    case GET_MORE_STORIES_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case GET_MORE_STORIES_ERROR:
      return { ...state, fetching: false, error: action.payload };

    case GET_STORIES_LOCAL:
      return { ...state, ...action.payload };
    case ADD_STORIES_TO_FAVORITES:
      return { ...state, ...action.payload };
    case SET_STORIES_SHOW_FAVORITES:
      return { ...state, ...action.payload };

    case GET_STORIES_4COMICHAR:
      return { ...state, fetching: true, ...action.payload };
    case GET_STORIES_4COMICHAR_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case GET_STORIES_4COMICHAR_ERROR:
      return { ...state, fetching: false, error: action.payload };

    default:
      return state;
  }
}

/* ACTIONS (THUNKS) */
export let getStoriesLocalAction = () => (dispatch) => {
  let storyLS = getLocalStorage('story');
  if (!storyLS) {
    storyLS = [];
  }
  dispatch({
    type: GET_STORIES_LOCAL,
    payload: { favorites: [...storyLS], error: '' },
  });
};

export let getStoriesAction = (limit = 10) => (dispatch) => {
  dispatch({
    type: GET_STORIES,
    payload: { error: '' },
  });
  return axios
    .get(makeURL(`stories?limit=${limit}`))
    .then((res) => {
      if (res.data.code === 200 && res.data.status === 'Ok') {
        let newStories = cleanStories(res.data.data.results);
        dispatch({
          type: GET_STORIES_SUCCESS,
          payload: {
            array: newStories,
            total: res.data.data.total,
            offset: limit,
          },
        });
      } else {
        dispatch({
          type: GET_STORIES_ERROR,
          payload: res.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_STORIES_ERROR,
        payload: err.message,
      });
    });
};

export let getMoreStoriesAction = (limit = 10) => (dispatch, getState) => {
  dispatch({
    type: GET_MORE_STORIES,
    payload: { error: '' },
  });
  let { offset, array } = getState().story;
  return axios
    .get(makeURL(`stories?limit=${limit}&offset=${offset}`))
    .then((res) => {
      if (res.data.code === 200 && res.data.status === 'Ok') {
        let newStories = cleanStories(res.data.data.results);
        dispatch({
          type: GET_MORE_STORIES_SUCCESS,
          payload: {
            array: [...array, ...newStories],
            offset: limit + offset,
          },
        });
      } else {
        dispatch({
          type: GET_MORE_STORIES_ERROR,
          payload: res.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_MORE_STORIES_ERROR,
        payload: err.message,
      });
    });
};

export let addStoriesFavoritesAction = (storyA, index) => (dispatch, getState) => {
  let { favorites, array, showFavorites } = getState().story;
  if (showFavorites) {
    index = array.findIndex((element) => element.id === storyA.id);
  }

  if (array[index].isFavorite) {
    favorites = favorites.filter((fav) => fav.id !== storyA.id);
  } else {
    favorites.push(storyA);
  }
  array[index].isFavorite = !array[index].isFavorite;
  dispatch({
    type: ADD_STORIES_TO_FAVORITES,
    payload: {
      favorites: [...favorites],
      array: [...array],
    },
  });
  saveLocalStorage('story', favorites);
};

export let setShowFavoritesAction = (show) => (dispatch) => {
  dispatch({
    type: SET_STORIES_SHOW_FAVORITES,
    payload: { showFavorites: show },
  });
};

export let getStories4ComiCharAction = (selected, id ) =>(dispatch, getState) =>{
  dispatch({
    type: GET_STORIES_4COMICHAR,
    payload: { error: '', [selected]: [] },
  });
  return axios
    .get(makeURL(`stories/${id}/${selected}?`))
    .then((res) => {
      if (res.data.code === 200 && res.data.status === 'Ok') {
        let newStories = cleanStories(res.data.data.results);
        dispatch({
          type: GET_STORIES_4COMICHAR_SUCCESS,
          payload: {
            [selected]: newStories,
          },
        });
      } else {
        dispatch({
          type: GET_STORIES_4COMICHAR_ERROR,
          payload: res.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_STORIES_4COMICHAR_ERROR,
        payload: err.message,
      });
    });
}

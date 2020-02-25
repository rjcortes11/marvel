import axios from "axios";
import {makeURL} from "../helpers/toRedux";

let initialData = {
  fetching: false,
  info: { total: 0, offset: 0, count: 0 },
  array: []
};

/* CONSTANTS */
let GET_COMICS = "GET_COMICS";
let GET_COMICS_SUCCESS = "GET_COMICS_SUCCESS";
let GET_COMICS_ERROR = "GET_COMICS_ERROR";

// let ADD_TO_FAVORIES = "ADD_TO_FAVORIES";

/* REDUCERS */
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_COMICS:
      return { ...state, fetching: true };
    case GET_COMICS_SUCCESS:
      return { ...state, fetching: false, array: action.payload };
    case GET_COMICS_ERROR:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}

/* ACTIONS (THUNKS) */
export let getComicsAction = (limit = 10, offset = 0) => (
  dispatch,
  getState
) => {
  dispatch({
    type: GET_COMICS
  });
  return axios
    .get(makeURL(`comics?orderBy=issueNumber&limit=${limit}&offset=${offset}`))
    .then(res => {
      if (res.data.code === 200 && res.data.status === "Ok") {
        dispatch({
          type: GET_COMICS_SUCCESS,
          payload: res.data.data
        });
      } else {
        console.log(res);
        dispatch({
          type: GET_COMICS_ERROR,
          payload: res.message
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_COMICS_ERROR,
        payload: err.message
      });
    });
};

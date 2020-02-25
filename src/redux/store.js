import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import characterReducer, { getCharactersAction } from "./characterDuck";
import comicsReducer, { getComicsAction } from "./comicDuck";
import storiesReducer, { getStoriesAction } from "./storyDuck";

let rootReducer = combineReducers({
  character: characterReducer,
  comic: comicsReducer,
  story: storiesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  // Obteniendo los personajes por primera vez
  getCharactersAction()(store.dispatch, store.getState);

  // getComicsAction()(store.dispatch, store.getState);
  // getStoriesAction()(store.dispatch, store.getState);
  return store;
}

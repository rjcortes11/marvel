import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import characterReducer, { getCharactersLocalAction } from './characterDuck';
import comicsReducer, { getComicsLocalAction } from './comicDuck';
import storiesReducer, { getStoriesLocalAction } from './storyDuck';

let rootReducer = combineReducers({
  character: characterReducer,
  comic: comicsReducer,
  story: storiesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  getCharactersLocalAction()(store.dispatch, store.getState);
  getComicsLocalAction()(store.dispatch, store.getState);
  getStoriesLocalAction()(store.dispatch, store.getState);
  return store;
}

import React, { lazy, Suspense } from "react";
import {Route, Switch } from 'react-router-dom';
import Spinner from './components/commons/Spinner'
const Home = lazy(() => import("./components/home/Home"));
const ComicsMain = lazy(() => import("./components/comics/ComicsMain"));
const CharactersMain = lazy(() =>
  import("./components/characters/CharactersMain")
);
const StoriesMain = lazy(() => import("./components/stories/StoriesMain"));

export default function Routes() {
  return (
    <Switch>
      <Suspense fallback={<Spinner />}>
        <Route exact path="/" component={Home} />
        <Route exact path="/comics" component={ComicsMain} />
        <Route exact path="/characters" component={CharactersMain} />
        <Route exact path="/stories" component={StoriesMain} />
      </Suspense>
    </Switch>
  );
}

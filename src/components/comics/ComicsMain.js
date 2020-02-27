import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { getMoreComicsAction } from '../../redux/comicDuck';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import { Waypoint } from 'react-waypoint';
const Spinner = lazy(() => import('../commons/Spinner'));
const ComicsSummary = lazy(() => import('./ComicsSummary'));
const ComicsMenu = lazy(() => import('./ComicsMenu'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 180,
    width: 100,
  },
}));

const ComicsMain = ({ comics, fetching, getMoreComicsAction, favoritesList, showFavorites }) => {
  const classes = useStyles();
  const loading = <Skeleton animation='wave' width={200} height={380} style={{ margin: 2 }} />;
  let listShow = [];

  if (showFavorites) {
    listShow = favoritesList;
  } else {
    listShow = comics;
  }

  let moreComics = () => {
    getMoreComicsAction();
  };

  return (
    <>
      <center>
        <h2>COMICS</h2>
        <ComicsMenu />
      </center>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {listShow.map((comic, index) => (
              <Suspense fallback={loading} key={`${comic.id}${index}`}>
                <ComicsSummary index={index} key={`${comic.id}${index}`} />
              </Suspense>
            ))}
          </Grid>
          {fetching ? <Spinner /> : null}
          {showFavorites ? null : <Waypoint onEnter={() => moreComics()} />}
        </Grid>
      </Grid>
    </>
  );
};

function mapState({ comic }) {
  return {
    showFavorites: comic.showFavorites,
    comics: comic.array,
    favoritesList: comic.favorites,
    fetching: comic.fetching,
  };
}

export default connect(mapState, {
  getMoreComicsAction,
})(ComicsMain);

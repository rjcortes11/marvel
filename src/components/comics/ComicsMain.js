import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { getMoreComicsAction } from '../../redux/comicDuck';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import { Waypoint } from 'react-waypoint';
const Spinner = lazy(() => import('../commons/Spinner'));
const ComicsDetail = lazy(() => import('./ComicsDetail'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 180,
    width: 100,
  },
}));

const ComicsMain = ({ comics, fetching, getMoreComicsAction }) => {
  const classes = useStyles();

  let moreComics = () => {
    getMoreComicsAction();
  };

  useEffect(() => {
    // moreComics();
  }, []);

  let loading = <Skeleton animation='wave' width={200} height={380} style={{ margin: 2 }} />;
  return (
    <>
      <center>
        <h2>COMICS</h2>
      </center>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {comics.map((comic, index) => (
              <Suspense fallback={loading} key={`${comic.id}${index}`}>
                <ComicsDetail index={index} key={`${comic.id}${index}`} />
              </Suspense>
            ))}
          </Grid>
          {fetching ? <Spinner /> : null}
          <Waypoint onEnter={() => moreComics()} />
        </Grid>
      </Grid>
    </>
  );
};

function mapState({ comic }) {
  return {
    comics: comic.array,
    fetching: comic.fetching,
  };
}

export default connect(mapState, {
  getMoreComicsAction,
})(ComicsMain);

import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { getMoreStoriesAction } from '../../redux/storyDuck';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import { Waypoint } from 'react-waypoint';
const Spinner = lazy(() => import('../commons/Spinner'));
const StoriesSummary = lazy(() => import('./StoriesSummary'));
const StoriesMenu = lazy(() => import('./StoriesMenu'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 180,
    width: 100,
  },
}));

const StoriesMain = ({ stories, fetching, getMoreStoriesAction, favoritesList, showFavorites }) => {
  const classes = useStyles();
  const loading = <Skeleton animation='wave' width={200} height={380} style={{ margin: 2 }} />;
  let listShow = [];

  if (showFavorites) {
    listShow = favoritesList;
  } else {
    listShow = stories;
  }

  let moreStories = () => {
    getMoreStoriesAction();
  };

  return (
    <>
      <center>
        <h2>STORIES</h2>
        <StoriesMenu />
      </center>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {listShow.map((story, index) => (
              <Suspense fallback={loading} key={`${story.id}${index}`}>
                <StoriesSummary index={index} key={`${story.id}${index}`} />
              </Suspense>
            ))}
          </Grid>
          {fetching ? <Spinner /> : null}
          {showFavorites ? null : <Waypoint onEnter={() => moreStories()} />}
        </Grid>
      </Grid>
    </>
  );
};

function mapState({ story }) {
  return {
    stories: story.array,
    fetching: story.fetching,
    favoritesList: story.favorites,
    showFavorites: story.showFavorites,
  };
}

export default connect(mapState, {
  getMoreStoriesAction,
})(StoriesMain);

import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { getMoreStoriesAction } from '../../redux/storyDuck';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import { Waypoint } from 'react-waypoint';
const Spinner = lazy(() => import('../commons/Spinner'));
const StoriesDetail = lazy(() => import('./StoriesDetail'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 180,
    width: 100,
  },
}));

const StoriesMain = ({ stories, fetching, getMoreStoriesAction }) => {
  const classes = useStyles();

  let moreStories = () => {
    getMoreStoriesAction();
  };

  useEffect(() => {
    // moreStories();
  }, []);

  let loading = <Skeleton animation='wave' width={200} height={380} style={{ margin: 2 }} />;
  return (
    <>
      <center>
        <h2>STORIES</h2>
      </center>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {stories.map((story, index) => (
              <Suspense fallback={loading} key={`${story.id}${index}`}>
                <StoriesDetail index={index} key={`${story.id}${index}`} />
              </Suspense>
            ))}
          </Grid>
          {fetching ? <Spinner /> : null}
          <Waypoint onEnter={() => moreStories()} />
        </Grid>
      </Grid>
    </>
  );
};

function mapState({ story }) {
  return {
    stories: story.array,
    fetching: story.fetching,
  };
}

export default connect(mapState, {
  getMoreStoriesAction,
})(StoriesMain);

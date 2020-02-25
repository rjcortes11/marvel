import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { getMoreCharactersAction } from '../../redux/characterDuck';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import { Waypoint } from 'react-waypoint';
const Spinner = lazy(() => import('../commons/Spinner'));
const CharactersDetails = lazy(() => import('./CharactersDetail'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));

const CharactersMain = ({ chars, fetching, getMoreCharactersAction }) => {
  const classes = useStyles();

  let moreCharacter = () => {
    getMoreCharactersAction();
  };

  useEffect(() => {
    // moreCharacter();
  }, []);

  let loading = <Skeleton animation='wave' width={200} height={380} style={{ margin: 2 }} />;
  return (
    <>
      <center>
        <h2>CHARACTERS</h2>
      </center>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {chars.map((char, index) => (
              <Suspense fallback={loading} key={char.id}>
                <CharactersDetails index={index} key={char.id} />
              </Suspense>
            ))}
          </Grid>
          <Waypoint onEnter={() => moreCharacter()} />
          {fetching ? <Spinner /> : null}
        </Grid>
      </Grid>
    </>
  );
};

function mapState({ character }) {
  return {
    chars: character.array,
    fetching: character.fetching,
  };
}

export default connect(mapState, {
  getMoreCharactersAction
})(CharactersMain);

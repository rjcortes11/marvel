import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { getMoreCharactersAction, addCharacterFavoritesAction } from '../../redux/characterDuck';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

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

const CharactersMain = ({ chars, getMoreCharactersAction }) => {
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
        </Grid>
      </Grid>
    </>
  );
};

function mapState({ character }) {
  return {
    chars: character.array,
  };
}

export default connect(mapState, {
  getMoreCharactersAction,
  addCharacterFavoritesAction,
})(CharactersMain);

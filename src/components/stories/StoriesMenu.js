import React from 'react';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import IconNoFavorite from '@material-ui/icons/FavoriteBorder';
import IconFavorite from '@material-ui/icons/Favorite';

import { connect } from 'react-redux';
import { setShowFavoritesAction } from '../../redux/storyDuck';

const StoriesMenu = ({ showFavorites, setShowFavoritesAction }) => {
  let changeShow = (event, newShowFlag) => {
    setShowFavoritesAction(newShowFlag);
  };

  return (
    <Grid container spacing={2} direction='column' alignItems='center'>
      <Grid item>
        <ToggleButtonGroup size='medium' value={showFavorites} exclusive onChange={changeShow}>
          <ToggleButton key={1} value={false}>
              <IconNoFavorite color='primary' />
          </ToggleButton>
          <ToggleButton key={2} value={true}>
              <IconFavorite color='primary' />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

function mapState({ story }) {
  return {
    showFavorites: story.showFavorites,
  };
}

export default connect(mapState, {
  setShowFavoritesAction,
})(StoriesMenu);

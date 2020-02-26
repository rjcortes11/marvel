import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import IconNoFavorite from '@material-ui/icons/FavoriteBorder';
import IconFavorite from '@material-ui/icons/Favorite';

import { connect } from 'react-redux';
import { addStoriesFavoritesAction } from '../../redux/storyDuck';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 430,
    width: 200,
  },
}));

const StoriesDetail = ({ stories, index, addStoriesFavoritesAction, favoritesList, showFavorites }) => {
  let listShow = [];
  console.log(showFavorites);
  if (showFavorites) {
    listShow = favoritesList;
  } else {
    listShow = stories;
  }
  let story = listShow[index];

  const classes = useStyles();
  let { title, isFavorite } = story;
  let src = `portrait_fantastic.jpg`;

  let addFavorite = (char, index) => {
    addStoriesFavoritesAction(char, index);
  };
  return (
    <Box
      bgcolor='white'
      color='text.primary'
      m={1}
      className={classes.paper}
      textAlign='center'
      // border={3}
      borderColor='primary.main'
      borderRadius={16}
      fontWeight='fontWeightBold'
      fontSize='h7.fontSize'
      boxShadow={3}
    >
      <img style={{ width: 168, height: 252 }} alt={title} src={src} />
      <IconButton aria-label={`info about ${title}`} onClick={() => addFavorite(story, index)}>
        {isFavorite ? <IconFavorite color='primary' /> : <IconNoFavorite color='primary' />}
      </IconButton>
      <br />
      {title}
    </Box>
  );
};

function mapState({ story }) {
  return {
    stories: story.array,
    favoritesList: story.favorites,
    showFavorites: story.showFavorites,    
  };
}

export default connect(mapState, {
  addStoriesFavoritesAction,
})(StoriesDetail);

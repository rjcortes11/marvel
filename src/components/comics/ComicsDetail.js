import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import IconNoFavorite from '@material-ui/icons/FavoriteBorder';
import IconFavorite from '@material-ui/icons/Favorite';

import { connect } from 'react-redux';
import { addComicFavoritesAction } from '../../redux/comicDuck';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 400,
    width: 200,
  },
}));

const ComicsDetails = ({ comics, index, addComicFavoritesAction }) => {
  let comic = comics[index];
  const classes = useStyles();
  let { thumbnail, title, isFavorite } = comic;
  let src = `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`;

  let addFavorite = (char, index) => {
    addComicFavoritesAction(char, index);
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
      <IconButton aria-label={`info about ${title}`} onClick={() => addFavorite(comic, index)}>
        {isFavorite ? <IconFavorite color='primary' /> : <IconNoFavorite color='primary' />}
      </IconButton>
      <br />
      {title}
    </Box>
  );
};

function mapState({ comic }) {
  return {
    comics: comic.array,
  };
}

export default connect(mapState, {
  addComicFavoritesAction,
})(ComicsDetails);

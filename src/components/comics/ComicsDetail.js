import React, { lazy } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import IconNoFavorite from '@material-ui/icons/FavoriteBorder';
import IconFavorite from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import { connect } from 'react-redux';
import { addComicFavoritesAction, getComics4CharStorAction } from '../../redux/comicDuck';

const ComicsModal = lazy(() => import('./ComicsModal'));

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 400,
    width: 200,
  },
}));

const ComicsDetails = ({ comics, index, addComicFavoritesAction, favoritesList, showFavorites, getComics4CharStorAction }) => {
  let listShow = [];
  if (showFavorites) {
    listShow = favoritesList;
  } else {
    listShow = comics;
  }
  let comic = listShow[index];

  const classes = useStyles();
  let { thumbnail, title, isFavorite } = comic;
  let src = `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`;
  const [open, setOpen] = React.useState(false);

  let addFavorite = (char, index) => {
    addComicFavoritesAction(char, index);
  };

  let mostrarModal = () => {
    getComics4CharStorAction('characters', comic.id);
    getComics4CharStorAction('stories', comic.id);
    setOpen(!open);
  };

  return (
    <>
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
        <img style={{ width: 168, height: 252 }} alt={title} src={src} onClick={() => mostrarModal()} />
        <IconButton aria-label={`info about ${title}`} onClick={() => addFavorite(comic, index)}>
          {isFavorite ? <IconFavorite color='primary' /> : <IconNoFavorite color='primary' />}
        </IconButton>
        {'   '}
        <IconButton aria-label='more info' onClick={() => mostrarModal()}>
          <InfoIcon color='primary' />
        </IconButton>
        <br />
        {title}
      </Box>
      <ComicsModal open={open} setOpen={setOpen} comic={comic} />
    </>
  );
};

function mapState({ comic }) {
  return {
    comics: comic.array,
    favoritesList: comic.favorites,
    showFavorites: comic.showFavorites,
  };
}

export default connect(mapState, {
  addComicFavoritesAction,
  getComics4CharStorAction,
})(ComicsDetails);

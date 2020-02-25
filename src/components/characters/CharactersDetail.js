import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import IconNoFavorite from '@material-ui/icons/FavoriteBorder';
import IconFavorite from '@material-ui/icons/Favorite';

import { connect } from 'react-redux';
import { addCharacterFavoritesAction } from '../../redux/characterDuck';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 380,
    width: 200,
  },
}));

const CharactersDetail = ({ chars, index, addCharacterFavoritesAction }) => {
  let character = chars[index];
  const classes = useStyles();
  let { thumbnail, name, isFavorite } = character;
  let src = `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`;

  let addFavorite = (char, index) => {
    addCharacterFavoritesAction(char, index);
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
      fontSize='h6.fontSize'
      boxShadow={3}
    >
      <img style={{ width: 168, height: 252 }} alt={name} src={src} />
      <IconButton aria-label={`info about ${name}`} onClick={() => addFavorite(character, index)}>
        {isFavorite ? <IconFavorite color='primary' /> : <IconNoFavorite color='primary' />}
      </IconButton>
      <br />
      {name}
    </Box>
  );
};

function mapState({ character }) {
  return {
    chars: character.array,
  };
}

export default connect(mapState, {
  addCharacterFavoritesAction,
})(CharactersDetail);

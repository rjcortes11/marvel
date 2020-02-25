import md5 from 'js-md5';

export const makeURL = (peticion) => {
  let timestamp = new Date().getTime();
  let hash = md5(`${timestamp}${process.env.REACT_APP_MARVEL_PRKEY}${process.env.REACT_APP_MARVEL_PUKEY}`);
  let URL = `${process.env.REACT_APP_MARVEL_API}${peticion}&apikey=${process.env.REACT_APP_MARVEL_PUKEY}&ts=${timestamp}&hash=${hash}`;
  console.log(URL);
  return URL;
};

export const saveLocalStorage = (idItemLS, data) => {
  localStorage.setItem(idItemLS, JSON.stringify(data));
};

export const getLocalStorage = (idItemLS) => {
  let data = localStorage.getItem(idItemLS);
  return JSON.parse(data);
};

let isFavoriteEntity = (IdLS, char) => {
  let favEntity = getLocalStorage(IdLS);
  let EntityFav = [];
  if (favEntity) {
    EntityFav = favEntity.find((ent) => ent.id === char.id);
    return EntityFav ? true : false;
  } else {
    return false;
  }
};

export const cleanCharacter = (characters) => {
  let newChars = [];
  newChars = characters.map(function(char) {
    delete char.comics;
    delete char.series;
    delete char.stories;
    delete char.events;
    delete char.urls;
    char.isFavorite = isFavoriteEntity('character', char);
    return char;
  });

  return newChars;
};

export const cleanComics = (comics) => {
  let newComics = [];
  newComics = comics.map(function(comic) {
    delete comic.characters;
    delete comic.series;
    delete comic.stories;
    delete comic.events;
    delete comic.urls;
    delete comic.prices;
    delete comic.collectedIssues;
    delete comic.collections;
    delete comic.variants;
    comic.isFavorite = isFavoriteEntity('comics', comic);
    return comic;
  });

  return newComics;
};

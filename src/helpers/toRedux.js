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

export const cleanCharacter = (characters) => {
  let newChars = [];
  newChars = characters.map(function(char) {
    delete char.comics;
    delete char.series;
    delete char.stories;
    delete char.events;
    delete char.urls;
    char.isFavorite = isFavoriteChars(char); //char.isFavorite =
    return char;
  });

  return newChars;
};

let isFavoriteChars = (char) => {
  let favChars = getLocalStorage('character');
  let charsFav = [];
  if (favChars) {
    charsFav = favChars.find((charF) => charF.id === char.id);
    return charsFav ? true : false;
  } else {
    return false;
  }
};

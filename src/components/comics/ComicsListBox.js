import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getComicsAction, setComicsFilters } from '../../redux/comicDuck';

const ComicsListBox = ({ comics, filters, register, getComicsAction, setComicsFilters }) => {
  const setFilters = (e) => {
    if (e.target.value.length > 3) {
      filters['titleStartsWith'] = e.target.value;
      setComicsFilters(filters);
      getComicsAction();
    }
  };

  return (
    <Autocomplete
      id='format'
      options={comics}
      noOptionsText='Please, enter title of comic...'
      getOptionLabel={(comic) => comic.id.toString()}
      renderOption={(comic) => (
        <React.Fragment>
          {comic.id.toString()} - {comic.title}{' '}
        </React.Fragment>
      )}
      renderInput={(comics) => (
        <TextField
          {...comics}
          name='comics'
          label='comics'
          variant='outlined'
          color='secondary'
          inputRef={register}
          onChange={setFilters}
        />
      )}
    />
  );
};

function mapState({ comic }) {
  let comics = comic.array ? [...comic.array] : [];
  if (comics) {
    comics = comics.map(function(comi) {
      delete comi.digitalId;
      delete comi.issueNumber;
      delete comi.variantDescription;
      delete comi.description;
      delete comi.modified;
      delete comi.isbn;
      delete comi.upc;
      delete comi.diamondCode;
      delete comi.ean;
      delete comi.format;
      delete comi.issn;
      delete comi.pageCount;
      delete comi.textObjects;
      delete comi.resourceURI;
      delete comi.dates;
      delete comi.thumbnail;
      delete comi.images;
      delete comi.creators;
      delete comi.isFavorite;
      return comi;
    });
  }

  return {
    comics: comic.array,
    filters: comic.filters,
  };
}

export default connect(mapState, { getComicsAction, setComicsFilters })(ComicsListBox);

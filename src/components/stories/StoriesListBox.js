import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getStoriesAction, setStoriesFiltersAction } from '../../redux/storyDuck';

const StoriesListBox = ({ stories, filters, register, getStoriesAction, setStoriesFiltersAction }) => {
  const setFilters = (e) => {
    if (e.target.value.length > 3) {
      filters['titleStartsWith'] = e.target.value;
      setStoriesFiltersAction(filters);
      getStoriesAction();
    }
  };

  return (
    <Autocomplete
      id='format'
      options={stories}
      noOptionsText='Please, enter title of story...'
      getOptionLabel={(story) => story.id.toString()}
      renderOption={(story) => (
        <React.Fragment>
          {story.id.toString()} - {story.title}{' '}
        </React.Fragment>
      )}
      renderInput={(stories) => (
        <TextField
          {...stories}
          name='stories'
          label='stories'
          variant='outlined'
          color='secondary'
          inputRef={register}
          onChange={setFilters}
        />
      )}
    />
  );
};

function mapState({ story }) {
  let stories = story.array ? [...story.array] : [];
  if (stories) {
    stories = stories.map(function(story) {
      delete story.description;
      delete story.resourceURI;
      delete story.type;
      delete story.modified;
      delete story.thumbnail;
      delete story.creators;
      delete story.isFavorite;
      return story;
    });
  }

  return {
    stories: story.array,
    filters: story.filters,
  };
}

export default connect(mapState, { getStoriesAction, setStoriesFiltersAction })(StoriesListBox);

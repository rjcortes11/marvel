import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import { setComicsFilters, getComicsAction } from '../../redux/comicDuck';

import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

const ComicsFilter = ({ open = false, setOpen, filters, setComicsFilters, getComicsAction }) => {
  const [scroll, setScroll] = React.useState('paper');
  const { handleSubmit, register } = useForm();

  const comicsList = [
    'comic',
    'magazine',
    'trade paperback',
    'hardcover',
    'digest',
    'graphic novel',
    'digital comic',
    'infinite comic',
  ];

  const setFilters = (values) => {
    setComicsFilters(values);
  };

  const onSubmit = (values) => {
    setFilters(values);
    getComicsAction();
    setOpen(!open);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(!open)}
      scroll={scroll}
      aria-labelledby='filter-title'
      aria-describedby='filter-description'
    >
      <DialogTitle id='filter-dialog-title'>COMIC'S SEARCH</DialogTitle>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText>Please complete the following fields.</DialogContentText>
          <Autocomplete
            id='format'
            options={comicsList}
            getOptionLabel={(comic) => comic}
            renderInput={(comic) => (
              <TextField {...comic} name='format' label='Formats' variant='outlined' color='secondary' inputRef={register} />
            )}
          />
          <TextField
            variant='outlined'
            id='titleStartsWith'
            name='titleStartsWith'
            label='Title Starts With'
            type='text'
            fullWidth
            margin='normal'
            color='secondary'
            inputRef={register}
          />
          <TextField
            variant='outlined'
            id='issueNumber'
            name='issueNumber'
            label='IssueNumber'
            type='number'
            fullWidth
            margin='normal'
            color='secondary'
            inputRef={register}
          />
        </DialogContent>
        <DialogActions>
          <Button type='submit' color='primary'>
            Search
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

function mapState({ comic }) {
  return {
    filters: comic.filters,
  };
}

export default connect(mapState, { setComicsFilters, getComicsAction })(ComicsFilter);

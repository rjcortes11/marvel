import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import { setCharactersFilters } from '../../redux/characterDuck';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  loading: { margin: theme.spacing(0.5) },
}));

const CharacersFilter = ({ open = false, setOpen, filters, setCharactersFilters }) => {
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
    setCharactersFilters(values);
  };

  const onSubmit = (values) => {
    console.log(filters, values);
    if (JSON.stringify(filters) !== JSON.stringify(values)) {
      setFilters(values);
    }
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
      <DialogTitle id='filter-dialog-title'>CHARACTER'S SEARCH</DialogTitle>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText>Please complete the following fields.</DialogContentText>
          <TextField
            variant='outlined'
            id='nameStartsWith'
            name='nameStartsWith'
            label='Name Starts With'
            type='text'
            fullWidth
            margin='normal'
            color='secondary'
            inputRef={register}
          />
          <Autocomplete
            id='format'
            options={comicsList}
            getOptionLabel={(comic) => comic}
            renderInput={(comic) => (
              <TextField {...comic} name='comics' label='comics' variant='outlined' color='secondary' inputRef={register} />
            )}
          />
          <Autocomplete
            id='format'
            options={comicsList}
            getOptionLabel={(comic) => comic}
            renderInput={(comic) => (
              <TextField {...comic} name='stories' label='stories' variant='outlined' color='secondary' inputRef={register} />
            )}
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

export default connect(mapState, { setCharactersFilters })(CharacersFilter);

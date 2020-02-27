import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import { setCharactersFilters, getCharactersAction } from '../../redux/characterDuck';
import ComicsListBox from '../comics/ComicsListBox';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

const CharacersFilter = ({ open = false, setOpen, filters, setCharactersFilters, getCharactersAction }) => {
  const [scroll, setScroll] = React.useState('paper');
  const { handleSubmit, register } = useForm();

  const setFilters = (values) => {
    setCharactersFilters(values);
  };

  const onSubmit = (values) => {
    setFilters(values);
    getCharactersAction();
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
          <ComicsListBox register={register} />
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

function mapState({ character }) {
  return {
    filters: character.filters,
  };
}

export default connect(mapState, { setCharactersFilters, getCharactersAction })(CharacersFilter);

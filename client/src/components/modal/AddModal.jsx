import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  FormGroup,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    handleAdd(data);
    reset();
  };

  const handleAdd = (data) => {
    return fetch(`tables/author/item`, { 
      method: 'POST',
      body: JSON.stringify(data), 
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(result => {
      // const authors = setAuthors(result);
      console.log(result)
    })
    .catch(err => {
      console.error(err)
    })
  }

  return (
    <div className='modal'>
      <Button
        onClick={handleOpen}
        className='button'
        size='small'
        variant='contained'
        endIcon={<SendIcon />}
      >
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            sx={{ mb: 1 }}
            id='modal-modal-title'
            variant='h6'
            component='h2'
          >
            Add new author.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <div style={{ height: 40, color: 'red' }}>
                {errors?.first_name && (
                  <p>{errors?.first_name?.message || 'Error!'}</p>
                )}
              </div>
              <TextField
                {...register('first_name', {
                  required: "'First Name' Field must be filled",
                  minLength: {
                    value: 2,
                    message: 'Minimum 2 characters must be used',
                  },
                })}
                sx={{ mb: 1 }}
                id='outlined-uncontrolled'
                label='First Name'
                helperText='Please enter your name'
              />
              <div style={{ height: 40, color: 'red' }}>
                {errors?.last_name && (
                  <p>{errors?.last_name?.message || 'Error!'}</p>
                )}
              </div>
              <TextField
                {...register('last_name', {
                  required: "'Last Name' Field must be filled",
                  minLength: {
                    value: 2,
                    message: 'Minimum 2 characters must be used',
                  },
                })}
                sx={{ mb: 1 }}
                id='outlined-uncontrolled'
                label='Last Name'
                helperText='Please enter your surname'
              />
              <div style={{ height: 40, color: 'red' }}>
                {errors?.birth_date && (
                  <p style={{ marginTop: -8 }}>
                    {errors?.birth_date?.message || 'Error!'}
                  </p>
                )}
              </div>
              <TextField
                {...register('birth_date', {
                  required: "'Birth Date' Field must be filled",
                  minLength: {
                    value: 10,
                    message: 'Minimum 10 characters must be used',
                  },
                  pattern: {
                    value: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
                    message:
                      "Invalid Date. Date Should be written in the next format: YYYY-MM-DD. Example '1989-10-30'",
                  },
                })}
                sx={{ mb: 1 }}
                id='outlined-uncontrolled'
                label='Date'
                helperText='Please enter date YYYY-MM-DD'
              />
              <div style={{ height: 40, color: 'red' }}>
                {errors?.death_age && (
                  <p>{errors?.death_age?.message || 'Error!'}</p>
                )}
              </div>
              <TextField
                {...register('death_age', {
                  required: "'Death Age' Field must be filled",
                  min: {
                    value: 18,
                    message: 'Age must be above 18 and under 100',
                  },
                  max: {
                    value: 99,
                    message: 'Age must be above 18 and under 100',
                  },
                })}
                sx={{ mb: 1 }}
                id='outlined-uncontrolled'
                type='number'
                label='Age of Death'
                helperText='Write the year of death of the author'
              />
              <div style={{ height: 40, color: 'red' }}>
                {errors?.rating && <p>{errors?.rating?.message || 'Error!'}</p>}
              </div>
              <TextField
                {...register('rating', {
                  required: "'Rating' Field must be filled",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: 'Minimum value is 1',
                  },
                  max: {
                    value: 5,
                    message: 'Maximum value is 5',
                  },
                })}
                id='outlined-uncontrolled'
                label='Rating'
                type='float'
                helperText='Write an actual raiting'
              />
            </FormGroup>
            <br />
            <Button
              sx={{ bgcolor: '#7451f8' }}
              size='small'
              variant='contained'
              endIcon={<SendIcon />}
              type='submit'
              disabled={!isValid}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

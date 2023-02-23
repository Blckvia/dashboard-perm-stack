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
import EditIcon from '@mui/icons-material/Edit';
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

export default function EditModal(props) {
  const [open, setOpen] = React.useState(false);

  const { selectedRows, authors, setAuthors } = props;

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
    handleEdit(data, selectedRows.author_id);
    handleClose();
    reset();
  };

  const handleEdit = async (data, id) => {
    console.log(data);
    try {
      await fetch(`tables/author/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });
      let newAuthor = Object.assign({ author_id: id }, data);
      const authorsWithoutEditQuery = authors.filter(
        (el) => el.author_id !== id
      );
      for (let author of authors) {
        if (author.author_id === id) {
          authorsWithoutEditQuery.push(newAuthor);
        }
        setAuthors(authorsWithoutEditQuery);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='modal'>
      <Button
        onClick={handleOpen}
        className='button'
        size='small'
        variant='contained'
        endIcon={<EditIcon />}
        disabled={selectedRows.length === 0}
      >
        Edit
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
            Edit the chosen author.
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
                defaultValue={selectedRows.first_name}
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
                defaultValue={selectedRows.last_name}
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
                defaultValue={selectedRows.birth_date}
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
                defaultValue={selectedRows.death_age}
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
                defaultValue={selectedRows.rating}
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

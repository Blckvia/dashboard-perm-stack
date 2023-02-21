import * as React from 'react';
import { Box , Button, Typography, Modal, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            To add new Author, please fill in all the lines.
          </Typography>
          <Input placeholder='First Name'></Input>
          <Input placeholder='Last Name'></Input>
          <Input placeholder='YYYY-MM-DD'></Input>
          <Input placeholder='Age of Death'></Input>
          <Input placeholder='Raiting'></Input>
          <br/>
          <Button 
            sx={{mt:0.7}}
            size='small'
            variant='contained'
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

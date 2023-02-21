import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
// import Widget from "../../components/widget/Widget";
import BasicModal from '../../components/modal/modal';
import './homepage.scss';

import { useEffect, useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { Modal, Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';

const authorColumnDefs = [
  { headerName: 'Id', field: 'author_id' },
  { headerName: 'First Name', field: 'first_name' },
  { headerName: 'Last Name', field: 'last_name' },
  { headerName: 'Birth Date', field: 'birth_date' },
  { headerName: 'Age of Death', field: 'death_age' },
  { headerName: 'Raiting', field: 'rating' },
];

const booksColumnDefs = [
  { headerName: 'Id', field: 'book_id' },
  { headerName: 'Title', field: 'book_name' },
  { headerName: 'Publication date', field: 'originally_published' },
  { headerName: 'isbn', field: 'isbn' },
  { headerName: 'Price', field: 'price' },
  { headerName: 'Raiting', field: 'raiting' },
  // { headerName: 'Author ID', field: 'author_id' },
];


const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
};

function HomePage() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState();

  const onSelectionChanged = (gridOptions) => {
    const selectedRows = gridOptions.api.getSelectedRows();
    setSelectedAuthorId(selectedRows[0].author_id);
    // console.log(selectedRows[0]);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`tables/author/${id}`, { method: 'DELETE' });
      const newAuthors = authors.filter((el) => el.author_id !== id);
      const newBooks = books.filter((el) => el.author_id !== id);
      console.log(newBooks);
      setAuthors(newAuthors);
      setBooks(newBooks);
    } catch (err) {
      console.error(err);
    }
  };

  // const handleOpen = () => setOpenModal(true);

  // const handleClose = () => setOpenModal(false);

  useEffect(() => {
    fetch('/tables/author')
      .then((res) => res.json())
      .then((rowData) => setAuthors(rowData.authors))
      .catch((err) => console.log(err));
    fetch('/tables/books')
      .then((res) => res.json())
      .then((rowData) => setBooks(rowData.books))
      .catch((err) => console.log(err))
  }, []);

  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='ag-theme-alpine'>
          {/* <Button
            onClick={handleOpen}
            className='button'
            size='small'
            variant='contained'
            endIcon={<SendIcon />}
          >
            Add
          </Button>
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box className='box'>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Text in a modal
              </Typography>
              <Typography id='modal-modal-description'>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal> */}
          < BasicModal />
          <Button
            className='button'
            size='small'
            variant='contained'
            endIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            disabled={!selectedAuthorId}
            onClick={() => handleDelete(selectedAuthorId)}
            className='button'
            size='small'
            variant='contained'
            endIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <AgGridReact
            popupParent={document.body}
            rowData={authors}
            animateRows={true}
            columnDefs={authorColumnDefs}
            defaultColDef={defaultColDef}
            rowSelection='single'
            onSelectionChanged={onSelectionChanged}
          />
          <AgGridReact 
          popupParent={document.body}
          rowData={books}
          animateRows={true}
          columnDefs={booksColumnDefs}
          defaultColDef={defaultColDef}
          rowSelection='single'
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

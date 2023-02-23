import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import AddModal from '../../components/modal/AddModal';
import EditModal from '../../components/modal/EditModal';
import './homepage.scss';

import { useEffect, useState, useContext } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { DarkModeContext } from '../../context/darkModeContext';

import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Preloader from '../../components/Preloader/Preloader';

const authorColumnDefs = [
  { headerName: 'First Name', field: 'first_name' },
  { headerName: 'Last Name', field: 'last_name' },
  { headerName: 'Birth Date', field: 'birth_date' },
  { headerName: 'Age of Death', field: 'death_age' },
  { headerName: 'Rating', field: 'rating' },
];

const booksColumnDefs = [
  { headerName: 'Title', field: 'book_name' },
  { headerName: 'Publication date', field: 'originally_published' },
  { headerName: 'isbn', field: 'isbn' },
  { headerName: 'Price', field: 'price' },
  { headerName: 'Rating', field: 'raiting' },
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const { darkMode } = useContext(DarkModeContext);

  const onSelectionChanged = (gridOptions) => {
    const selectedRows = gridOptions.api.getSelectedRows();
    setSelectedAuthorId(selectedRows[0].author_id);
    setSelectedRows(selectedRows[0]);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`tables/author/${id}`, { method: 'DELETE' });
      const newAuthors = authors.filter((el) => el.author_id !== id);
      const newBooks = books.filter((el) => el.author_id !== id);
      setAuthors(newAuthors);
      setBooks(newBooks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch('/tables/author')
      .then((res) => res.json())
      .then((rowData) => {
        setAuthors(rowData.authors);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    fetch('/tables/books')
      .then((res) => res.json())
      .then((rowData) => setBooks(rowData.books))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className={darkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}>
          <div className='modal-buttons'>
            <AddModal authors={authors} setAuthors={setAuthors} />
            <EditModal
              selectedRows={selectedRows}
              authors={authors}
              setAuthors={setAuthors}
            />
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
          </div>
          {loading ? (
            <Preloader />
          ) : (
            <AgGridReact
              popupParent={document.body}
              rowData={authors}
              animateRows={true}
              columnDefs={authorColumnDefs}
              defaultColDef={defaultColDef}
              rowSelection='single'
              onSelectionChanged={onSelectionChanged}
            />
          )}
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

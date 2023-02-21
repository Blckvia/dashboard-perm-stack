import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
// import Widget from "../../components/widget/Widget";
import './homepage.scss';

import { useEffect, useState, useRef, useMemo } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';

const columnDefs = [
  { headerName: 'Id', field: 'author_id' },
  { headerName: 'First Name', field: 'first_name' },
  { headerName: 'Last Name', field: 'last_name' },
  { headerName: 'Birth Date', field: 'birth_date'},
  { headerName: 'Age of Death', field: 'death_age'},
  { headerName: 'Raiting', field: 'rating' },
];

const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1,
  };

function HomePage() {

  const [authors, setAuthors] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState();

  const onSelectionChanged = (gridOptions) => {
    const selectedRows = gridOptions.api.getSelectedRows();
    setSelectedAuthorId(selectedRows[0].author_id)
    console.log(selectedRows[0]);
  }
  
  const handleDelete = async (id) => {
    try {
      await fetch(`tables/author/${id}`, {method: 'DELETE'})
      const newAuthors = authors.filter(el => el.author_id !== id)
      setAuthors(newAuthors);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetch('/tables/author')
      .then((res) => res.json())
      .then((rowData) => setAuthors(rowData.authors))
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        {/* <div className="widgets">
                    <Widget />
                    <Widget />
                    <Widget />
                    <Widget />
                </div> */}

        <div className='ag-theme-alpine' style={{ height: 310 }}>
          <Button
            className='button'
            size='small'
            variant='contained'
            endIcon={<SendIcon />}
          >
            Add
          </Button>
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
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection='single'
            onSelectionChanged={onSelectionChanged}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

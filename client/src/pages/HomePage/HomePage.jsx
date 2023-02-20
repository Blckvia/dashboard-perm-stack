import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
// import Widget from "../../components/widget/Widget";
// import {Tables} from "../../components/table/Tables";
import './homepage.scss';

import { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';

function HomePage() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Id', field: 'author_id' },
    { headerName: 'First Name', field: 'first_name' },
    { headerName: 'Last Name', field: 'last_name' },
    { headerName: 'Birth Date', field: 'birth_date'},
    { headerName: 'Age of Death', field: 'death_age'},
    { headerName: 'Raiting', field: 'rating' },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  const handleDelete = async (id) => {
    // const newData = rowData.filter(el => el.id !== id)
    // setRowData(newData);
    try {
      await fetch(`tables/author/&{id}`, {method: 'DELETE'})
    //   await axios.delete(`/notes/${id}`);

      // Remove the deleted note from the list
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch('/tables/author')
      .then((res) => res.json())
      .then((rowData) => setRowData(rowData.authors))
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
        {/* <div> 
                    <Tables rowData={rowData}/> 
                  </div>  */}

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
            onClick={() => handleDelete(rowData.author_id)}
            className='button'
            size='small'
            variant='contained'
            endIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            animateRows={true}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

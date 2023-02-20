// import './table.scss';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useMemo, useRef, useState } from 'react';


export function Table(props) {
    const { author_id,
        first_name, 
        last_name, 
        birth_date, 
        death_age, 
        rating } 
        = props;


    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        {headerName: 'First Name', field: 'first_name'},
        {headerName: 'Last Name', field: 'last_name'},
        {headerName: 'Birth Date', field: 'birth_date'},
        {headerName: 'Age of Death', field: 'death_age'},
        {headerName: 'Raiting', field: 'rating'},
    ]);

    const defaultColDef = useMemo( () => ({
        sortable: true,
        filter: true
    }), [])

    return (
        <div className='ag-theme-alpine' style={{height: 500}}>
            <AgGridReact ref={gridRef}
                rowData={props} animateRows={true}
                columnDefs={columnDefs} defaultColDef={defaultColDef} 
                />
            </div>
    );
}


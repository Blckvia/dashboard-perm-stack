import { Table } from './Table'


export function Tables(props) {
    const { rowData = [] } = props;

    return (
        <div className='tables' >
            {rowData.length ? (
                rowData.map((table) => (
               <Table 
                    key={table.author_id} 
                    {...table}
                /> 
            )) 
            ) : (<h4>Nothing Found</h4>)}
        </div>
    );
};

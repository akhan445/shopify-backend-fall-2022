
import './InventoryList.css';
import DeletedInventoryItem from './DeletedInventoryItem';

function DeletedInventoryList({loading, error, data, onUndo}) {
  
  function handleUndo(event, id) {
    onUndo(event, id)
  }
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data && (
        <div className='layout'>
          <h2>Deleted List</h2>
          <p>This list represents all the deleted inventory items in the database ordered by most recently deleted item first.</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Comment</th>
                <th>Deleted At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => {
                const rowData = Object.values(row).map((data, index) => <DeletedInventoryItem key={index} value={data}/>)
                return (
                  <tr key={row.id}>
                    {rowData}
                    <td>
                      <button onClick={(event) => handleUndo(event, row.id)}>Undo Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div> 
      )}
    </>
  )
};

export default DeletedInventoryList;
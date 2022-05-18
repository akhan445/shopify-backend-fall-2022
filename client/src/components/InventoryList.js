
import axios from 'axios';
import './InventoryList.css';
import InventoryListItem from './InventoryListItem';

function InventoryList({loading, error, data, onDelete}) {

  function handleRemove(event, id) {
    onDelete(event, id)
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data && (
        <div className='layout'>
          <h2>Inventory List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => {
                const rowData = Object.values(row).map((data, index) => <InventoryListItem key={index} value={data}/>)
                return (
                  <tr key={row.id}>
                    {rowData}
                    <td>
                      <button onClick={(event) => handleRemove(event, row.id)}>Delete</button>
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

export default InventoryList;

import './InventoryList.css';
import InventoryListItem from './InventoryListItem';

function InventoryList({loading, error, data}) {

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
              </tr>
            </thead>
            <tbody>
              {data.map(row => {
                return (
                  <InventoryListItem
                    key={row.id}
                    data={row}
                  />
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

import { useState } from 'react';
import './InventoryList.css';
import InventoryListItem from './InventoryListItem';

function InventoryList({loading, error, data, onEdit, onDelete, onAdd}) {
  const [values, setValues] = useState({
    name: '',
    description: '',
    quantity: '',
    unit_price: ''
  });

  function handleEdit(event, id) {
    onEdit(event, id);
  }

  function handleRemove(event, id) {
    onDelete(event, id)
  }

  // handles changes in form input
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    
    setValues({
      ...values,
      [name]: value
    });

  }

  function handleSubmit(event) {
    event.preventDefault();
    onAdd(values);
  }

  return (
    <>
      <div className='layout'>
        <h2>Add Inventory Item</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:&nbsp;&nbsp;
            <input name="name" type="text" value={values.name} onChange={handleChange} />
          </label>
          <label>
            Description:&nbsp;&nbsp;
            <input type="text" name="description" value={values.description} onChange={handleChange} />
          </label>
          <label>
            Quantity:&nbsp;&nbsp;
            <input type="text" name="quantity" value={values.quantity} onChange={handleChange} />
          </label>
          <label>
            Unit Price:&nbsp;&nbsp;
            <input type="text" name="unit_price" value={values.unit_price} onChange={handleChange} />
          </label>
          <input type="submit" value="Add Item"/>
        </form>
      </div>
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
                <th>Edit</th>
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
                      <button onClick={(event) => handleEdit(event, row.id)}>Edit</button>
                    </td>
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
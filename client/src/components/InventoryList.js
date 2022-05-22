
import axios from 'axios';
import { useState } from 'react';
import './InventoryList.css';
import InventoryListItem from './InventoryListItem';

function InventoryList({loading, error, data, onUpdate, onDelete, onAdd}) {
  // state for add form
  const [values, setValues] = useState({
    name: '',
    description: '',
    quantity: '',
    unit_price: ''
  });

  // state for the edit form
  const [editValues, setEditValues] = useState({
    id: '',
    name: '',
    description: '',
    quantity: '',
    unit_price: ''
  });

  const [showModal, setShowModal] = useState("none");

  // show the modal when edit button is clicked
  function openModal() {
    setShowModal("block");
  }

  // close the modal and reset state value
  function closeModal() {
    setShowModal("none");
    setEditValues({
      id: '',
      name: '',
      description: '',
      quantity: '',
      unit_price: ''
    });
  }

  // sets the initial state for the edit modal
  function handleEdit(event, id) {
    event.preventDefault();
    const currentRow = data.filter(row => row.id === id);
    setEditValues(currentRow[0]);
    openModal();
  }

  function handleRemove(event, id) {
    onDelete(event, id)
  }

  // handles changes in form input (for Adding a new item)
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    
    setValues({
      ...values,
      [name]: value
    });

  }

  // handles changes in form input (for editing an item)
  function handleEditChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    
    setEditValues({
      ...editValues,
      [name]: value
    });

  }

  function handleSubmit(event) {
    event.preventDefault();
    onAdd(values);
    setValues({
      name: '',
      description: '',
      quantity: '',
      unit_price: ''
    })
  }

  function handleEditSubmit(event) {
    event.preventDefault();

    axios.patch(`/api/inventory/${editValues.id}`, editValues)
      .then(res => {
        console.log("Success", res);
        onUpdate(editValues);
        closeModal();
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data && (
        <div className='layout'>
          <h2>Inventory List</h2>
          <p>This list represents all the current inventory items in the database ordered by id.</p>
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
        <div id="myModal" className="modal" style={{display: showModal}}>
          <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Edit Entry</h2>
          <p>This modal allows you to edit an entry. It loads the current values and to cancel just click the X on the top right.</p>
          <form className="edit-form" onSubmit={handleEditSubmit}>
            <label>
              Name:&nbsp;&nbsp;
              <input name="name" type="text" value={editValues.name} onChange={handleEditChange} />
            </label><br/>
            <label>
              Description:&nbsp;&nbsp;
              <input type="text" name="description" value={editValues.description} onChange={handleEditChange} />
            </label><br/>
            <label>
              Quantity:&nbsp;&nbsp;
              <input type="text" name="quantity" value={editValues.quantity} onChange={handleEditChange} />
            </label><br/>
            <label>
              Unit Price:&nbsp;&nbsp;
              <input type="text" name="unit_price" value={editValues.unit_price} onChange={handleEditChange} />
            </label><br/>
            <label>
              <input type="submit" value="Update Item"/>
            </label>
          </form>
          </div>
        </div>
        <h2>Add Inventory Item</h2>
        <p>Use this form to add a new item to the list of inventory. It will add it to the end of the list.<br></br>
        <strong>Note: </strong>Quantity and Unit Price must be valid numeric values otherwise the request is unsuccessful.</p>
        <form className="add-form" onSubmit={handleSubmit}>
          <label>
            Name:&nbsp;&nbsp;
            <input name="name" type="text" value={values.name} onChange={handleChange} />
          </label><br/>
          <label>
            Description:&nbsp;&nbsp;
            <input type="text" name="description" value={values.description} onChange={handleChange} />
          </label><br/>
          <label>
            Quantity:&nbsp;&nbsp;
            <input type="text" name="quantity" value={values.quantity} onChange={handleChange} />
          </label><br/>
          <label>
            Unit Price:&nbsp;&nbsp;
            <input type="text" name="unit_price" value={values.unit_price} onChange={handleChange} />
          </label><br/>
          <label>
            <input type="submit" value="Add Item"/>
          </label>
        </form>
        </div> 
      )}
    </>
  )
};

export default InventoryList;
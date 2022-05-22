import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import InventoryList from './components/InventoryList';
import DeletedInventoryList from './components/DeletedInventoryList';

function App() {
  const [data, setData] = useState(null);
  const [deletedData, setDeletedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [showModal, setShowModal] = useState("none");

  useEffect(() => {
    axios.get('/api/inventory')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log("Error fetching data:", err);
        setError(err);
      });

    axios.get('/api/inventory/deleted')
      .then(res => {
        setDeletedData(res.data);
      })
      .catch(err => {
        console.log("Error fetching deleted data:", err);
        setError(err);
      });

      setLoading(false);
  }, []);

  //handle a new add
  function handleAdd(values) {
    axios.post('/api/inventory', values)
    .then(res => {
      //add the new item to state to display in front end
      const newState =[...data];
      newState.push({
        id: res.data[0].id,
        name: res.data[0].name,
        description: res.data[0].description,
        quantity: res.data[0].quantity,
        unit_price: res.data[0].unit_price
      });
      setData(newState);
    })
    .catch(err => console.log(err))
  }

  // handle an edit to an existing inventory item 
  function handleUpdate(editValues) {
    console.log(editValues)
    const updatedData = data.map(row => {
      return row.id === editValues.id ? editValues : row;
    })

    setData(updatedData)
  }

  function handleRemove(event, id) {
    event.preventDefault();

    axios.delete(`/api/inventory/${id}`)
      .then(res => {
        // set the new state to reflect the deletion by removing from state
        const newState = data.filter(row => row.id !== res.data.rows[0].id);
        setData(newState)

        const newDeletedState = [...deletedData];
        newDeletedState.unshift({
          id: res.data.rows[0].id,
          name: res.data.rows[0].name,
          Comment: res.data.rows[0].comment,
          deleted_at: res.data.rows[0].deleted_at
        });
        setDeletedData(newDeletedState);
      })
      .catch(err => console.log(err))
  }

  // handle undo of deleted item
  function handleUndo(event, id) {
    event.preventDefault();

    axios.delete(`/api/inventory/undo-delete/${id}`)
      .then(res => {
        // set the new state of deleted items to reflect the undo by removing from state
        const newDeletedState = deletedData.filter(row => row.id !== res.data.rows[0].id);
        setDeletedData(newDeletedState);

        //reflect the changes of the undo in the inventory items list
        const newState =[...data];
        newState.push({
          id: res.data.rows[0].id,
          name: res.data.rows[0].name,
          description: res.data.rows[0].description,
          quantity: res.data.rows[0].quantity,
          unit_price: res.data.rows[0].unit_price
        });
        newState.sort((a, b) => {
          return a.id < b.id ? -1 : 1;
        });
        setData(newState);

      })
      .catch(err => console.log(err))
  }
  return (
    <div className='App'>
      <h1>Inventory Tracking Application</h1>
      <p> Inventory Application with CRUD operations</p>
      <hr></hr>
        <InventoryList 
          loading={loading}
          error={error}
          data={data}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleRemove}
        />
        <hr></hr>
        <DeletedInventoryList
          loading={loading}
          error={error}
          data={deletedData}
          onUndo={handleUndo}
        />
    </div>
  );
}

export default App;

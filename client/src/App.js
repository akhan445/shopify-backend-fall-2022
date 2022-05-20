import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import InventoryList from './components/InventoryList';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/inventory')
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        console.log("Error fetching data:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  function handleRemove(event, id) {
    event.preventDefault();

    axios.delete(`/api/inventory/${id}`)
      .then(res => {
        // set the new state to reflect the deletion by removing from state
        const newState = data.filter(row => row.id !== res.data.rows[0].id);
        setData(newState)
      })
      .catch(err => console.log(err))
  }

  function handleAdd(values) {
    axios.post('/api/inventory', values)
    .then(res => {
      //add the new item to state to display in front end
      const newState =[...data];
      newState.push(res.data[0]);
      setData(newState);
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='App'>
        <InventoryList 
          loading={loading}
          error={error}
          data={data}
          onDelete={handleRemove}
          onAdd={handleAdd}
        />
    </div>
  );
}

export default App;

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
  }, [data]);

  function handleRemove(event, id) {
    event.preventDefault();

    axios.delete(`/api/inventory/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  return (
    <div className='App'>
        <InventoryList 
          loading={loading}
          error={error}
          data={data}
          onDelete={handleRemove}
        />
        {/* <AddInventory /> */}
    </div>
  );
}

export default App;

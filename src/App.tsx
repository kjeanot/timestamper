import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

interface Timestamp {
  id: number;
  time: Date;
}

function App() {
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);

  async function postTimestamp() {
    try {
      const res = await axios.post('http://localhost:3000/timestamper/api/timestamps', {
        time: Date(),
      });

      setTimestamps(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTimestamps() {
    try {
      const res = await axios.get('http://localhost:3000/timestamper/api/timestamps');
      setTimestamps(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTimestamp(id) {
    try {
      const res = await axios.delete(`http://localhost:3000/timestamper/api/timestamps/${id}`);
      setTimestamps(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTimestamps();
  }, [])

  return (
    <>
      <h1>Timestamper</h1>
      <div className="card">
        <button onClick={() => postTimestamp()}>
          +
        </button>
      </div>
      {
        timestamps.map(el => 
          <p key={el.id} onClick={() => deleteTimestamp(el.id)}>{el.time.toString()}</p>
        )
      }
    </>
  )
}

export default App

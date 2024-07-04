import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors('*'));

let timestamps = [
];

app.get('/timestamper/api/timestamps', (req, res) => {
  return res.json(timestamps);
});

app.post('/timestamper/api/timestamps', (req, res) => {
  const nextId = timestamps.length ? Math.max(...timestamps.map((t) => t.id)) + 1 : 1;
  const newtimestamp = {
    id: nextId,
    time: Date(),
  };

  timestamps = [...timestamps, newtimestamp];

  return res.json(timestamps);
});

// app.put('/timestamper/api/timestamps/:timestamp_id', (req, res) => {
//   const timestamp_id = Number(req.params.timestamp_id);

//   timestamps = timestamps.map((timestamp) => {
//     if (timestamp.id === timestamp_id) {
//       return {
//         ...timestamp,
//         done: !timestamp.done,
//       };
//     }

//     return timestamp;
//   });

//   return res.json(timestamps.find((timestamp) => timestamp.id === timestamp_id));
// });

app.delete('/timestamper/api/timestamps/:timestamp_id', (req, res) => {
  const timestamp_id = Number(req.params.timestamp_id);

  timestamps = timestamps.filter((timestamp) => timestamp.id !== timestamp_id);
  return res.json(timestamps);
});

app.listen(3000, () => {
  console.log(`API running /timestamper/api`);
});

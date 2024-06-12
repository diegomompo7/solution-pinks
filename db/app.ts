import express from 'express';
import bodyParser from 'body-parser';

export const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  res.json({ message: 'Success', received: data });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

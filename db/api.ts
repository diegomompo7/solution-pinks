import express from 'express';
import bodyParser from 'body-parser';

export const app = express();
const router = express.Router();
const port = 3000;

app.use(bodyParser.json());


app.get("/api/hello", (req, res) => {
  res.json({ hello: "world" });
});

app.post("/api/orders/pending", (req, res) => {
  const ordersPending = req.body;
  res.json(ordersPending)
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

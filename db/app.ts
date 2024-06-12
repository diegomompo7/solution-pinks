import express from "express";
import { mongoConnect } from "./mongo-repository";

const init = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.listen(port, () => {
    console.log(
      `We are using the Mongo database and listening on port ${port}`
    );
  });

};

const cors = require("cors");

const port = 3001;
mongoConnect();
init();

// Configuración del server
export const app = express();
app.use(cors());
app.use(express.json());
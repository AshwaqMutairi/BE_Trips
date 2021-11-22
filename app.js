const express = require("express");
const trips = require("./trips");
const connectDb = require("./db/database");
const PORT = 8001;

const app = express();

app.use(express.json());

connectDb();

app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});

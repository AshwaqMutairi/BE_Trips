const express = require("express");
const cors = require("cors");
const trips = require("./trips");
const path = require("path");

const connectDb = require("./db/database");
const PORT = 8001;

// // Routes
// const tripRoutes = require("./apis/trips/routes");
const userRoutes = require("./apis/users/routes");

const app = express();

app.use(express.json());

connectDb();

// Middleware
app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(logger);
app.use((req, res, next) => {
  if (req.body.name === "Broccoli Soup")
    res.status(400).json({ message: "I HATE BROCCOLI!! KEEFY! " });
  else next();
});

// app.use("/api/trips", tripRoutes);
app.use("/api", userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

console.log(path.join(__dirname, "media"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});

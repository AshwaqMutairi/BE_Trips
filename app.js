const express = require("express");
const cors = require("cors");
const trips = require("./trips");
const path = require("path");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
const logger = require("./middleware/logger");
const morgan = require("assert");
const jwtStrategy = require("assert");

const connectDb = require("./db/database");
const { errorHandler } = require("./middleware/errorHandler");

const PORT = 8001;

// // Routes
// const tripRoutes = require("./apis/trips/routes");
const userRoutes = require("./apis/users/routes");

const app = express();

app.use(express.json());

connectDb();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));
app.use(logger);

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

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

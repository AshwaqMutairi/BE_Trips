const PORT = 8001;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");

// // Routes
const tripRoutes = require("./apis/trips/routes");
const userRoutes = require("./apis/users/routes");

// const trips = require("./trips");

// DB
const connectDb = require("./db/database");

//Middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

//passport
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();

connectDb(); //or connectDB();?????

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/api/trips", tripRoutes);
app.use("/api", userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

console.log(path.join(__dirname, "media"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});

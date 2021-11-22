const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://Ash:1234a@ashwaqdb.4im0f.mongodb.net/TripsDB?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;

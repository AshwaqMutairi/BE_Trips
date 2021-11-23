const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);

const Trip = require("../../db/models/Trip");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findById(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.tripListFetch = async (req, res, next) => {
  try {
    // const trips = await Trip.find().populate("shop");
    const trips = await Trip.find(); //I don't need populate here
    return res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.tripDetailFetch = async (req, res, next) => {
  console.log("trip", req.trip.id);
  res.status(200).json(req.trip);
};

//creat
exports.TripCreate = async (req, res, next) => {
  try {
    if (req.file) {
      // /media/imagename.jpg
      req.body.image = `/${req.file.path}`;
    }
    req.body.owner = req.user._id;
    const newTrip = await Trip.create(req.body);
    await newTrip.populate({
      path: "owner",
      select: "username",
    });
    return res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

exports.tripUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
    }
    const trip = await Trip.findByIdAndUpdate(
      req.trip,
      req.body,
      { new: true, runValidators: true } // returns the updated trip
    ).populate("shop");
    return res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};

exports.tripDelete = async (req, res, next) => {
  try {
    await req.trip.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Create
// Status: 201
// Content: newly created item

// Retrieve (List && Detail)
// Status: 200
// Content: Requested data

// Update
// Status: 200
// Content: updated item

// Delete
// Status: 204
// Content: No Content

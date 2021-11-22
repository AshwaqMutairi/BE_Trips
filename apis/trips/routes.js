const express = require("express");
const upload = require("../../middleware/multer");
const {
  TripListFetch,
  TripCreate,
  TripDelete,
  TripUpdate,
  TripDetailFetch,
  fetchTrip,
} = require("./controllers");
const router = express.Router();

// Param Middleware
router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    next({ status: 404, message: "Trip Not Found!" });
  }
});

router.get("/", tripListFetch);

router.get("/:tripId", tripDetailFetch);

router.put("/:tripId", upload.single("image"), tripUpdate);

router.delete("/:tripId", tripDelete);

// //creat
// app.post("/api/trips", (req, res) => {
//   trips.push(req.body);
//   res.status(201).json(req.body);
// });

// //fetch
// app.get("/api/trips", (req, res) => {
//   res.json(trips);
// });

// //delete
// app.delete("/trips/:tripId", (req, res) => {
//   const foundTrip = trips.find((trip) => trip.id === +req.params.tripId);
//   if (foundTrip) {
//     trips = trips.filter((trip) => trip !== foundTrip);
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: "Trip not found" });
//   }
// });

module.exports = router;

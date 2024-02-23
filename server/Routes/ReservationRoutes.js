const {
  addReservation,
  getReservations,
} = require("../Controllers/ReservationController");

const router = require("express").Router();

router.post("/add", addReservation);
router.get("/dates", getReservations);

module.exports = router;

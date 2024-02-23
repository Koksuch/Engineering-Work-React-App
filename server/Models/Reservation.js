const mongoose = require("mongoose");
const validator = require("validator");

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Imię jest wymagane"],
  },
  surname: {
    type: String,
    required: [true, "Nazwisko jest wymagane"],
  },
  email: {
    type: String,
    required: [true, "Email jest wymagany"],
    validate: [validator.isEmail, "Email jest nieprawidłowy"],
  },
  phone: {
    type: String,
    required: [true, "Numer telefonu jest wymagany"],
  },
  dates: [
    {
      date: {
        type: String,
        required: [true, "Data jest wymagana"],
      },
      time: {
        type: String,
        required: [true, "Czas jest wymagany"],
      },
      selectedTrack: {
        type: Number,
        required: [true, "Tor jest wymagany"],
      },
    },
  ],
});

reservationSchema.pre("save", async function (next) {
  const reservation = this;

  const today = new Date();
  const isDateValid = reservation.dates.every((d) => {
    const reservationDate = new Date(d.date + "T" + d.time.split("-")[0]);
    return reservationDate >= today;
  });

  if (!isDateValid) {
    const error = new Error(
      "Data nie może być wcześniejsza niż dzisiejsza data."
    );
    return next(error);
  }

  const existingReservation = await reservation.constructor.findOne({
    name: reservation.name,
    surname: reservation.surname,
    email: reservation.email,
    phone: reservation.phone,
    "dates.date": { $in: reservation.dates.map((d) => d.date) },
    "dates.time": { $in: reservation.dates.map((d) => d.time) },
    "dates.selectedTrack": {
      $in: reservation.dates.map((d) => d.selectedTrack),
    },
  });

  if (existingReservation) {
    const error = new Error("Rekord już istnieje w bazie danych.");
    return next(error);
  }

  next();
});

module.exports = mongoose.model("Reservation", reservationSchema);

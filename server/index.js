const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ReservationRoutes = require("./Routes/reservationRoutes");

const app = express();

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/pool", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to pool database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.use(express.json());
app.use("/api/reservations", ReservationRoutes);

// TODO: 404 zrobić dla wszystkich metod, na końcu wszystkich ścieżek
app.get("*", function (req, res) {
  res.status(404).json({
    errorTitle: "404 Not Found",
    errorMsg: "Cannot found the requested resource",
  });
});

app.post("*", function (req, res) {
  res.status(404).json({
    errorTitle: "404 Not Found",
    errorMsg: "Cannot found the requested resource",
  });
});

app.put("*", function (req, res) {
  res.status(404).json({
    errorTitle: "404 Not Found",
    errorMsg: "Cannot found the requested resource",
  });
});

app.delete("*", function (req, res) {
  res.status(404).json({
    errorTitle: "404 Not Found",
    errorMsg: "Cannot found the requested resource",
  });
});

// ? 500 Internal Server Error
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    errorTitle: "404 Not Found",
    errorMsg: "Cannot found the requested resource",
  });
});

const express = require("express");
const nodemailer = require("nodemailer");
const Reservation = require("../Models/Reservation");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // use SSL
  auth: {
    user: "sarah.marvin97@ethereal.email",
    pass: "s2zdkKDcdpte2KtBNF",
  },
});

const sendEmail = async (reservationData) => {
  const mailOptions = {
    from: "sarah.marvin97@ethereal.email",
    to: "jeffry.rohan@ethereal.email",
    subject: "Potwierdzenie rezerwacji",
    text: `Dziękujemy za dokonanie rezerwacji. Oto szczegóły:
      Imię: ${reservationData.name}
      Nazwisko: ${reservationData.surname}
      Email: ${reservationData.email}
      Telefon: ${reservationData.phone}
      Data i godzina rezerwacji: ${reservationData.dates
        .map((d) => `${d.date} ${d.time} Tor: ${d.selectedTrack}`)
        .join(", ")}
      `,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports.addReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);

    const savedReservation = await newReservation.save();

    await sendEmail(savedReservation);
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getReservations = async (req, res) => {
  try {
    const result = await Reservation.aggregate([
      {
        $project: {
          _id: 0,
          dates: 1,
        },
      },
      {
        $unwind: "$dates",
      },
      {
        $replaceRoot: {
          newRoot: "$dates",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Carga variables de entorno y configura el transporte de nodemailer para Gmail
require("dotenv").config();
const nodemailer = require("nodemailer");

// Crea y exporta el objeto transporter usando las credenciales del .env
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = transporter;
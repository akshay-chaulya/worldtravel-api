import nodemailer from "nodemailer";
import { passForSendEmail } from "../config/index.js";

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'worldtravelofficialteem@gmail.com',
    pass: passForSendEmail,
  }
});


export default transporter;
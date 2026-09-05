const nodemailer = require('nodemailer');

const sendEmial = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
      }
    });
  }
}
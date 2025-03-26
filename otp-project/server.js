const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// In-memory storage for OTPs (for development; use a proper store for production)
let storedOTPs = {};

// Endpoint to send OTP
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    storedOTPs[email] = { code: otp, createdAt: Date.now() };

    
    const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'teamupconnect@gmail.com',
        pass: 'spiplhmikwzqojme' // Replace with your app-specific password
      }
    });

    let mailOptions = {
      from: 'teamupconnect@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Endpoint to verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }
  const storedData = storedOTPs[email];
  if (!storedData) {
    return res.status(400).json({ message: 'No OTP found for this email' });
  }
  if (Date.now() - storedData.createdAt > 300000) { // 5 minutes expiry
    delete storedOTPs[email];
    return res.status(400).json({ message: 'OTP expired, please request a new one' });
  }
  if (storedData.code === otp) {
    delete storedOTPs[email];
    return res.status(200).json({ message: 'OTP verified. User signed in!' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

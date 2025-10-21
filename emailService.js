const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendTheftAlert(deviceName, location, photoCount) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ALERT_EMAIL,
    subject: '?? THEFT ALERT - Unauthorized Access Detected!',
    html: `
      <h1 style="color: red;">?? THEFT ALERT!</h1>
      <p><strong>Device:</strong> ${deviceName}</p>
      <p><strong>Location:</strong> ${location.latitude}, ${location.longitude}</p>
      <p><strong>Photos Captured:</strong> ${photoCount}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <br>
      <a href="https://www.google.com/maps?q=${location.latitude},${location.longitude}" 
         style="background-color: #ff0000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        View Location on Map
      </a>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendTheftAlert };

const { neon } = require('@neondatabase/serverless');
const { sendTheftAlert } = require('../../emailService');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { device_id, photo_base64, latitude, longitude, reason } = req.body;
    const sql = neon(process.env.DATABASE_URL);
    
    const device = await sql`SELECT id, device_name FROM devices WHERE device_id = ${device_id}`;
    if (device.length === 0) return res.status(404).json({ error: 'Device not found' });

    await sql`
      INSERT INTO photos (device_id, photo_base64, latitude, longitude, reason)
      VALUES (${device[0].id}, ${photo_base64}, ${latitude}, ${longitude}, ${reason})
    `;

    // ????? Email Alert
    await sendTheftAlert(device[0].device_name, { latitude, longitude }, 1);

    return res.status(200).json({ success: true, message: 'Photo uploaded and alert sent' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error', details: error.message });
  }
};

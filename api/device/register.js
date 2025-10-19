const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { device_id, device_name, latitude, longitude, battery_level, connection_type, is_protected } = req.body;
    
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'DATABASE_URL not configured' });
    }

    const sql = neon(process.env.DATABASE_URL);
    const existing = await sql`SELECT id FROM devices WHERE device_id = ${device_id}`;

    if (existing.length > 0) {
      await sql`
        UPDATE devices SET device_name = ${device_name}, last_seen = NOW(), 
        battery_level = ${battery_level}, connection_type = ${connection_type},
        latitude = ${latitude}, longitude = ${longitude}, is_protected = ${is_protected}
        WHERE device_id = ${device_id}
      `;
      return res.status(200).json({ success: true, message: 'Device updated' });
    } else {
      await sql`
        INSERT INTO devices (device_id, device_name, last_seen, battery_level, connection_type, latitude, longitude, is_protected)
        VALUES (${device_id}, ${device_name}, NOW(), ${battery_level}, ${connection_type}, ${latitude}, ${longitude}, ${is_protected})
      `;
      return res.status(201).json({ success: true, message: 'Device registered' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Database error', details: error.message });
  }
};

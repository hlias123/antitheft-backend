import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { device_id, latitude, longitude, battery_level, connection_type } = req.body;
    const sql = neon(process.env.DATABASE_URL);
    
    await sql`
      UPDATE devices 
      SET latitude = ${latitude},
          longitude = ${longitude},
          last_seen = NOW(),
          battery_level = ${battery_level},
          connection_type = ${connection_type}
      WHERE device_id = ${device_id}
    `;

    return res.status(200).json({ success: true, message: 'Location updated' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update location' });
  }
}

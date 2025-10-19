import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { device_id, photo_base64, latitude, longitude, reason } = req.body;
    const sql = neon(process.env.DATABASE_URL);
    
    const device = await sql`SELECT id FROM devices WHERE device_id = ${device_id}`;
    if (device.length === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }

    const result = await sql`
      INSERT INTO photos (device_id, photo_base64, latitude, longitude, reason)
      VALUES (${device[0].id}, ${photo_base64}, ${latitude}, ${longitude}, ${reason})
      RETURNING id
    `;

    return res.status(200).json({ success: true, photo_id: result[0].id });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to upload photo' });
  }
}

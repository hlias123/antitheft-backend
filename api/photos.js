import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { device_id } = req.query;
    if (!device_id) return res.status(400).json({ error: 'device_id required' });

    const sql = neon(process.env.DATABASE_URL);
    const device = await sql`SELECT id FROM devices WHERE device_id = ${device_id}`;
    if (device.length === 0) return res.status(404).json({ error: 'Device not found' });

    const photos = await sql`
      SELECT id, latitude, longitude, reason, timestamp
      FROM photos WHERE device_id = ${device[0].id}
      ORDER BY timestamp DESC LIMIT 50
    `;

    return res.status(200).json({ success: true, count: photos.length, photos });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch photos' });
  }
}

const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const photos = await sql`
      SELECT p.id, p.device_id, p.latitude, p.longitude, p.reason, p.timestamp, d.device_name
      FROM photos p
      JOIN devices d ON p.device_id = d.id
      ORDER BY p.timestamp DESC
      LIMIT 100
    `;
    return res.json({ success: true, count: photos.length, photos });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching photos' });
  }
};

const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const devices = await sql`SELECT * FROM devices ORDER BY last_seen DESC`;
    return res.json({ success: true, count: devices.length, devices });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching devices' });
  }
};

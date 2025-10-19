import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      device_id, 
      device_name, 
      latitude, 
      longitude,
      battery_level,
      connection_type,
      is_protected
    } = req.body;

    const sql = neon(process.env.DATABASE_URL);
    
    const existing = await sql`
      SELECT id FROM devices WHERE device_id = ${device_id}
    `;

    if (existing.length > 0) {
      await sql`
        UPDATE devices 
        SET device_name = ${device_name},
            last_seen = NOW(),
            battery_level = ${battery_level},
            connection_type = ${connection_type},
            latitude = ${latitude},
            longitude = ${longitude},
            is_protected = ${is_protected}
        WHERE device_id = ${device_id}
      `;
      
      return res.status(200).json({ 
        success: true, 
        message: 'Device updated'
      });
    } else {
      const result = await sql`
        INSERT INTO devices (
          device_id, 
          device_name, 
          last_seen,
          battery_level,
          connection_type,
          latitude, 
          longitude,
          is_protected
        ) VALUES (
          ${device_id},
          ${device_name},
          NOW(),
          ${battery_level},
          ${connection_type},
          ${latitude},
          ${longitude},
          ${is_protected}
        ) RETURNING id
      `;

      return res.status(201).json({ 
        success: true, 
        message: 'Device registered',
        device_id: result[0].id
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to register device',
      details: error.message 
    });
  }
}

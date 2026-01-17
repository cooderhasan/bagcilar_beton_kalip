const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
    connectionString: 'postgresql://postgres:123456@localhost:5432/beton?schema=public',
});

async function main() {
    await client.connect();

    const email = 'admin@bagcilar.com';
    const password = await bcrypt.hash('admin123', 10);
    const now = new Date();

    try {
        const res = await client.query(
            `INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (email) DO NOTHING
       RETURNING *`,
            ['admin_seed_id_' + Date.now(), email, password, 'Admin', 'ADMIN', now, now]
        );

        if (res.rows.length > 0) {
            console.log('Admin user created:', res.rows[0].email);
        } else {
            console.log('Admin user already exists.');
        }
    } catch (err) {
        console.error('Error seeding admin:', err);
    } finally {
        await client.end();
    }
}

main();

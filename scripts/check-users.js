const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres:123456@localhost:5432/beton?schema=public' });

(async () => {
    await client.connect();
    try {
        const res = await client.query('SELECT * FROM "User"');
        console.log("Users in DB:", res.rows);
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
})();

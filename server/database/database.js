const PG = require('pg');

const dotenv = require('dotenv');

dotenv.config();
const dbConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
};
const pool = new PG.Pool(dbConfig);

async function queryByUserId(userId) {
    const query = 'SELECT user_id, revenue FROM users_revenue WHERE user_id = $1';
    const {rows} = await pool.query(query, [userId]);
    return rows[0];
}

async function upsertUser(userToUpsert) {
    const query = "INSERT INTO users_revenue (user_id, revenue) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET user_id = EXCLUDED.user_id, revenue = EXCLUDED.revenue";
    const {user} = await pool.query(query, [userToUpsert["user_id"], userToUpsert.revenue]);
    return user;
}

module.exports = {
    queryByUserId, upsertUser
}
import {Pool} from 'pg'

const dotenv = require('dotenv');

dotenv.config();
const dbConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
};
const pool = new Pool(dbConfig);

async function queryByUserId(userId) {
    const query = 'SELECT user_id, revenue FROM users_revenue WHERE user_id = $1';
    const {user} = await pool.query(query, [userId]);
    return user;
}

module.exports = {
    queryByUserId
}
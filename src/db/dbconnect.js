import { Pool } from "pg";


const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

pool.connect((err) => {
    if (err) {
        console.log("Error While Connecting Database- ",err);
        process.exit(1);
    }
    console.log("Connect to PostgreSQL successfully!");
})

module.exports = pool;
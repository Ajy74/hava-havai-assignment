import { Pool } from "pg";


// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// })
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'havaHavaiDB',
    password: 'root',
    port: 5432,
})

pool.connect((err) => {
    if (err) {
        console.log("Error While Connecting Database- ",err);
        process.exit(1);
    }
    console.log("Connect to PostgreSQL successfully!");
})

module.exports = pool;
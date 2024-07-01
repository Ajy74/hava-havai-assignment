import pg from "pg";


// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// })
const postgres = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'havahavaidb',
    password: 'root',
    port: 5432
})

postgres.connect((err) => {
    if (err) {
        console.log("Error While Connecting Database- ",err);
        process.exit(1);
    }
    console.log("Connect to PostgreSQL successfully!");
})

export default postgres;
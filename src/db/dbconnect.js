import pg from "pg";
const { Client,Pool } = pg

const postgres = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

// const postgres = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'havahavaidb',
//     password: 'root',
//     port: 5432
// })


postgres.connect((err) => {
    if (err) {
        console.log("Error While Connecting Database- ",err);
        process.exit(1);
    }
    console.log("Connect to PostgreSQL successfully!");
})

// const getClient = async () => {
//     const client = new Client({
//         user: 'postgres',
//         host: 'localhost',
//         database: 'havahavaidb',
//         password: 'root',
//         port: 5432
//     });

//     await client.connect();
    
//     return client;
// };

export default postgres;
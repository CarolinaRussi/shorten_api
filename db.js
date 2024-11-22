import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();


const DB_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
    ssl: {
        rejectUnauthorized: false,
      },
};
const { Client } = pkg
const client = new Client(DB_CONFIG);

client.connect()
    .then(() => {
        console.log("Conexão estabelecida com sucesso ao PostgreSQL.");

        
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS urls (
                id SERIAL PRIMARY KEY,
                long_url TEXT NOT NULL,
                short_url_code VARCHAR(50) UNIQUE NOT NULL
            );
        `;

        client.query(createTableQuery)
            .then(() => {
                console.log("Tabela 'urls' verificada/criada com sucesso.");
            })
            .catch((err) => {
                console.error("Erro ao criar a tabela:", err.message);
            });
    })
    .catch((err) => {
        console.error("Erro ao conectar ao PostgreSQL:", err.message);
    });


export const db = client;
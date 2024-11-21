import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const DB_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};
const DB_DATABASE = process.env.DB_NAME;

const connection = mysql.createConnection(DB_CONFIG);

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err.message);
        return;
    }
    console.log("Conexão estabelecida com sucesso.");

    connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\`;`, (err) => {
        if (err) {
            console.error("Erro ao criar o banco de dados:", err.message);
            connection.end();
            return;
        }
        console.log(`Banco de dados '${DB_DATABASE}' verificado/criado com sucesso.`);

        const db = mysql.createConnection({
            ...DB_CONFIG,
            database: DB_DATABASE
        });

        db.connect((err) => {
            if (err) {
                console.error("Erro ao conectar ao banco de dados:", err.message);
            } else {
                console.log(`Conectado ao banco de dados '${DB_DATABASE}'.`);

                const createTableQuery = `

                CREATE TABLE IF NOT EXISTS urls (
                    id INT NOT NULL AUTO_INCREMENT,
                    long_url VARCHAR(2048) NOT NULL,
                    short_url_code VARCHAR(50) NOT NULL,
                    PRIMARY KEY (id),
                    UNIQUE INDEX short_url_code_UNIQUE (short_url_code ASC) VISIBLE);

                `;
                db.query(createTableQuery, (err) => {
                    if (err) {
                        console.error("Erro ao criar a tabela:", err.message);
                    } else {
                        console.log("Tabela 'urls' verificada/criada com sucesso.");
                    }
                });
            }
        });        
        connection.end();
    });
});

export const db = mysql.createConnection({
    ...DB_CONFIG,
    database: DB_DATABASE
});
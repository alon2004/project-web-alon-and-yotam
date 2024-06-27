/* connects to the mySql db via the nv file - which holds all the pass and user names to the DB */
exports.dbConnection = {
    async createConnection() {
        const mysql = require('mysql2/promise');
        
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        return connection;
    }
}
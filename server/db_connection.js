/* This part of the code is responsible for connecting to MySql database. */

/* db_connection.js */
exports.dbConnection = {
    async createConnection() { /* marking a function with async keyword means it returns a promise and the function becomes synchorinit - not busy waiting. */
        const mysql = require('mysql2/promise'); /* installed mysql2 from npm...(did it)  */
        
        const connection = await mysql.createConnection({ /* marking an operation with The await keyword is used to wait for the promise to resolve, making the function execution pause until the operation completes - make sure we dont proceeed without a valid DB connection */
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        return connection;
    }
}
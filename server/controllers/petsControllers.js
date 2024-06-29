/* The petsController.js file is responsible for implementing the controller functions that handle the logic for various user-related operations in the application. 
These functions interact with the database to perform CRUD (Create, Read, Update, Delete) operations on user data. 
Each function corresponds to a specific HTTP route defined in the usersRouter.js file.
 */



// petsController.js

const { dbConnection } = require("../db_connection");

const table_name_pets = "tbl_106_";
const petsController = {
    async getAllReports(req, res) {
        const connection = await dbConnection.createConnection();
        const [pets] = await connection.execute(`SELECT * FROM ${table_name_pets}Pets`);
        connection.end();
        res.json(pets);
    },
    async getReportById(req, res) {
        const connection = await dbConnection.createConnection();
        const [pet] = await connection.execute(`SELECT * FROM ${table_name_pets}Pets WHERE UserId = ?`, [req.params.id]);
        connection.end();
        res.json(pet);
    },
    async createReport(req, res) {
        const connection = await dbConnection.createConnection();
        const { name, type, age, owner } = req.body;
        await connection.execute(`INSERT INTO ${table_name_pets}Pets (name, type, age, owner) VALUES (?, ?, ?, ?)`, [name, type, age, owner]);
        connection.end();
        res.json({ message: "Pet created successfully" });
    },
    async updateReport(req, res) {
        const connection = await dbConnection.createConnection();
        const { name, type, age, owner } = req.body;
        await connection.execute(`UPDATE ${table_name_pets}Pets SET name = ?, type = ?, age = ?, owner = ? WHERE id = ?`, [name, type, age, owner, req.params.id]);
        connection.end();
        res.json({ message: "Pet updated successfully" });
    },
    async deleteReport(req, res) {
        const connection = await dbConnection.createConnection();
        await connection.execute(`DELETE FROM ${table_name_pets}Pets WHERE id = ?`, [req.params.id]);
        connection.end();
        res.json({ message: "Pet deleted successfully" });
    },
    async getInnerJoin(req, res) {
        const connection = await dbConnection.createConnection();
        const [pets] = await connection.execute(`SELECT * FROM ${table_name_pets}Pets INNER JOIN ${table_name_pets}users ON ${table_name_pets}Pets.UserId = ${table_name_pets}users.UserId`);
        connection.end();
        res.json(pets);
    }
}

module.exports = { petsController };

const { dbConnection } = require("../db_connection")

const table_name_pets = "tbl_106_";
const petsController = {
    async getAllReports(req, res) {
        const connection = await dbConnection.createConnection();
        const [reports] = await connection.execute(`SELECT * FROM ${table_name_pets}pets`);
        connection.end();
        res.json(reports);
    },
    async getReportById(req, res) {
        const connection = await dbConnection.createConnection();
        const [report] = await connection.execute(`SELECT * FROM ${table_name_pets}pets WHERE id = ?"`, [req.params.id]);
        connection.end();
        res.json(report);
    },
    async createReport(req, res) {
        const connection = await dbConnection.createConnection();
        const { category, description, address, userId } = req.body;
        await connection.execute(`INSERT INTO ${table_name_pets}pets (category, description, address, userId) VALUES (?, ?, ?, ?)"`, [category, description, address, userId]);
        connection.end();
        res.json({ message: "Report created successfully" });
    },
    async updateReport(req, res) {
        const connection = await dbConnection.createConnection();
        const { category, description, address, userId } = req.body;
        await connection.execute(`UPDATE ${table_name_pets}pets SET category = ?, description = ?, address = ?, userId = ? WHERE id = ?"`, [category, description, address, userId, req.params.id]);
        connection.end();
        res.json({ message: "Report updated successfully" });
    },
    async deleteReport(req, res) {
        const connection = await dbConnection.createConnection();
        await connection.execute(`DELETE FROM ${table_name_pets}pets WHERE id = ?"`, [req.params.id]);
        connection.end();
        res.json({ message: "Report deleted successfully" });
    }
}

module.exports = { petsController };
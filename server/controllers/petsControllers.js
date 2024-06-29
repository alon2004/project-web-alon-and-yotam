const { dbConnection } = require("../db_connection")

const table_name_lostPetReport = "tbl_106_lostPetReport";
const petsController = {
    async getAllReports(req, res) {
        const connection = await dbConnection.createConnection();
        const [pets] = await connection.execute(`SELECT * FROM ${table_name_lostPetReport}`);
        connection.end();
        res.json(pets);
    },
    async getReportById(req, res) {
        const connection = await dbConnection.createConnection();
        const [pet] = await connection.execute(`SELECT * FROM ${table_name_lostPetReport} WHERE user_id = ?`, [req.params.id]);
        connection.end();
        res.json(pet);
    },
    async updateReport(req, res) {
        const connection = await dbConnection.createConnection();
        const {name, type, age, owner} = req.body;
        await connection.execute(`UPDATE ${table_name_lostPetReport}Pets SET name = ?, type = ?, age = ?, owner = ? WHERE ReportId = ?`, [name, type, age, owner, req.params.id]);
        connection.end();
        res.json({message: "Pet updated successfully"});
    },
    async deleteReport(req, res) {
        const connection = await dbConnection.createConnection();
        await connection.execute(`DELETE FROM ${table_name_lostPetReport} WHERE id = ?`, [req.params.id]);
        connection.end();
        res.json({message: "Pet deleted successfully"});
    },
    async innerJoinUsers(req, res) {
        const connection = await dbConnection.createConnection();
        const [pets] = await connection.execute(`SELECT * FROM ${table_name_lostPetReport} INNER JOIN tbl_106_users ON ${table_name_lostPetReport}.user_id = tbl_106_users.UserId`);
        connection.end();
        res.json(pets);
    }

}

module.exports = { petsController };
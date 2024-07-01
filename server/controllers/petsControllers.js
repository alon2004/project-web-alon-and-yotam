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
        const { pet_name, pet_chip_number, pet_behavior, city, last_seen_address, more_information,date } = req.body;
        await connection.execute(`UPDATE ${table_name_lostPetReport} SET pet_name = ?, pet_chip_number = ?, pet_behavior = ?, city = ?, last_seen_address = ?, more_information = ?, date=? WHERE id = ?`, [pet_name, pet_chip_number, pet_behavior, city, last_seen_address, more_information,date, req.params.id]);
        connection.end();
        res.json({message: "report updated successfully"});
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
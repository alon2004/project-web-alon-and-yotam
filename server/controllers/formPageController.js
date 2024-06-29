/* The formPageController.js file is responsible for implementing the controller functions that handle the logic for various user-related operations in the application. 
These functions interact with the database to perform CRUD (Create, Read, Update, Delete) operations on user data. 
Each function corresponds to a specific HTTP route defined in the usersRouter.js file.
 */

const { dbConnection } = require("../db_connection");

const table_name_form = "tbl_106_lostPetReport";
const formController = {
    async createLostPetReport(req, res) {
        const connection = await dbConnection.createConnection();
        const { pet_name, pet_chip_number, pet_behavior, photos, city, last_seen_address, flag_location, more_information } = req.body;
        await connection.execute(`INSERT INTO ${table_name_form} (pet_name, pet_chip_number, pet_behavior, photos, city, last_seen_address, flag_location, more_information) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [pet_name, pet_chip_number, pet_behavior, photos, city, last_seen_address, flag_location, more_information]);
        connection.end();
        res.json({ message: "Pet created successfully" });
    },

    async submitLostPetReport(req, res) {
        console.log("Form submission received at: ", new Date().toISOString()); // Log when the form submission is received
        console.log("Unique ID: ", req.body.unique_id); // Log unique identifier

        try {
            const connection = await dbConnection.createConnection();
            const { pet_name, pet_chip_number, pet_behavior, photos, city, last_seen_address, flag_location, more_information } = req.body;

            // Log the received data for debugging
            console.log("Received data:", {
                pet_name,
                pet_chip_number,
                pet_behavior,
                photos,
                city,
                last_seen_address,
                flag_location,
                more_information
            });

            if (!pet_name || !pet_chip_number || !pet_behavior || !photos || !city || !last_seen_address || !flag_location || !more_information) {
                console.log("Validation failed"); // Log validation failure
                return res.status(400).json({ message: "All fields are required" });/* 400 becuse its - client side error caused by wrongly inserted input by the user ! */
            }

            const [result] = await connection.execute(
                `INSERT INTO ${table_name_form} (pet_name, pet_chip_number, pet_behavior, photos, city, last_seen_address, flag_location, more_information) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [pet_name, pet_chip_number, pet_behavior, photos, city, last_seen_address, flag_location, more_information]
            );
            connection.end();
            console.log("Insert result:", result); // Log the insert result
            res.json({ message: "Form submitted successfully" });
        } catch (error) {
            console.error("Error inserting data:", error);
            res.status(500).json({ message: "Server error" });
        }
    },
}

module.exports = { formController };

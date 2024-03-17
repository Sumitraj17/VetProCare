import ejs from "ejs";
import express from "express";
import { connection } from "../db/database.js";
import fileOperation from "../fileStorage.js";


const existingUser = async (req, res) => {
    const app = express();
    app.set('view engine', 'ejs');
    app.set("views", "../views");

    const { email, password } = req.body;

    try {
        // Ensure database connection is established
        const [rows, fields] = await connection.promise().query('SELECT * FROM client WHERE EMAIL = ?', email);
        
        if (rows.length === 0) {
            console.log("User does not exist");
            // Handle the case where the user does not exist
            // You may want to send an appropriate response or redirect the user
        } else {
            console.log("Valid user");
            const { CLIENT_ID,FIRST_NAME, LAST_NAME,PASSWORD } = rows[0]; // Accessing the retrieved data

            const fname = FIRST_NAME;
            const lname = LAST_NAME;
            if(PASSWORD === password){
                let storage = fileOperation.readData();
                storage['client_id'] = CLIENT_ID;
                storage['fname'] = fname;
                storage['lname'] = lname;
                fileOperation.writeData(storage);
                res.render("logged.ejs", { fname, lname });}
            else{
                const message = "Invalid password";
                const condition = true;
                res.render("sign_error_page.ejs",{message,condition});
            }
                
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        // Handle the error, e.g., send an error response to the client
        res.status(500).send("Internal Server Error");
    }
}

export default existingUser;

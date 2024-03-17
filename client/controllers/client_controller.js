import generate from "./id_generator.js";
import ejs from "ejs";
import express from "express";
import { connection } from "../db/database.js";
import fileOperation from "../fileStorage.js";
export var generatedId;
const newClient = (req, res) => {
  const app = express();
  app.set("view engine", "ejs");
  app.set("views", "../views");

  const { fname, lname, email, number, city, password, confirmPassword } =
    req.body;

  if (password === confirmPassword) {
    generatedId = generate(fname, lname);
    console.log(generatedId);
    const dataToInsert = [
      [generatedId, fname, lname, email, number, city, password],
    ];

    connection.query(
      "INSERT INTO CLIENT (CLIENT_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, ADDRESS, PASSWORD) VALUES ?",
      [dataToInsert],
      (err, result) => {
        if (err) {
          console.log(err);
          let message = "Email Id exists. Please Login";
          let condition = true;
          res.render("sign_error_page.ejs", { message, condition });
        } else {
          var storage = fileOperation.readData();
          storage['client_id'] = generatedId;
          storage['fname'] = fname;
          storage['lname'] = lname;
          fileOperation.writeData(storage);
          res.render("logged.ejs", { fname, lname });
        }
      }
    );
  } else {
    let message = "Password and confirm Password doesn't match";
    let condition = false;
    res.render("sign_error_page.ejs", { message, condition });
  }
};

export default newClient;

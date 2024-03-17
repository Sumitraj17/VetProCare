import express from "express";
import fileOperation from "../fileStorage.js";
import { connection } from "../db/database.js";
import { config } from "dotenv";
import generate from "./id_generator.js";
config();

const appointment = (req, res) => {
  const app = express();
  app.set("view engine", "ejs");
  app.set("views", "../views");
  const { pet_id, reason, date } = req.body;
  console.log(pet_id);
  const storage = fileOperation.readData();
  const client_id = storage["client_id"];
  const name = storage['fname'] + storage['lname'];
  const token = appointment_token();
  const appointment_id = generate(client_id, pet_id);
  console.log(token + " " + appointment_id);
  const data = [
    [appointment_id, client_id, pet_id, date, "Active", reason, token],
  ];
  connection.query(
    "insert into appointment(appointment_id,client_id,pet_id,appointment_date,status1,reason,token) values ?",
    [data],
    (err, result) => {
      if (err) console.log(err);
      else{
        res.render('confirmation.ejs',{date,token,name});
      }
    }
  );
};
const appointment_token = () => {
  const random = Math.floor(
    Math.random() * (process.env.tmax - process.env.tmin) + process.env.tmin
  );
  return random;
};
export default appointment;

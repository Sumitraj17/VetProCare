import fileOperation from "../fileStorage.js";
import express from "express";
import { connection } from "../db/database.js";

export const fetchAppointment = async(req, res) => {
  const app = express();
  app.set("view engine", "ejs");
  app.set("views", "../views");
  const storage = fileOperation.readData();
  const client_id = storage['client_id'];
  const [data,field] = await connection.promise().query('select pet_name,pet_id from pet where client_id = ?',client_id);
  console.log(data[0].pet_id);
  res.render("appointment.ejs", { data });
};


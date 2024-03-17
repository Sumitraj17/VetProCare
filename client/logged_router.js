import { Router } from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import newPet from "./controllers/pet_controller.js";
import express from "express";
import { fetchAppointment } from "./controllers/ejs_file_route.js";
import fileOperation from "./fileStorage.js";
import appointment from "./controllers/appointment_controller.js";
import status from "./controllers/status_controller.js";

const app = express();

const logrouter = Router();
const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);
logrouter.use(express.static(path.join(__dirname, "public")));
logrouter.use(express.json());
logrouter.use(express.urlencoded({ extended: true }));

logrouter.get("/appointment", fetchAppointment);
logrouter.get("/addpet", (req, res) => {
  res.sendFile(path.join(__dirname, "public/add_pet.html"));
});
logrouter.post("/petReg",newPet);
logrouter.get('/home',(req,res)=>{
  redirect(res);
})
logrouter.get('/check-status',status)

logrouter.post('/form',appointment);

const redirect = (res)=>{
  app.set('view engine','ejs')
  app.set('views','../views')
  var storage = fileOperation.readData();
  const fname = storage['fname'];
  const lname = storage['lname'];
  res.render('logged.ejs',{fname,lname});
}
export default logrouter;

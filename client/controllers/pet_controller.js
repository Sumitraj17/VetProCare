import generate from "./id_generator.js";
import fileOperation from "../fileStorage.js";
import express from "express";
import { connection } from "../db/database.js";

const newPet = (req,res)=>{
    const app = express();
    app.set("view engine", "ejs");
    app.set("views", "../views");
    const {petname,breed,type,age,gender} = req.body;
    console.log(petname, breed, type, age, gender);
    
    var storage = fileOperation.readData();

    const petid = generate(petname,breed);
    const client_id = storage['client_id'];
    console.log('pet '+petid+" client "+client_id);
   
    const data =[
        [petid,client_id,petname,type,breed,gender]
    ];
    connection.query('Insert into pet(PET_ID,CLIENT_ID,PET_NAME,SPECIES,BREED,GENDER) values ?',[data],
    (err,result)=>{
        if(err)
        {
            console.log("error "+err);
        }
        else{
            storage['pet_id']=petid;
            fileOperation.writeData(storage);
            const name = storage['fname']+" "+storage['lname'];
            res.render('acknowledgement.ejs',{petname,name});
        }
    })
    
}
export default newPet;
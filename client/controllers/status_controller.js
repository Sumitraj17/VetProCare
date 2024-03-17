import express from 'express'
import fileOperation from '../fileStorage.js';
import { connection } from '../db/database.js';

const status = async(req,res)=>{
    const storage = fileOperation.readData();
    const client_id = storage['client_id'];
    const name = storage['fname']+" "+storage['lname'];
    const app = express();
    app.set("view engine", "ejs");
    app.set("views", "../views");

    const [data,fields] = await connection.promise().query('select * from appointment_details where client_id = ?',[client_id],(err,result)=>{
        if(err)
            console.log(err);
        else{
            console.log('success');
            
        }
            
    })

    console.log(data);
    res.render('check_status.ejs',{name,data});
}
export default status;
import ejs from "ejs";
import express from "express";
import { generatedId } from "./client_controller";
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import express from 'express'
import { connection } from "./db/database";

const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);


const user = async(req,res)=>{
    const app = express();
    app.set('view engine', 'ejs');
    app.set("views", "../views");
    // const res = await connection.promise().query('Select * from ')
    res.sendFile(path.join())
}
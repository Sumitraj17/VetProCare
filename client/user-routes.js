import { Router } from "express";
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import express from 'express'
import { connection } from "./db/database";

const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);
const userRouter = Router();

userRouter.use(express.static(path.join(__dirname,'public')))
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

userRouter.get('/add-pet',(req,res)=>{

})
import { Router } from "express";
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import express from 'express'
import newClient from "./controllers/client_controller.js";
import existingUser from "./controllers/login_controller.js";

const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);
const router = Router();

router.use(express.static(path.join(__dirname,'public')))
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/login.html'));
})
router.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/signup.html'));
})

router.post('/log',existingUser)
router.post('/sign',newClient)
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.js'));
})
export default router;
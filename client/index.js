import express from 'express'
import connectToDatabase from './db/database.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import router from './login_signup.js'
import logrouter from './logged_router.js'
const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);
const app = express()
const port = process.env.port || 5000

connectToDatabase();

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})
app.use('/home',router);
app.use('/logged',logrouter);

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})
import { config } from "dotenv"
config()
const generate = (code1,code2)=>{
    const random = Math.floor(Math.random() * (process.env.max - process.env.min) + process.env.min);
    const id =  code1.substring(0, code1.length-2) + code2.substring(0, code2.length-2) + random;
    if(id.length > 4)
        return id;
    return id+random;
}
export default generate;
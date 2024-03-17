import fs, { write } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'



const fileOperation = {
    readData:()=> {
        const  __dirname = dirname(fileURLToPath(import.meta.url));
        const storagePath = path.join(__dirname,'dataFile.json');
        try {
            const data = fs.readFileSync(storagePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return {};
        }
    },
    writeData: (data) => {
        const  __dirname = dirname(fileURLToPath(import.meta.url));
        const storagePath = path.join(__dirname,'dataFile.json');
        fs.writeFileSync(storagePath, JSON.stringify(data, null, 2), 'utf8');
    }
}

export default fileOperation;
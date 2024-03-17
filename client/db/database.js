import mysql from "mysql2";
import { config } from "dotenv";

config()

const data = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
};

export const connection = mysql.createConnection(data);

const connectToDatabase = () => {
  connection.connect((err) => {
    if (err) console.log("Database Connection Failed");
    else console.log("Database connection Established");
  });
};

export default connectToDatabase;
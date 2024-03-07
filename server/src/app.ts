import express, {Request, Response} from 'express';
import {createConnection} from "mysql2";

require("dotenv").config()


const app = express();
const PORT = process.env.PORT || 3000;

const connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

})

connection.connect((error) => {
    if (error) {
        console.error("error connecting to database: ",error)
        return
    }
    console.log("connected to database")
})

connection.query("SELECT * FROM student", (error,results) =>{
    if (error) {
        console.error("error executing query: ",error)
        return
    }
    console.log("Data from students: ", results)
})

connection.end((error) => {
    if (error) {
        console.error("error closing connection: ",error)
        return
    }
    console.log("connection to database closed")
})

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});

app.get('*', (req: Request, res: Response) => {
    res.send('Yeeet');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


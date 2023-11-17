'use strict';
import userRouter from './routes/user'
import express from 'express';
import { createServer } from "http";
import db, {conectar} from './models/db'



//secreto esta en el middleware
export var jwt = require('jsonwebtoken');


const cors = require('cors');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';


/* Configuración del server  */
const app = express();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT"
}

app.use(express.json())
app.use(cors(corsOptions));


/* Endpoints para trabajar con las solicitudes */
app.get('/test', (req: any, res: any) => {
    console.log("hello world");
    res.send('V 1.1')
})


app.use('/user', userRouter)

const httpServer = createServer(app);


/* Hacemos la conexión a la base de datos y hacemos que el serve quede corriendo */
async function run() {
    try {
        // Conectar con la base de datos
        conectar()
        // Connect the client to the server
        httpServer.listen(PORT, HOST, () => {
            console.log(`Server running on port ${PORT} estas compilando cornudo?`)
        })

    } catch (error) {
        console.log(error);
    }
}


/* Corremos efectivamente el server */
run().catch(console.dir);

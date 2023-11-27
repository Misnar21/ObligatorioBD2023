'use strict';
import loginRouter from './routes/loginRouter'
import usuarioRouter from './routes/usuarioRouter'
import agendaRouter from './routes/agendaRouter'
import periodoRouter from './routes/periodoRouter'
import funcionarioRouter from './routes/funcionarioRouter'
import express from 'express';
import { createServer } from "http";
import db, { conectar } from './db'
import { encrypt } from './encripter';



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
    const plaintext = 'Hola, este es un mensaje secreto.';
    const encryptedText = encrypt(plaintext);
    console.log('Texto cifrado:', encryptedText);
    res.send('V 1.1')
})


app.use('/login', loginRouter)
app.use('/usuario', usuarioRouter)
app.use('/agenda', agendaRouter)
app.use('/periodo', periodoRouter)
app.use('/funcionario', funcionarioRouter)

const httpServer = createServer(app);


/* Hacemos la conexión a la base de datos y hacemos que el serve quede corriendo */
async function run() {
    try {
        // Conectar con la base de datos
        conectar()
        // Connect the client to the server
        httpServer.listen(PORT, HOST, () => {
            console.log(`Server running on port ${PORT}`)
        })

    } catch (error) {
        console.log(error);
    }
}


/* Corremos efectivamente el server */
run().catch(console.dir);

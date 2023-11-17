'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = exports.db = void 0;
const actividad_1 = __importDefault(require("./routes/actividad"));
const sala_1 = __importDefault(require("./routes/sala"));
const user_1 = __importDefault(require("./routes/user"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const metodos = __importStar(require("./metodos"));
const socketsModule = __importStar(require("./sockets"));
const { MongoClient } = require("mongodb");
const dbName = 'obligatorio';
const uri = "mongodb://admin:admin@localhost:27017/" + dbName + "?writeConcern=majority&minPoolSize=10&maxPoolSize=20";
exports.db = null;
const client = new MongoClient(uri);
//secreto esta en el middleware
exports.jwt = require('jsonwebtoken');
const cors = require('cors');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
/* Configuración del server  */
const app = (0, express_1.default)();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT"
};
app.use(express_1.default.json());
app.use(cors(corsOptions));
/* Endpoints para trabajar con las solicitudes */
app.get('/test', (req, res) => {
    console.log("hello world");
    res.send('V 1.1');
});
app.use('/actividades', actividad_1.default);
app.use('/salas', sala_1.default);
app.use('/user', user_1.default);
const httpServer = (0, http_1.createServer)(app);
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});
// Sockets
io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.on('join', (datos) => {
        socketsModule.join(datos, io, socket);
        console.log("Un cliente se ha unido al canal", datos.codigo);
    });
    socket.on('iniciarJuego', (mensaje) => {
        socketsModule.iniciarJuego(mensaje, io, socket);
        console.log("El admin quizo iniciar el juego");
    });
    socket.on('mostrarActividad', (mensaje) => {
        socketsModule.mostrarActividad(mensaje, io);
        console.log("El admin quizo mostrar otra actividad");
    });
    socket.on('obtenerRanking', (mensaje) => {
        socketsModule.obtenerRanking(mensaje, io, socket);
        console.log("El admin quizo obtener el ranking del juego");
    });
    // El administrador termina el juego y saca a los jugadores de la misma
    socket.on('terminarJuego', (mensaje) => {
        socketsModule.terminarJuego(mensaje, io);
        console.log("El admin quizo terminar el juego");
    });
    socket.on('salirJuego', (chanel) => {
        socketsModule.salirJuego(chanel, socket);
        console.log('Cliente salio del juego');
    });
    socket.on('disconnect', () => {
        socketsModule.desconectarse(socket);
        console.log('Cliente desconectado');
    });
});
/* Hacemos la conexión a la base de datos y hacemos que el serve quede corriendo */
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server
            exports.db = yield client.connect(uri);
            exports.db = exports.db.db(dbName);
            yield client.db().command({ ping: 1 });
            console.log("Conectado a BDD.");
            httpServer.listen(PORT, HOST, () => {
                console.log(`Server running on port ${PORT} estas compilando cornudo?`);
            });
            metodos.getRanking('654b84a362564ddf38c64eb0');
        }
        catch (error) {
            console.log(error);
        }
    });
}
/* Corremos efectivamente el server */
run().catch(console.dir);
//# sourceMappingURL=index.js.map
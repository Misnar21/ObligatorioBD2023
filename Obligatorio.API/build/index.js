'use strict';
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
exports.jwt = void 0;
const user_1 = __importDefault(require("./routes/user"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const db_1 = require("./models/db");
const encripter_1 = require("./encripter");
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
    const plaintext = 'Hola, este es un mensaje secreto.';
    const encryptedText = (0, encripter_1.encrypt)(plaintext);
    console.log('Texto cifrado:', encryptedText);
    res.send('V 1.1');
});
app.use('/user', user_1.default);
const httpServer = (0, http_1.createServer)(app);
/* Hacemos la conexión a la base de datos y hacemos que el serve quede corriendo */
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Conectar con la base de datos
            (0, db_1.conectar)();
            // Connect the client to the server
            httpServer.listen(PORT, HOST, () => {
                console.log(`Server running on port ${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
/* Corremos efectivamente el server */
run().catch(console.dir);
//# sourceMappingURL=index.js.map
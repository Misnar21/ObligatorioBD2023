"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectar = void 0;
const mysql_1 = __importDefault(require("mysql"));
const db = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bernardo',
    database: 'obligatorioBD',
});
function conectar() {
    db.connect((err) => {
        if (err) {
            console.error('Error de conexión a MySQL:', err);
        }
        else {
            console.log('Conexión exitosa a MySQL');
        }
    });
}
exports.conectar = conectar;
exports.default = db;
//# sourceMappingURL=db.js.map
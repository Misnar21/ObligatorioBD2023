"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrador = void 0;
class Administrador {
    constructor(id, contraseña) {
        // Sala del juego creado recientemente
        this.salaID = "";
        this.socketID = "";
        this.contraseña = contraseña;
        this.id = id;
    }
    login() {
        //verificar si existe el usuario en la base de datos
    }
    unirseJuego(salaID, idSocket) {
        this.salaID = salaID;
        this.socketID = idSocket;
    }
}
exports.Administrador = Administrador;
//# sourceMappingURL=administrador.js.map
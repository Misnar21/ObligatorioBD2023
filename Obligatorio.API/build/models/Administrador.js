"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrador = void 0;
class Administrador {
    constructor(id, contraseña) {
        this.token = "";
        this.contraseña = contraseña;
        this.id = id;
    }
    setToken(token) {
        this.token = token;
    }
}
exports.Administrador = Administrador;
//# sourceMappingURL=Administrador.js.map
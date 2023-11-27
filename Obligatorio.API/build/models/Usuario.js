"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(id, contraseña) {
        this.token = "";
        this.contraseña = contraseña;
        this.id = id;
    }
    setToken(token) {
        this.token = token;
    }
}
exports.Usuario = Usuario;
//# sourceMappingURL=Usuario.js.map
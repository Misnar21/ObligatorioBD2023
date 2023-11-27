"use strict";
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
exports.usuarios = exports.admins = void 0;
const express_1 = __importDefault(require("express"));
const middleware = __importStar(require("../middleware"));
const metodos = __importStar(require("../metodos"));
const Administrador_1 = require("../models/Administrador");
const Usuario_1 = require("../models/Usuario");
const router = express_1.default.Router();
exports.admins = {};
exports.usuarios = {};
// loguear usuario
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userID = "";
    let pass = "";
    try {
        userID = req.body.usuario.id;
        pass = req.body.usuario.contraseña;
    }
    catch (error) {
        // Error al pasar los datos
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error. Formato JSON invalido." }));
    }
    if (userID != "" && pass != "") {
        try {
            var token;
            var userValidation = yield metodos.login(userID, pass);
            console.log(userValidation);
            if (!userValidation.userValid) {
                console.log("No existe ese usuario");
                res.status(401).json(JSON.stringify({ mensaje: "No existe este usuario" }));
            }
            else if (!userValidation.passValid) {
                console.log("La contraseña no coincide con la del usuario");
                res.status(401);
                res.send(JSON.stringify({ mensaje: "La contraseña no coincide con la del usuario" }));
            }
            else {
                // Buscamos el rol ahora
                let rol = yield metodos.buscarRol(userID);
                console.log(rol);
                if (rol == "Administrador") {
                    exports.admins[userID] = new Administrador_1.Administrador(userID, pass);
                }
                else if (rol == "Usuario") {
                    exports.usuarios[userID] = new Usuario_1.Usuario(userID, pass);
                }
                //usuario valido, funcionario o administrador, le mando un token
                if (rol == "Admin" || rol == "Usuario") {
                    token = middleware.sign(userID);
                    res.status(200);
                    res.send(JSON.stringify({ "token": token }));
                }
                else {
                    res.status(401);
                    res.send(JSON.stringify({ "error, rol invalido": rol }));
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({ mensaje: "Error en el servidor" + error }));
        }
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map
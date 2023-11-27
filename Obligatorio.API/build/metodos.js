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
exports.buscarRol = exports.login = exports.isNullOrEmpty = void 0;
const db_1 = __importDefault(require("./models/db"));
const encripter_1 = require("./encripter");
const util = __importStar(require("util"));
function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}
exports.isNullOrEmpty = isNullOrEmpty;
/* Es necesari para poder hacer uso de una promise y forzar que quede a la espera
del await en vez de seguir hacia adelante */
const queryAsync = util.promisify(db_1.default.query).bind(db_1.default);
function login(userID, contraseña) {
    return __awaiter(this, void 0, void 0, function* () {
        var userValid = false;
        var passValid = false;
        var res = {
            "userValid": userValid,
            "passValid": passValid
        };
        if (db_1.default !== null) {
            try {
                const results = yield queryAsync(`SELECT * FROM Logins WHERE LogId='${userID}'`);
                console.log(results);
                userValid = results.length > 0;
                if (userValid) {
                    console.log("Usuario Valido");
                    res.userValid = true;
                }
                else {
                    console.log("Usuario Invalido");
                }
            }
            catch (error) {
                console.log("Error: " + error);
                return userValid;
            }
            if (userValid) {
                let passEncrypt = (0, encripter_1.encrypt)(contraseña);
                try {
                    try {
                        const results = yield queryAsync(`SELECT * FROM Logins WHERE LogId='${userID}' AND Pass='${passEncrypt}'`);
                        console.log(results);
                        passValid = results.length > 0;
                        if (passValid) {
                            console.log("Contraseña correcta");
                            res.passValid = true;
                        }
                        else {
                            console.error('La contraseña no coincide con el usuario');
                        }
                    }
                    catch (error) {
                        console.error('Error en la consulta a la base de datos', error);
                    }
                }
                catch (error) {
                    console.log("Error: " + error);
                }
            }
        }
        return res;
    });
}
exports.login = login;
function buscarRol(userID) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        let res = "";
        let ci = "";
        let idRol = "";
        if (db_1.default !== null) {
            try {
                const results = yield queryAsync(`SELECT Ci FROM Funcionarios WHERE LogId='${userID}'`);
                console.log(results);
                if (results.length > 0) {
                    console.log("Usuario encontrado");
                    ci = (_a = results[0]) === null || _a === void 0 ? void 0 : _a.Ci;
                }
                else {
                    console.log("No encontro ningun usuario que coincida");
                }
            }
            catch (error) {
                console.error('Error en la consulta a la base de datos', error);
            }
            if (ci != "") {
                try {
                    const results = yield queryAsync(`SELECT idRol FROM TenerRol WHERE CI='${ci}'`);
                    console.log(results);
                    if (results.length > 0) {
                        console.log("id rol encontrado");
                        console.log((_b = results[0]) === null || _b === void 0 ? void 0 : _b.idRol);
                        idRol = (_c = results[0]) === null || _c === void 0 ? void 0 : _c.idRol;
                    }
                    else {
                        console.log("No encontro el rol de esa cedula");
                    }
                }
                catch (error) {
                    console.error('Error en la consulta a la base de datos', error);
                }
            }
            if (ci != "" && idRol != "") {
                try {
                    const results = yield queryAsync(`SELECT Nombre FROM Roles WHERE Id='${idRol}'`);
                    console.log(results);
                    if (results.length > 0) {
                        console.log("Rol encontrado");
                        console.log((_d = results[0]) === null || _d === void 0 ? void 0 : _d.Nombre);
                        res = (_e = results[0]) === null || _e === void 0 ? void 0 : _e.Nombre;
                    }
                    else {
                        console.log("No encontro el rol de esa cedula");
                    }
                }
                catch (error) {
                    console.error('Error en la consulta a la base de datos', error);
                }
            }
        }
        return res;
    });
}
exports.buscarRol = buscarRol;
//# sourceMappingURL=metodos.js.map
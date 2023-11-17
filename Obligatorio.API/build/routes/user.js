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
exports.admins = void 0;
const express_1 = __importDefault(require("express"));
const middleware = __importStar(require("../middleware"));
const metodos = __importStar(require("../metodos"));
const administrador_1 = require("../administrador");
const __1 = require("..");
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
exports.admins = {};
//registrar usuario
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield metodos.userExist(req.body.administrador.id, req.body.administrador.contraseña)) {
            res.status(400);
            res.send(JSON.stringify({ mensaje: "Error. Usuario ya existe." }));
        }
        else {
            if (metodos.isNullOrEmpty(req.body.administrador.id) ||
                metodos.isNullOrEmpty(req.body.administrador.contraseña)) {
                res.status(400);
                res.send(JSON.stringify({ mensaje: "Error. Faltan parametros." }));
            }
            else {
                //agregar usuario a mongo. 
                try {
                    yield metodos.addOne("administradores", { 'id': req.body.administrador.id, 'contraseña': req.body.administrador.contraseña, 'propuestas': [] });
                    res.status(200);
                    res.send();
                }
                catch (error) {
                    res.status(500);
                    res.send(JSON.stringify({ mensaje: "Error al registrar usuario." }));
                }
            }
        }
    }
    catch (error) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error al registrar usuario." }));
    }
}));
//loguear usuario
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var token;
        var user = yield metodos.findOne("administradores", {
            'id': req.body.administrador.id,
            'contraseña': req.body.administrador.contraseña
        });
        if (user) {
            let newAdmin = new administrador_1.Administrador(req.body.administrador.id, req.body.administrador.contraseña);
            exports.admins[req.body.administrador.id] = newAdmin;
            //usuario es administrador, entonces le mando el token
            token = middleware.sign(user._id.toString());
            res.status(200);
            res.send(JSON.stringify({ "token": token }));
        }
        else {
            //El usuario no existe
            res.status(401);
            res.send(JSON.stringify({ mensaje: "Error. Administrador no existe." }));
        }
    }
    catch (error) {
        //hubo un error de formato
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error. Formato JSON invalido." }));
    }
}));
//todas las propuestas del usuario
router.get('/propuesta', middleware.verifyUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //devolver coleccion de propuestas
    try {
        const userId = middleware.decode(req.headers['authorization']).id;
        const user = yield metodos.findOne("administradores", { '_id': new mongodb_1.ObjectId(userId) });
        const propuestas = user.propuestas;
        res.status(200);
        res.send(propuestas);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.send(JSON.stringify({ mensaje: 'Error al obtener las propuestas del usuario' }));
    }
}));
//devuelve una propuesta
router.get('/propuesta/:propuestaid', middleware.verifyUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //devolver una propuesta
    try {
        const userId = middleware.decode(req.headers['authorization']).id;
        const propuestaid = req.params.propuestaid;
        /*
        const user = await metodos.findOne("administradores", {
          '_id': new ObjectId(userId),
          'propuesta.id': new ObjectId(propuestaid)
        });
    */
        var user = yield __1.db.collection("administradores").findOne({
            '_id': new mongodb_1.ObjectId(userId),
            'propuestas.id': new mongodb_1.ObjectId(propuestaid)
        }, { '_id': 0, 'propuestas.$': '1' });
        //REVISAR si se puede poner el id de la propuesta en el find
        const propuestadeseada = user.propuestas.find((variable) => variable.id == propuestaid);
        //var propuestadeseada = user.propuestas
        res.status(200);
        res.send(propuestadeseada);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.send(JSON.stringify({ mensaje: 'Error al obtener la propuesta del usuario' }));
    }
}));
//editar propuesta
router.put('/propuesta', middleware.verifyUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.hasOwnProperty('propuesta')) {
            res.status(400);
            res.send(JSON.stringify({ mensaje: "Error. Falta propuesta." }));
        }
        else {
            if (metodos.isNullOrEmpty(req.body.propuesta.id) ||
                metodos.isNullOrEmpty(req.body.propuesta.actividades)) {
                res.status(400);
                res.send(JSON.stringify({ mensaje: 'Error. Faltán parametros.' }));
            }
            else {
                const userId = middleware.decode(req.headers['authorization']).id;
                const filtro = { '_id': new mongodb_1.ObjectId(userId), 'propuestas.id': new mongodb_1.ObjectId(req.body.propuesta.id) };
                const dato = { $set: { 'propuestas.$.actividades': req.body.propuesta.actividades } };
                var result = yield __1.db.collection("administradores").updateOne(filtro, dato);
                //verificar si es con el updateCount?
                if (result.acknowledged) {
                    res.status(200);
                    res.send();
                }
                else {
                    res.status(500);
                    res.send(JSON.stringify({ mensaje: "Error al editar propuesta." }));
                }
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.send(JSON.stringify({ mensaje: 'Error al obtener las propuestas del usuario' }));
    }
}));
//agregar propuesta
router.post('/propuesta', middleware.verifyUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.hasOwnProperty('propuesta')) {
            res.status(400);
            res.send(JSON.stringify({ mensaje: "Error. Falta propuesta." }));
        }
        else {
            if (metodos.isNullOrEmpty(req.body.propuesta.actividades)) {
                res.status(400);
                res.send(JSON.stringify({ mensaje: 'Error. Faltán parametros.' }));
            }
            else {
                const userId = middleware.decode(req.headers['authorization']).id;
                req.body.propuesta.id = new mongodb_1.ObjectId();
                const filtro = { '_id': new mongodb_1.ObjectId(userId) };
                const dato = { $push: { 'propuestas': req.body.propuesta } };
                var result = yield __1.db.collection("administradores").updateOne(filtro, dato);
                if (result.acknowledged) {
                    res.status(200);
                    res.send();
                }
                else {
                    res.status(500);
                    res.send(JSON.stringify({ mensaje: "Error al crear propuesta." }));
                }
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.send(JSON.stringify({ mensaje: 'Error al obtener las propuestas del usuario' }));
    }
}));
//borra la propuesta
router.delete('/propuesta/:propuestaid', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = middleware.decode(req.headers['authorization']).id;
        const propuestaid = req.params.propuestaid;
        const filtro = { '_id': new mongodb_1.ObjectId(userId) };
        const dato = { $pull: { 'propuestas': { id: new mongodb_1.ObjectId(propuestaid) } } };
        var result = yield __1.db.collection("administradores").updateOne(filtro, dato);
        res.status(200);
        res.send();
    }
    catch (error) {
        console.error(error);
        res.status(500);
        res.send(JSON.stringify({ mensaje: 'Error al obtener las propuestas del usuario' }));
    }
}));
/*
//modifica las actividades en las propuestas del usuario
router.put('/propuesta', middleware.verifyUser, async (req, res, next) => {
  //en realidad se le manda todas las actividades, y se sustituye todo
  try {
    const userId = middleware.decode(req.headers['authorization']).id;
    const propuestaid = req.body.propuesta.id;
    const actividadnueva = req.body.propuesta.actividades;
    const filtro = { id: userId, 'propuesta.id': propuestaid };
    const dato = { $set: { 'propuesta.$.actividades': actividadnueva } };
    var result = await db.collection("administradores").updateOne(filtro, dato)
    res.status(200);
    res.send();
  }
  catch (error) {
    console.error(error);
    res.status(500);
    res.send(JSON.stringify({ mensaje: 'Error al borrar la actividad de la propuesta del usuario' }))
  }
})
*/
exports.default = router;
//# sourceMappingURL=user.js.map
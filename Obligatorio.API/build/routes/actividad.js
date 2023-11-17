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
const express_1 = __importDefault(require("express"));
const middleware = __importStar(require("../middleware"));
const metodos = __importStar(require("../metodos"));
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
//todas las actividades
router.get('/', middleware.verifyUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //devolver coleccion de actividades
    try {
        var actividades = yield metodos.findMany("actividades", {});
        res.status(200);
        res.send(JSON.stringify(actividades));
    }
    catch (error) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error al buscar actividades." }));
    }
}));
//una actividad
router.get('/:id', middleware.verifyUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //devolver una actividad
    try {
        var actividad = yield metodos.findOne("actividades", { "_id": new mongodb_1.ObjectId(req.params.id) });
        res.status(200);
        res.send(JSON.stringify(actividad));
    }
    catch (error) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error al buscar actividad." }));
    }
}));
//agregar actividad
router.post('/', middleware.verifyUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.hasOwnProperty('actividad')) {
            res.status(400);
            res.send(JSON.stringify({ mensaje: "Error. Falta actividad." }));
        }
        else {
            //como guardar la imagenes? en mongo? o en mongo guardo el url de la img que esta en otro lado?
            if (metodos.isNullOrEmpty(req.body.actividad.titulo) ||
                metodos.isNullOrEmpty(req.body.actividad.descripcion)) {
                res.status(400);
                res.send(JSON.stringify({ mensaje: "Error en los parametros." }));
            }
            else {
                //guardar actividad
                if (metodos.isNullOrEmpty(req.body.actividad.imagen)) {
                    req.body.actividad.imagen = null;
                }
                try {
                    yield metodos.addOne("actividades", { titulo: req.body.actividad.titulo, descripcion: req.body.actividad.descripcion, imagen: req.body.actividad.imagen });
                    res.status(200);
                    res.send();
                }
                catch (error) {
                    res.status(500);
                    res.send(JSON.stringify({ mensaje: "Error al agregar actividad." }));
                }
            }
        }
    }
    catch (error) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error al agregar actividad." }));
    }
}));
exports.default = router;
//# sourceMappingURL=actividad.js.map
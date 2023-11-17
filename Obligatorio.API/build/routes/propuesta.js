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
const metodos = __importStar(require("../metodos"));
const middleware_1 = require("../middleware");
const __1 = require("..");
const router = express_1.default.Router();
//todas las propuestas del usuario
router.get('/user/:id', middleware_1.verifyUser, (req, res, next) => {
    //devolver coleccion de propuestas
});
//una propuesta
router.get('/:id', middleware_1.verifyUser, (req, res, next) => {
    //devolver una propuesta
});
router.put('/:id/propuestas/:propuestaid', middleware_1.verifyUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //devolver una propuesta
    try {
        const userId = req.params.id;
        const propuestaid = req.params.propuestaid;
        const user = yield metodos.findOne("administradores", { id: userId });
        //const propuestadeseada = user.propuesta[propuestaid];
        const nuevasactividad = req.body.actividad;
        const filtro = { id: userId, 'propuestas.id': propuestaid };
        const dato = { $push: { 'propuestas.$.actividades': nuevasactividad } };
        var result = yield __1.db.collection("administradores").updateOne(filtro, dato);
        console.log(result);
        res.status(200);
        res.send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
    }
}));
exports.default = router;
//# sourceMappingURL=propuesta.js.map
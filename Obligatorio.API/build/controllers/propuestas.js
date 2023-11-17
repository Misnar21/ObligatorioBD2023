"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const obtenerTodasLasPropuestas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Usa Mongoose para obtener todas las propuestas de la base de datos
        const propuestas = yield Propuesta.find();
        // Envía las propuestas como respuesta al cliente
        res.status(200).json(propuestas);
    }
    catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas' });
    }
});
module.exports = {
    obtenerTodasLasPropuestas,
};
//# sourceMappingURL=propuestas.js.map
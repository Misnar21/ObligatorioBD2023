"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200);
    //res.send(JSON.parse(routerPropuestas. )
});
router.post('/crear_Propuesta', (req, res) => {
    //obtener body y insertarlo en la base de datos.
    //insertar(req.body)
    res.status(201);
    //manejar errores
});
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    /*Eliminar(id){
        en la base de datos
    }
    */
});
router.put('/', (req, res) => {
});
exports.default = router;
//# sourceMappingURL=propuestas.js.map
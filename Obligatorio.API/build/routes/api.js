"use strict";
const express = require('express');
const router = express.Router();
const FuncionarioController = require('../controllers/FuncionarioController');
const FuncionarioUCUController = require('../controllers/FuncionarioUCUController');
const CarneSaludController = require('../controllers/CarneSaludController');
const AgendaController = require('../controllers/AgendaController');
const PeriodoActualizacionController = require('../controllers/PeriodoActualizacionController');
const UsuarioController = require('../controllers/UsuarioController');
const funcionarioCtrl = new FuncionarioController();
const funcionarioUCUCtrl = new FuncionarioUCUController();
const carneSaludCtrl = new CarneSaludController();
const agendaCtrl = new AgendaController();
const periodoActualizacionCtrl = new PeriodoActualizacionController();
const usuarioCtrl = new UsuarioController();
// Configura tus rutas aquí
router.get('/funcionario/:id', funcionarioCtrl.Get);
router.post('/funcionario', funcionarioCtrl.Add);
// ... Define el resto de tus rutas
module.exports = router;
//# sourceMappingURL=api.js.map
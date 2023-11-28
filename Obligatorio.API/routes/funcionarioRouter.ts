import express from 'express'

const router = express.Router()

const FuncionarioController = require('../controllers/FuncionarioController');
const funcionarioController = new FuncionarioController();

// Configura tus rutas aquí
router.get('/getFuncionario/:id', funcionarioController.Get);
router.get('/getFuncionariosANotificar/:id', funcionarioController.GetFuncionariosANotificar);
router.post('/agendarFuncionario', funcionarioController.Agendar);


export default router
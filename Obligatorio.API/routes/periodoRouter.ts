import express from 'express'

const router = express.Router()

const PeriodoController = require('../controllers/PeriodoController');
const periodoController = new PeriodoController();

// Configura tus rutas aquí
router.get('/getPeriodoActual/:id', periodoController.GetPeriodoActual);
router.get('/getAllPeriodos', periodoController.GetAll);
router.post('/editPeriodo', periodoController.Edit);
router.post('/addPeriodo', periodoController.Add);


export default router
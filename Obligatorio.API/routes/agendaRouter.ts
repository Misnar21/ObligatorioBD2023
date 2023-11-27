import express from 'express'

const router = express.Router()

const AgendaController = require('../controllers/AgendaController');
const agendaController = new AgendaController();

// Configura tus rutas aquí
router.get('/getAgenda/:id', agendaController.Get);


export default router
import express from 'express'

const router = express.Router()

const UsuarioController = require('../controllers/UsuarioController');
const usuarioController = new UsuarioController();

// Configura tus rutas aquí
router.get('/getUsuario/:id', usuarioController.Get);
router.post('/addUsuario', usuarioController.Add);


export default router
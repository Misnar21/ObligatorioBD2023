import express from 'express'
import * as middleware from '../middleware'
import * as metodos from '../metodos'
import { Administrador } from '../models/administrador'
import { Funcionario } from '../models/funcionario'
const router = express.Router()

export var admins: { [clave: string]: Administrador } = {};
export var funcionarios: { [clave: string]: Funcionario } = {};




// loguear usuario
router.post('/login', async (req, res) => {
  try {
    let userID = req.body.administrador.id
    let pass = req.body.administrador.contraseña
    var token;
    var userValidation = await metodos.login(userID, pass)

    if (!userValidation.userValid) {
      console.log("No existe ese usuario")
      res.send(401).json(JSON.stringify({ "res": "No existe este usuario" }))
    } else if (!userValidation.passValid) {
      console.log("La contraseña no coincide con la del usuario")
      res.send(401).json(JSON.stringify({ "res": "La contraseña no coincide con la del usuario" }))
    } else {
      // Buscamos el rol ahora
      let rol = await metodos.buscarRol(userID);
   
      if (rol == "Admin") {
        admins[userID] = new Administrador(userID, pass)
      } else if (rol == "Funcionario") {
        funcionarios[userID] = new Funcionario(userID, pass)
      } 

      //usuario valido, funcionario o administrador, le mando un token
      if (rol == "Admin" || rol == "Funcionario") {
        token = middleware.sign(userID);
        res.status(200)
        res.send(JSON.stringify({ "token": token }));
      } else {
        res.status(401)
        res.send(JSON.stringify({"error": rol}));

      }

    }

  } catch (error) {
    //hubo un error de formato
    res.status(400);
    res.send(JSON.stringify({ mensaje: "Error. Formato JSON invalido." }))
  }
})

//Ejemplo de uso del milddlaware
/* router.get('/propuesta', middleware.verifyUser, async (req, res, next) => {
  //devolver coleccion de propuestas
  try {
    const userId = middleware.decode(req.headers['authorization']).id;
    res.status(200)
    res.send(propuestas);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(JSON.stringify({ mensaje: 'Error al ...' }))
  }
}) */


export default router
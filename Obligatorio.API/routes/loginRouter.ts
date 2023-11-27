import express from 'express'
import * as middleware from '../middleware'
import * as metodos from '../metodos'
import { Administrador } from '../models/Administrador'
import { Usuario } from '../models/Usuario'
const router = express.Router()

export var admins: { [clave: string]: Administrador } = {};
export var usuarios: { [clave: string]: Usuario } = {};

// loguear usuario
router.post('/login', async (req, res) => {
  let userID = ""
  let pass = ""
  try {
    userID = req.body.usuario.id
    pass = req.body.usuario.contraseña
  } catch (error) {

    // Error al pasar los datos
    res.status(400);
    res.send(JSON.stringify({ mensaje: "Error. Formato JSON invalido." }))
  }

  if (userID != "" && pass != "") {
    try {

      var token;
      var userValidation: any = await metodos.login(userID, pass)
      console.log(userValidation)

      if (!userValidation.userValid) {
        console.log("No existe ese usuario")
        res.status(401).json(JSON.stringify({ mensaje: "No existe este usuario" }))
      } else if (!userValidation.passValid) {
        console.log("La contraseña no coincide con la del usuario")
        res.status(401)
        res.send(JSON.stringify({ mensaje: "La contraseña no coincide con la del usuario" }));
      } else {

        // Buscamos el rol ahora
        let rol = await metodos.buscarRol(userID);
        console.log(rol)

        if (rol == "Administrador") {
          admins[userID] = new Administrador(userID, pass)
        } else if (rol == "Usuario") {
          usuarios[userID] = new Usuario(userID, pass)
        }

        //usuario valido, funcionario o administrador, le mando un token
        if (rol == "Admin" || rol == "Usuario") {
          token = middleware.sign(userID);
          res.status(200)
          res.send(JSON.stringify({ "token": token }));
        } else {
          res.status(401)
          res.send(JSON.stringify({ "error, rol invalido": rol}));

        }

      }

    } catch (error) {
      console.log(error)
      res.status(500);
      res.send(JSON.stringify({ mensaje: "Error en el servidor" + error }))
    }
  }

})


export default router
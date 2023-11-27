import express from 'express'
import * as middleware from '../middleware'
import * as metodos from '../metodos'
import { Administrador } from '../models/administrador'
import { Usuario } from '../models/Usuario'
const router = express.Router()

export var admins: { [clave: string]: Administrador } = {};
export var usuarios: { [clave: string]: Usuario } = {};

// loguear usuario
router.post('/', async (req, res) => {
  let id = ""
  let password = ""
  try {
    id = req.body.id
    password = req.body.password
  } catch (error) {

    // Error al pasar los datos
    res.status(400);
    res.send(JSON.stringify({ mensaje: "Error. Formato JSON invalido." }))
  }

  if (id != "" && password != "") {
    try {

      var token;
      var userValidation: any = await metodos.login(id, password)
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
        let rol = await metodos.buscarRol(id);
        console.log(rol)

        if (rol == "Administrador") {
          admins[id] = new Administrador(id, password)
        } else if (rol == "Usuario") {
          usuarios[id] = new Usuario(id, password)
        }

        //usuario valido, funcionario o administrador, le mando un token
        if (rol == "Administrador" || rol == "Usuario") {
          token = middleware.sign(id);
          res.status(200)
          res.send(JSON.stringify({ "token": token, "rol": rol}));
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
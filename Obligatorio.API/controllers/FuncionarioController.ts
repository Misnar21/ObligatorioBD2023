import { Funcionario } from "../models/Funcionario";
import { AgendaController } from "../controllers/AgendaController";
import * as mysql from 'mysql';

import db from "../db"
const multer = require('multer');

// Configuración de Multer para almacenar archivos
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, '../uploads/');
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

export class FuncionarioController {
  Get(req: any, res: any) {
    const funcionarioId = req.params.id;

    db.query('SELECT * FROM funcionarios WHERE id = ?', [funcionarioId], (err: any, results: any) => {
      if (err) {
        console.error('Error al obtener el funcionario:', err);
        res.status(500).json({ error: 'Error al obtener el funcionario.' });
      }
      res.json(results);

    });
  }

  GetFuncionariosANotificar(req: any, res: any) {
    db.query(
      'SELECT * FROM FuncionariosUCU fu WHERE NOT EXISTS ' +
      '(SELECT 1 FROM Funcionarios f WHERE f.ci = fu.ci)',
      (err: any, results: any) => {
        if (err) {
          console.error('Error al obtener los funcionarios a notificar:', err);
          return res.status(500).json({ error: 'Error al obtener los funcionarios a notificar.' });
        }

        res.json(results);
      }
    );
  }




  Agendar(req: any, res: any) // Se tiene que validar en el front haciendo un get de agenda, si hay no se puede mandar la solicitud
  {
    let agenda = req.body.data;
    //agendaController.VerificarAgenda(); TODO
    db.query(
      'INSERT INTO Agenda (Nro, Ci, Fch_Agenda) VALUES (?, ?, ?)',
      [1, agenda.ci, agenda.fechaAgenda],
      (errAgenda: any, resultsAgenda: any) => {
        if (errAgenda) {
          console.error('Error al agregar agendar:', errAgenda);
          return res.status(500).json({ error: 'Error al agregar el usuario.' });
        }
        res.status(201).json(
          {
            mensaje: 'agenda exitosa.'
          });
      });
  }


   Edit(req: any, res: any) {


    const  data  = req.body.data; // Suponiendo que los datos están en el cuerpo de la solicitud


    let tieneCarnet = data.carnetComprobante != undefined

    if (tieneCarnet) {
      upload.single("archivo")

      db.query('UPDATE Funcionarios SET Nombre=?, Apellido=?, Fch_Nacimiento=? WHERE Ci=?', [data.nombre, data.apellido, data.fechaNacimiento.split("T")[0], data.ci],
      (errUsuario: any, resultsUsuario: any) => {
          if (errUsuario) {
            console.error('Error al modificar funcionario:', errUsuario);
            return res.status(500).json({ error: 'Error al modificar datos del funcionario.' });
          } else {

            // Debo procesar el archivo
            let rutaComprobante = "../uploads/" + data.carnetComprobante.filename

            db.query( 'SELECT * FROM Carnet_Salud WHERE Ci=?', [data.ci], (error:any, result:any) => {
              if(error){
                console.error('Error al modificar funcionario:', errUsuario);
                return res.status(500).json({ error: 'Error al modificar datos del funcionario.' });
              } else {
                if(result.length > 0){
                  db.query(`UPDATE Carnet_Salud SET Fch_Emision=?, Fch_Vencimiento=?, Comprobante=? WHERE Ci=?`, [data.fechaEmisionCarnet.split("T")[0], data.fechaVencimientoCarnet.split("T")[0], rutaComprobante, data.ci],
                  (errUsuario: any, resultsUsuario: any) => {
                    if (errUsuario) {
                      console.error('Error al modificar el carnet:', errUsuario);
                      return res.status(500).json({ error: 'Error al modificar el carnet.' });
                    } else {
                      return res.status(200).json({ mensaje: 'Modificado satisfactoriamente' });
                    }
                  })
                } else {
                  db.query(`INSERT INTO Carnet_Salud VALUES (?, ?, ?, ?)`, [ data.ci, data.fechaEmisionCarnet.split("T")[0], data.fechaVencimientoCarnet.split("T")[0], rutaComprobante],
                  (errUsuario: any, resultsUsuario: any) => {
                    if (errUsuario) {
                      console.error('Error al modificar el carnet:', errUsuario);
                      return res.status(500).json({ error: 'Error al modificar el carnet.' });
                    } else {
                      return res.status(200).json({ mensaje: 'Modificado satisfactoriamente' });
                    }
                  })
                }
              }
            })

          
          }
        })
    }
  } 


  /* Edit(req: any, res: any) {
    const data: any = req.body.data;

    let tieneCarnet: boolean = data.carnetComprobante !== undefined;

    if (tieneCarnet) {
      upload.single('archivo')(req, res, (err: any) => {
        if (err) {
          console.error('Error al cargar el archivo:', err);
          return res.status(500).json({ error: 'Error al cargar el archivo.' });
        }

        const rutaComprobante: string | null = req.file ? `../uploads/${req.file.filename}` : null;

        db.query(
          'UPDATE Funcionarios SET Nombre=?, Apellido=? WHERE Ci=?',
          [data.nombre, data.apellido, data.ci],
          (errUsuario: any, resultsUsuario: any) => {
            if (errUsuario) {
              console.error('Error al modificar funcionario:', errUsuario);
              return res.status(500).json({ error: 'Error al modificar datos del funcionario.' });
            }

            db.query('SELECT * FROM Carnet_Salud WHERE Ci=?', [data.ci], (error: any, result: any) => {
              if (error) {
                console.error('Error al modificar funcionario:', error);
                return res.status(500).json({ error: 'Error al modificar datos del funcionario.' });
              }

              if (result.length > 0) {
                db.query(
                  'UPDATE Carnet_Salud SET Fch_Emision=?, Fch_Vencimiento=?, Comprobante=? WHERE Ci=?',
                  [data.fechaEmisionCarnet, data.fechaVencimientoCarnet, rutaComprobante, data.ci],
                  (errCarnet: any, resultsCarnet: any) => {
                    if (errCarnet) {
                      console.error('Error al modificar el carnet:', errCarnet);
                      return res.status(500).json({ error: 'Error al modificar el carnet.' });
                    }

                    return res.status(200).json({ mensaje: 'Modificado satisfactoriamente' });
                  }
                );
              } else {
                db.query(
                  'INSERT INTO Carnet_Salud VALUES (?, ?, ?, ?)',
                  [data.ci, data.fechaEmisionCarnet, data.fechaVencimientoCarnet, rutaComprobante],
                  (errCarnet: any, resultsCarnet: any) => {
                    if (errCarnet) {
                      console.error('Error al modificar el carnet:', errCarnet);
                      return res.status(500).json({ error: 'Error al modificar el carnet.' });
                    }

                    return res.status(200).json({ mensaje: 'Modificado satisfactoriamente' });
                  }
                );
              }
            });
          }
        );
      });
    }
  } */
}

module.exports = FuncionarioController;

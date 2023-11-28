import { Funcionario } from "../models/Funcionario";
import { AgendaController } from "../controllers/AgendaController";

const db = require('../db');

class FuncionarioController
{
    Get(req: any, res: any)
    {
      const funcionarioId = req.params.id;

      db.query('SELECT * FROM funcionarios WHERE id = ?', [funcionarioId], (err: any, results: any) =>
      {
        if (err)
        {
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
    
  
    Edit(req: any, res: any)
    {
      // const funcionarioId = req.params.id;
      // const datosActualizados: Funcionario = req.body;

      // db.query('UPDATE funcionarios SET ? WHERE id = ?', [datosActualizados, funcionarioId], (err, results) =>
      // {
      //   if (err)
      //   {
      //     console.error('Error al editar el funcionario:', err);
      //     return res.status(500).json({ error: 'Error al editar el funcionario.' });
      //   }
      //   if (results.affectedRows > 0)
      //   {
      //     res.json({ mensaje: 'Funcionario editado exitosamente.' });
      //   }
      //   else
      //   {
      //     res.status(404).json({ error: 'Funcionario no encontrado.' });
      //   }
      // });
    }
  
    Agendar(req: any, res: any) // Se tiene que validar en el front haciendo un get de agenda, si hay no se puede mandar la solicitud
    {
      const agendaController  = new AgendaController();
      let agenda = req.body.data;
      //agendaController.VerificarAgenda(); TODO
      db.query(
        'INSERT INTO Agenda (Nro, Ci, Fch_Agenda) VALUES (?, ?, ?)',
        [agenda.nro, agenda.ci, agenda.fechaAgenda],
        (errAgenda: any, resultsAgenda: any) =>
        {
          if (errAgenda)
          {
            console.error('Error al agregar agendar:', errAgenda);
            return res.status(500).json({ error: 'Error al agregar el usuario.' });
          }
          res.status(201).json(
          {
            mensaje: 'agenda exitosa.'
          });
        });
    }
  }
  
  module.exports = FuncionarioController;
  
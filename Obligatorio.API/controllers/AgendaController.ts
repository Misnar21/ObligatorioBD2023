
import db from "../db";
import { Periodo } from "../models/Periodos";
import { PeriodoController } from "../controllers/PeriodoController";

export class AgendaController
{
    // El metodo get trae una agenda por su cedula y si pertenece al periodo actual.
    Get(req: any, res: any)
    {
      const periodoController = new PeriodoController();
      const periodoActual : Periodo|null = periodoController.GetPeriodoActual();
      const cedulaAgenda = req.params.id;

      if (periodoActual == null)
      {
        console.error('Error al obtener la agenda:');
        res.status(500).json({ error: 'Error al obtener la agenda.'});
      }

      db.query('SELECT * FROM Agenda WHERE Ci = ? AND Fch_Agenda BETWEEN ? AND ?', [cedulaAgenda,periodoActual?.fechaInicio,periodoActual?.fechaFin], (err, results) =>
      {
        if (err)
        {
          console.error('Error al obtener la agenda:', err);
          res.status(500).json({ error: 'Error al obtener la agenda.' });
        } 
          res.json(results);

      });
    }
  
    Edit(req:any, res:any)
    {
      // Implementa la lógica para editar un evento de agenda
    }
  
    Delete(req: any, res: any)
    {
      // Implementa la lógica para eliminar un evento de agenda
    }
  
  }
  
  module.exports = AgendaController;
  
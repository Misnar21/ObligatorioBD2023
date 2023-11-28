import db from "../db";
import { Periodo } from "../models/Periodos";
export class PeriodoController
{
    Get(año: number, semestre: number, fechaInicio: Date)
    {
      // Implementa la lógica para obtener información de un periodo de actualización por ID
    }

    GetPeriodoActual() : Periodo | null
    {
      const fechaHoy = new Date();
      let periodoEncontrado : Periodo | null = null;
    
      db.query('SELECT * FROM periodos_actualizacion WHERE ? BETWEEN fechaInicio AND fechaFin AND YEAR(?) = anio LIMIT 1', [fechaHoy, fechaHoy], (err, results) =>
      {
        if (err)
        {
          console.error('Error al obtener el periodo actual:', err);
          return periodoEncontrado;
        }
        else
        {
          periodoEncontrado = results.length > 0 ? new Periodo(results[0].anio, results[0].semestre, results[0].fechaInicio, results[0].fechaFin) : null;
          return(periodoEncontrado);
        }
      });

      return periodoEncontrado;
    }


    GetAll(req: any, res: any)
    {
      db.query('SELECT * FROM periodos_actualizacion', (err, results) =>
      {
        if (err)
        {
          console.error('Error al obtener el periodo actual:', err);
        }
        else
        {
          res.json(results);
        }
      });
    }
  
    Add(req: any, res: any)
    {
      const { año, semestre, fechaInicio, fechaFin } = req.body.Data;
  
      db.query(
        'INSERT INTO Periodos_Actualizacion (Año, Semestre, Fch_Inicio, Fch_Fin) VALUES (?, ?, ?, ?)',
        [año, semestre, fechaInicio, fechaFin],
        (err: any, results: any) =>
        {
          if (err)
          {
            console.error('Error al agregar un nuevo periodo de actualización:', err);
            return res.status(500).json({ error: 'Error al agregar un nuevo periodo de actualización.' });
          }
  
          res.status(201).json(
          {
            mensaje: 'Nuevo periodo de actualización agregado exitosamente.',
            periodoId: results.insertId,
          });
        }
      );
    }
  
    Edit(req: any, res: any)
    {
      const { año, semestre, fechaInicio, fechaFin } = req.body.Data;
      const { añoAntiguo, semestreAntiguo, fechaInicioAntiguo } = req.params;
  
      db.query(
        'UPDATE Periodos_Actualizacion SET Año = ?, Semestre = ?, Fch_Inicio = ?, Fch_Fin = ? ' +
        'WHERE Año = ? AND Semestre = ? AND Fch_Inicio = ?',
        [año, semestre, fechaInicio, fechaFin, añoAntiguo, semestreAntiguo, fechaInicioAntiguo],
        (err: any, results: any) => {
          if (err)
          {
            console.error('Error al editar el periodo de actualización:', err);
            return res.status(500).json({ error: 'Error al editar el periodo de actualización.' });
          }
  
          res.status(200).json(
          {
            mensaje: 'Periodo de actualización editado exitosamente.',
            afectados: results.affectedRows,
          });
        }
      );
    }
  
  }
  
  module.exports = PeriodoController;
  
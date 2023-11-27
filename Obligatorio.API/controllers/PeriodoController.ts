import db from "../db";
import { Periodo } from "../models/Periodos";
export class PeriodoController
{
    Get(req: any, res: any)
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
      // Implementa la lógica para agregar un nuevo periodo de actualización
    }
  
    Edit(req: any, res: any)
    {
      // Implementa la lógica para editar un periodo de actualización
    }
  
  }
  
  module.exports = PeriodoController;
  
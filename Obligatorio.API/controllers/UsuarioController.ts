
import db from "../db";

class UsuarioController
{
    Get(req: any, res: any)
    {
      const usuarioId = req.params.id;

      db.query('SELECT * FROM Logins WHERE id = ?', [usuarioId], (err, results) =>
      {
        if (err)
        {
          console.error('Error al obtener el funcionario:', err);
          res.status(500).json({ error: 'Error al obtener el funcionario.' });
        } 
          res.json(results);

      });
    }
  
    Add(req: any, res: any) {
      const { usuario, funcionario } = req.body; // Suponiendo que los datos están en el cuerpo de la solicitud
    
      db.query(
        'INSERT INTO Logins (LogId, Pass) VALUES (?, ?)',
        [usuario.userID, usuario.password],
        (errUsuario: any, resultsUsuario: any) => {
          if (errUsuario)
          {
            console.error('Error al agregar el usuario:', errUsuario);
            return res.status(500).json({ error: 'Error al agregar el usuario.' });
          }
    
          if (resultsUsuario.affectedRows === 1 && funcionario !== null)
          {
            funcionario.userId = usuario.userID;
    
            db.query(
              'INSERT INTO Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Direccion, Telefono, Email, LogId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
              [funcionario.ci, funcionario.nombre, funcionario.apellido, funcionario.fechaNacimiento, funcionario.direccion, funcionario.telefono, funcionario.email, usuario.userID],
              (errFuncionario: any, resultsFuncionario: any) => {
                if (errFuncionario) {
                  console.error('Error al agregar el funcionario:', errFuncionario);
    
                  // Si hay un error al agregar el funcionario, también debes eliminar el usuario agregado previamente
                  db.query('DELETE FROM Logins WHERE LogId = ?', [usuario.userID], (errDeleteUsuario: any) => {
                    if (errDeleteUsuario) {
                      console.error('Error al eliminar el usuario:', errDeleteUsuario);
                    }
                    return res.status(500).json({ error: 'Error al agregar el funcionario.' });
                  });
                } else {
                  res.status(201).json(
                  {
                    mensaje: 'Usuario y funcionario agregados exitosamente.',
                  });
                }
              }
            );
          } 
          else if (resultsUsuario.affectedRows === 1 && funcionario === null) 
          {
            res.status(201).json(
            {
              mensaje: 'Usuario agregado exitosamente.',
            });
          }
        }
      );
    }
    
  
    Edit(req: any, res: any)
    {
      // Implementa la lógica para editar un usuario
    }
  }
  
  module.exports = UsuarioController;
  
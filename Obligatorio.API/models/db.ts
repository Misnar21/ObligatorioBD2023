import mysql from 'mysql';



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bernardo',
  database: 'obligatorioBD',
});

export function conectar() {

  db.connect((err: any) => {
    if (err) {
      console.error('Error de conexión a MySQL:', err);
    } else {
      console.log('Conexión exitosa a MySQL')
    }
  });
}


export default db;

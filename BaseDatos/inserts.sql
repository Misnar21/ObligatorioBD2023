USE obligatorioBD;

INSERT INTO Roles (Nombre) VALUES ('Administrador'), ('Usuario');

INSERT INTO Logins (LogId, Pass) VALUES
    ('juanperez123', '2a981f6b244aa876092076551a2b09a9'),
    ('anagomez456', 'ae0ebaef78a2fa7f94572997fbbdea13'),
    ('carlosrodriguez789', 'fff5cce8060b6a93d23923c915e84760'),
    ('marialopez111', 'c9d4f2a5c91f15bf0ab9c12d39be1a29'),
    ('pedrogarcia222', '65def8745ce49a1c70e1b821999382c2'),
    ('lauramartinez333', '5b115a69063adc6a94dfa55305c25958'),
    ('diegohernandez444', '1078acacc46c87b0fd28006a2d9e025a'),
    ('silviafernandez555', '7a8fed48a1851340a6c8af992a84b9ee'),
    ('martinpaz666', '04ead89304ddb5bb1845ee92b4eb5c32'),
    ('elenaruiz777', '0a1b6c3b106ccf97a94ffc0e4c14fe8f'),
    ('gabrielsantos888', 'df9c5a2e50980692be8340155fd9f952'),
    ('adrianalima999', 'ed904205d20df9c710541849ff4efce4'),
    ('fernandogomez000', '75bba7ff75fa292d45a902ea5ad8062e'),
    ('florencia2003', '6e80f203f7adfa0757752bd3a22f8fe5'),
    ('matias2001', '02fbef5a14ec45c0bc01913e2d8a3eba'),
    ('agustin2004','4989c358c0f8acb03921074ab03abfdb');

/*
 Para probar login
 34567891, gabrielsantos888, contra: 5467GhIR

 */
/*
 Lo que significa cada contraseña con su respectivo dueño

 INSERT INTO Logins (LogId, Pass) VALUES
    ('juanperez123', '1234AbCd'),
    ('anagomez456', '4321DcBa'),
    ('carlosrodriguez789', '5678ZxCv'),
    ('marialopez111', 'DcBa4321'),
    ('pedrogarcia222', 'ZxCv5678'),
    ('lauramartinez333', 'AbCd4321'),
    ('diegohernandez444', '4567nlKj'),
    ('silviafernandez555', 'QwEr9876'),
    ('martinpaz666', 'IuYt4689'),
    ('elenaruiz777', 'lIjY1234'),
    ('gabrielsantos888', '5467GhIR'),
    ('adrianalima999', '6591ñOpT'),
    ('fernandogomez000', 'QtBh1937'),
    ('florencia2003', 'lOfT2493'),
    ('matias2001', 'LqIP3465'),
    ('agustin2004','cLzV7134');
 */



INSERT INTO Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Direccion, Telefono, Email, LogId)
VALUES
    (12345678, 'Juan', 'Pérez', '1990-05-15', 'Calle 123, Ciudad', '091234567', 'juan.perez@email.com', 'juanperez123'),
    (98765432, 'Ana', 'Gómez', '1985-08-20', 'Avenida 456, Ciudad', '091234568', 'ana.gomez@email.com', 'anagomez456'),
    (11223344, 'Carlos', 'Rodríguez', '1982-02-10', 'Plaza 789, Ciudad', '091234569', 'carlos.rodriguez@email.com', 'carlosrodriguez789'),
    (34567890, 'María', 'López', '1988-11-25', 'Calle 456, Ciudad', '091234511', 'maria.lopez@email.com', 'marialopez111'),
    (56789012, 'Pedro', 'García', '1995-03-08', 'Avenida 789, Ciudad', '091234522', 'pedro.garcia@email.com', 'pedrogarcia222'),
    (67890123, 'Laura', 'Martínez', '1980-07-12', 'Plaza 101, Ciudad', '091234533', 'laura.martinez@email.com', 'lauramartinez333'),
    (78901234, 'Diego', 'Hernández', '1992-09-18', 'Calle 202, Ciudad', '091234544', 'diego.hernandez@email.com', 'diegohernandez444'),
    (89012345, 'Silvia', 'Fernández', '1987-04-30', 'Avenida 303, Ciudad', '091234555', 'silvia.fernandez@email.com', 'silviafernandez555'),
    (90123456, 'Martín', 'Paz', '1984-12-03', 'Plaza 404, Ciudad', '091234566', 'martin.paz@email.com', 'martinpaz666'),
    (23456789, 'Elena', 'Ruiz', '1998-06-17', 'Calle 505, Ciudad', '091234577', 'elena.ruiz@email.com', 'elenaruiz777'),
    (34567891, 'Gabriel', 'Santos', '1983-01-22', 'Avenida 606, Ciudad', '091234588', 'gabriel.santos@email.com', 'gabrielsantos888'),
    (45678901, 'Adriana', 'Lima', '1991-05-09', 'Plaza 707, Ciudad', '091234599', 'adriana.lima@email.com', 'adrianalima999'),
    (56789023, 'Fernando', 'Gómez', '1986-08-14', 'Calle 808, Ciudad', '091234500', 'fernando.gomez@email.com', 'fernandogomez000'),
    (54312493, 'Florencia', 'Correa', '2003-11-06', 'Calle 311, Ciudad', '098429863', 'maria.correaj@correo.ucu.edu.uy', 'florencia2003'),
    (53411712, 'Agustín', 'Toya', '2004-11-29', 'Avenida 123, Ciudad', '095185397', 'agustin.toya@correo.ucu.edu.uy', 'agustin2004'),
    (65793251, 'Matias', 'Anselmo', '2001-11-17', 'Plaza 982, Ciudad', '092123678', 'matias.anselmo@correo.ucu.edu.uy', 'matias2001');


INSERT INTO FuncionariosUCU(ci, nombre, apellido, fch_nacimiento, direccion, telefono, email) VALUES
    (12345678, 'Juan', 'Pérez', '1990-05-15', 'Calle 123, Ciudad', '091234567', 'juan.perez@email.com'),
    (98765432, 'Ana', 'Gómez', '1985-08-20', 'Avenida 456, Ciudad', '091234568', 'ana.gomez@email.com'),
    (11223344, 'Carlos', 'Rodríguez', '1982-02-10', 'Plaza 789, Ciudad', '091234569', 'carlos.rodriguez@email.com'),
    (34567890, 'María', 'López', '1988-11-25', 'Calle 456, Ciudad', '091234511', 'maria.lopez@email.com'),
    (56789012, 'Pedro', 'García', '1995-03-08', 'Avenida 789, Ciudad', '091234522', 'pedro.garcia@email.com'),
    (67890123, 'Laura', 'Martínez', '1980-07-12', 'Plaza 101, Ciudad', '091234533', 'laura.martinez@email.com'),
    (78901234, 'Diego', 'Hernández', '1992-09-18', 'Calle 202, Ciudad', '091234544', 'diego.hernandez@email.com'),
    (89012345, 'Silvia', 'Fernández', '1987-04-30', 'Avenida 303, Ciudad', '091234555', 'silvia.fernandez@email.com'),
    (90123456, 'Martín', 'Paz', '1984-12-03', 'Plaza 404, Ciudad', '091234566', 'martin.paz@email.com'),
    (23456789, 'Elena', 'Ruiz', '1998-06-17', 'Calle 505, Ciudad', '095185397', 'elena.ruiz@email.com'),
    (34567891, 'Gabriel', 'Santos', '1983-01-22', 'Avenida 606, Ciudad', '091234588', 'gabriel.santos@email.com'),
    (45678901, 'Adriana', 'Lima', '1991-05-09', 'Plaza 707, Ciudad', '091234599', 'adriana.lima@email.com'),
    (56789023, 'Fernando', 'Gómez', '1986-08-14', 'Calle 808, Ciudad', '091234500', 'fernando.gomez@email.com'),
    (54312493, 'Florencia', 'Correa', '2003-11-06', 'Calle 311, Ciudad', '098429863', 'maria.correaj@correo.ucu.edu.uy'),
    (53411712, 'Agustín', 'Toya', '2004-11-29', 'Avenida 123, Ciudad', '095185397', 'agustin.toya@correo.ucu.edu.uy'),
    (12345623, 'Juan', 'Pérez', '1990-01-15', 'Calle 123, Ciudad', '095185997', 'juan@email.com'),
    (78901245, 'María', 'Gómez', '1985-05-20', 'Avenida 456, Ciudad', '095185897', 'maria@email.com'),
    (34567887, 'Carlos', 'López', '1988-11-08', 'Plaza 789, Ciudad', '095765397', 'carlos@email.com'),
    (32345678, 'Ana', 'Rodriguez', '1991-03-25', 'Calle 234, Ciudad', '095565397', 'ana.rodriguez@email.com'),
    (23456119, 'Luis', 'Martinez', '1987-07-12', 'Avenida 567, Ciudad', '095185122', 'luis.martinez@email.com'),
    (34567110, 'Laura', 'Fernandez', '1993-12-05', 'Ruta 890, Ciudad', '095225397', 'laura.fernandez@email.com'),
    (65793251, 'Matias', 'Anselmo', '2001-11-17', 'Plaza 982, Ciudad', '092123678', 'matias.anselmo@correo.ucu.edu.uy');

INSERT INTO Agenda (Nro, Ci, Fch_Agenda) VALUES
    (1, 12345678, '2023-11-01'),
    (2, 98765432, '2023-11-02'),
    (3, 56789012, '2023-11-03'),
    (4, 67890123, '2023-11-03'),
    (5, 78901234, '2023-11-10'),
    (6, 89012345, '2023-11-27'),
    (7, 34567891, '2023-11-23'),
    (8, 45678901, '2023-11-23'),
    (9, 53411712, '2023-11-20');


INSERT INTO Carnet_Salud(Ci, Fch_Emision, Fch_Vencimiento, Comprobante) VALUES
    (12345678, '2021-06-01', '2023-06-01', ''),
    (98765432, '2021-07-02', '2023-07-02', ''),
    (11223344, '2022-12-01', '2024-12-01', ''),
    (34567890, '2022-08-02', '2024-08-02', ''),
    (56789012, '2021-08-01', '2023-08-01', ''),
    (67890123, '2021-09-02', '2021-09-02', ''),
    (78901234, '2021-05-03', '2023-05-03', ''),
    (89012345, '2020-03-2', '2022-03-02', ''),
    (23456789, '2022-11-01', '2024-11-01', ''),
    (34567891, '2021-04-02', '2023-04-02', ''),
    (45678901, '2021-05-03', '2023-05-03', ''),
    (56789023, '2023-05-07', '2025-05-07', ''),
    (54312493, '2023-01-03', '2025-01-03', ''),
    (65793251, '2022-10-10', '2024-10-10', '');

INSERT INTO Periodos_Actualizacion (Año, Semestre, Fch_Inicio, Fch_Fin) values
    (2023, 'Primero', '2023-01-01', '2023-01-16'),
    (2023, 'Segundo', '2023-11-01', '2023-11-17'),
    (2023, 'Segundo', '2023-11-18', '2023-11-30');

INSERT INTO TenerRol (ci, idrol) VALUES
    (12345678, 2),
    (98765432, 2),
    (11223344, 2),
    (34567890, 2),
    (56789012, 2),
    (67890123, 2),
    (78901234, 2),
    (89012345, 2),
    (23456789, 2),
    (34567891, 2),
    (45678901, 2),
    (56789023, 2),
    (54312493, 2),
    (65793251, 1);
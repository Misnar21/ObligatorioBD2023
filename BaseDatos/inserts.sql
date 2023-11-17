USE obligatorioBD;

INSERT INTO Roles (Nombre) VALUES ('Adminstraodr'), ('Usuario');


INSERT INTO Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Dirección, Teléfono, Email, LogId)
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
    (56789023, 'Fernando', 'Gómez', '1986-08-14', 'Calle 808, Ciudad', '091234500', 'fernando.gomez@email.com', 'fernandogomez000');

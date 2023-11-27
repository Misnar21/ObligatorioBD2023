/* 
Logins (LogId, Password) X 
Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Dirección, Teléfono, Email, LogId) X
Agenda (Nro, Ci, Fch_Agenda) X 
Carnet_Salud (Ci, Fch_Emision, Fch_Vencimiento, Comprobante)  X 
Periodos_Actualizacion (Año, Semestre, Fch_Inicio, Fch_Fin) 

 */

drop database if exists obligatorioBD;
CREATE DATABASE obligatorioBD;
USE obligatorioBD;

CREATE TABLE Logins(
    LogId VARCHAR(50) Primary Key,
    Pass VARCHAR(100)
);

CREATE TABLE Funcionarios(
    Ci INT Primary Key,
    Nombre VARCHAR(100) NOT NULL, 
    Apellido VARCHAR(100) NOT NULL, 
    Fch_Nacimiento DATE NOT NULL,
    Direccion VARCHAR(100) NOT NULL, 
    Telefono VARCHAR(9) NOT NULL, 
    Email VARCHAR(100) NOT NULL, 
    LogId VARCHAR(50) NOT NULL,
    FOREIGN KEY (LogId) REFERENCES Logins(LogId)
);

CREATE TABLE FuncionariosUCU(
    Ci INT Primary Key,
    Nombre VARCHAR(100) NOT NULL, 
    Apellido VARCHAR(100) NOT NULL, 
    Fch_Nacimiento DATE,
    Direccion VARCHAR(100) NOT NULL, 
    Telefono VARCHAR(9) NOT NULL, 
    Email VARCHAR(100) NOT NULL
);

CREATE TABLE Agenda (
    Nro INT NOT NULL, 
    Ci INT,
    Fch_Agenda Date NOT NULL,
    Primary key (Ci, Fch_Agenda),
    FOREIGN Key (Ci) REFERENCES Funcionarios(Ci)
);

CREATE TABLE Carnet_Salud (
    Ci INT, 
    Fch_Emision DATE,
    Fch_Vencimiento DATE NOT NULL,
    Comprobante VARCHAR(500) NOT NULL,
    Primary KEY (Ci, Fch_Emision),
    FOREIGN Key (Ci) REFERENCES Funcionarios(Ci)

);

CREATE TABLE Periodos_Actualizacion (
    Año Year, 
    Semestre ENUM('Primero', 'Segundo'),
    Fch_Inicio DATE, 
    Fch_Fin DATE NOT NULL,
    Primary kEY(Año, Semestre, Fch_Inicio)
);


CREATE TABLE Roles(
    Id INT AUTO_INCREMENT Primary Key,
    Nombre VARCHAR(100)
);

CREATE TABLE TenerRol(
    CI INT, 
    idRol INT, 
    Primary kEY(CI, idRol),
    FOREIGN Key (CI) REFERENCES Funcionarios(Ci),
    FOREIGN Key (idRol) REFERENCES Roles(Id)
);
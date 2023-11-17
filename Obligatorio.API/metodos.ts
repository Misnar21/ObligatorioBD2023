import db from "./models/db";
import { encrypt } from "./encripter";

export function isNullOrEmpty(value: any) {
    return value === null || value === undefined || value === '';
}



export async function login(userID: string, contraseña: string) {

    var userValid = false
    var passValid = false
    var res = {
        "userValid": userValid,
        "passValid": passValid
    };
    try {
        if (db !== null) {
            await db.query(`SELECT * FROM Logins WHERE LogId= ${userID}`, (err: any, results: any) => {
                if (err) {
                    console.error('El usuario no existe', err);
                } else {
                    userValid = true
                    console.log("usuario encontrado")
                }
            });
        }
    } catch (error) {
        console.log("Error: " + error);
    }

    if (userValid) {
        let passEncrypt = encrypt(contraseña)
        try {
            if (db !== null) {
                await db.query(`SELECT * FROM Logins WHERE LogId= ${userID} AND Pass= ${passEncrypt}`, (err: any, results: any) => {
                    if (err) {
                        console.error('La contraseña no coincide con el usuario', err);
                    } else {
                        passValid = true
                        console.log("contraseña correcta")
                    }
                });
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }
    return res;
}



export async function buscarRol(userID: string) {
    let res = ""
    let ci = ""
    let idRol = ""
    try {
        if (db !== null) {
            await db.query(`SELECT Ci FROM Funcionarios WHERE LogId= ${userID}`, (err: any, results: any) => {
                if (err) {
                    console.error('El usuario no existe', err);
                } else {
                    if (results.length > 0) {

                        console.log("usuario encontrado")
                        console.log(results[0]?.Ci)
                    } else {
                        console.log("No encontro nada")
                    }
                }
            });

            await db.query(`SELECT idRol FROM TenerRol WHERE CI= ${ci}`, (err: any, results: any) => {
                if (err) {
                    console.error('El usuario no tiene un rol asignado', err);
                } else {
                    if (results.length > 0) {

                        console.log("id rol encontrado")
                        console.log(results[0]?.idRol)
                    } else {
                        console.log("No encontro nada")
                    }
                }
            });

            await db.query(`SELECT Nombre FROM Rol WHERE idRol= ${idRol}`, (err: any, results: any) => {
                if (err) {
                    console.error('El idRol no es correcto', err);
                } else {
                    if (results.length > 0) {

                        console.log("Rol encontrado")
                        console.log(results[0]?.Nombre)
                    } else {
                        console.log("No encontro nada")
                    }
                }
            });
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}




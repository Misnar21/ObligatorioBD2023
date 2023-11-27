import db from "./db";
import { encrypt } from "./encripter";
import * as util from 'util';


export function isNullOrEmpty(value: any) {
    return value === null || value === undefined || value === '';
}

/* Es necesari para poder hacer uso de una promise y forzar que quede a la espera 
del await en vez de seguir hacia adelante */
const queryAsync = util.promisify(db.query).bind(db);



export async function login(userID: string, contraseña: string) {

    var userValid = false
    var passValid = false
    var res = {
        "userValid": userValid,
        "passValid": passValid
    };


    if (db !== null) {
        try {
            const results: any = await queryAsync(`SELECT * FROM Logins WHERE LogId='${userID}'`);
            console.log(results)
            userValid = results.length > 0
            if (userValid) {
                console.log("Usuario Valido")
                res.userValid = true
            } else {
                console.log("Usuario Invalido")
            }
        } catch (error) {
            console.log("Error: " + error);
            return userValid
        }

        if (userValid) {
            let passEncrypt = encrypt(contraseña)
            try {
                try {
                    const results: any = await queryAsync(`SELECT * FROM Logins WHERE LogId='${userID}' AND Pass='${passEncrypt}'`);
                    console.log(results)
                    passValid = results.length > 0;
                    if (passValid) {
                        console.log("Contraseña correcta");
                        res.passValid = true

                    } else {
                        console.error('La contraseña no coincide con el usuario');
                    }
                } catch (error) {
                    console.error('Error en la consulta a la base de datos', error);
                }
            } catch (error) {
                console.log("Error: " + error);
            }
        }
    }
    return res;
}






export async function buscarRol(userID: string) {
    let res = ""
    let ci = ""
    let idRol = ""
    if (db !== null) {
        try {
            const results: any = await queryAsync(`SELECT Ci FROM Funcionarios WHERE LogId='${userID}'`);
            console.log(results)
            if (results.length > 0) {
                console.log("Usuario encontrado")
                ci = results[0]?.Ci
            } else {
                console.log("No encontro ningun usuario que coincida")
            }

        } catch (error) {
            console.error('Error en la consulta a la base de datos', error);
        }

        if (ci != "") {
            try {
                const results: any = await queryAsync(`SELECT idRol FROM TenerRol WHERE CI='${ci}'`);
                console.log(results)
                if (results.length > 0) {
                    console.log("id rol encontrado")
                    console.log(results[0]?.idRol)
                    idRol = results[0]?.idRol
                } else {
                    console.log("No encontro el rol de esa cedula")
                }

            } catch (error) {
                console.error('Error en la consulta a la base de datos', error);
            }
        }

        if (ci != "" && idRol != "") {
            try {
                const results: any = await queryAsync(`SELECT Nombre FROM Roles WHERE Id='${idRol}'`);
                console.log(results)
                if (results.length > 0) {
                    console.log("Rol encontrado")
                    console.log(results[0]?.Nombre)
                    res = results[0]?.Nombre
                } else {
                    console.log("No encontro el rol de esa cedula")
                }

            } catch (error) {
                console.error('Error en la consulta a la base de datos', error);
            }
        }

    } 
    return res;
}




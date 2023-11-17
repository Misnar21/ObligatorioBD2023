"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.desconectarse = exports.salirJuego = exports.terminarJuego = exports.obtenerRanking = exports.join = exports.iniciarJuego = exports.mostrarActividad = exports.sockets = void 0;
const jugador_1 = require("./jugador");
const user_1 = require("./routes/user");
/* Para no dejar usuarios  en la sala si se desconectan en medio del juego,
o para eviar usuarios repetidos por una reconexión de socket debemos registrar el socketID con la sala.
Cuando se deconecta, se ve el socketID, por lo cual, lo usamos a nuestro favor, creamos un diccionario con
socketID, como clave y como valor el codigo de la sala */
var salas = {};
exports.sockets = {};
function mostrarActividad(mensaje, io) {
    if (mensaje.adminID !== undefined && mensaje.codigoSala) {
        let chanel = mensaje.codigoSala;
        // Obtenemos la sala 
        let sala = salas[mensaje.codigoSala];
        let propuesta = sala.propuesta;
        let actividadObtenida = propuesta.devolerSigueinteActividad();
        let data = {
            asunto: "actividad",
            actividad: {
                titulo: actividadObtenida === null || actividadObtenida === void 0 ? void 0 : actividadObtenida.titulo,
                descripcion: actividadObtenida === null || actividadObtenida === void 0 ? void 0 : actividadObtenida.descripcion,
                imagen: actividadObtenida === null || actividadObtenida === void 0 ? void 0 : actividadObtenida.imageLink
            }
        };
        io.to(chanel).emit(chanel, data);
        correrActividad(io, mensaje.codigoSala);
    }
    console.log('Se recibio el pedido de otra actividad:', mensaje);
}
exports.mostrarActividad = mostrarActividad;
function iniciarJuego(mensaje, io, socket) {
    if (mensaje.adminID !== undefined && mensaje.codigoSala && mensaje.codigoSala in salas) {
        let chanel = mensaje.codigoSala;
        // Obtenemos la sala 
        let sala = salas[mensaje.codigoSala];
        sala.iniciarJuego();
        let propuesta = sala.propuesta;
        let actividadObtenida = propuesta.devolerSigueinteActividad();
        let data = {
            asunto: "actividad",
            actividad: {
                titulo: actividadObtenida === null || actividadObtenida === void 0 ? void 0 : actividadObtenida.titulo,
                descripcion: actividadObtenida === null || actividadObtenida === void 0 ? void 0 : actividadObtenida.descripcion,
                imagen: actividadObtenida === null || actividadObtenida === void 0 ? void 0 : actividadObtenida.imageLink
            }
        };
        io.to(chanel).emit(chanel, data);
        correrActividad(io, mensaje.codigoSala);
    }
    console.log('Se recibio el pedido de iniciar juego:', mensaje);
}
exports.iniciarJuego = iniciarJuego;
function join(datos, io, socket) {
    if (datos.codigo in salas) {
        let channel = datos.codigo;
        let sala = salas[datos.codigo];
        if (sala.juegoIniciado) {
            io.to(socket.id).emit("errores", "El juego ya ha sido iniciado, no pueden unirse jugadores una vez ha comenzado");
        }
        if (datos.rol == "admin" && datos.token !== undefined && datos.userID !== undefined) {
            let admin = user_1.admins[datos.userID];
            admin.unirseJuego(datos.codigo, socket.id);
        }
        if (datos.rol == "player" && datos.pseudonomio !== undefined) {
            // Si la sala existe lo agregamos
            let newPlayer = new jugador_1.Jugador(sala.obtenerIDUltimoJugador(), datos.pseudonomio, socket.id);
            sala.agregarJugador(newPlayer);
            exports.sockets[socket.id] = sala.id;
        }
        socket.join(channel);
        console.log(`El cliente se unió al canal ${channel}`);
        let propuesta = salas[datos.codigo].propuesta;
        let data = {
            asunto: "esperaJuego",
            cantidadJugadores: salas[datos.codigo].getCantidadJugadores(),
            nombrePropuesta: propuesta.nombre,
            imagenPropuesta: propuesta.imagen
        };
        /* Ahora tenemos que avisar a todos los player existentes, que hay un player nuevo, mandando la data de nuevo*/
        io.to(channel).emit(channel, data);
    }
    else {
        io.to("errores").emit("errores", "No se pude encontrar la sala");
    }
}
exports.join = join;
function obtenerRanking(mensaje, io, socket) {
    if (mensaje.adminID !== undefined && mensaje.codigoSala) {
        let chanel = mensaje.codigoSala;
        // Obtenemos la sala 
        let sala = salas[mensaje.codigoSala];
        let propuesta = sala.propuesta;
        let ranking = propuesta.obtenerPodio();
        let respuesta = {
            primero: {
                actividad: ranking[0],
                puntaje: ranking[1],
            },
            segundo: {
                actividad: ranking[2],
                puntaje: ranking[3],
            },
            tercero: {
                actividad: ranking[4],
                puntaje: ranking[5],
            }
        };
        io.to(chanel).emit(chanel, respuesta);
    }
    console.log('Se pidio el ranking de un juego:', mensaje);
}
exports.obtenerRanking = obtenerRanking;
function terminarJuego(mensaje, io) {
    // Obtenemos la sala 
    if (mensaje.adminID !== undefined && mensaje.codigoSala && mensaje.codigoSala in mensaje) {
        let canal = mensaje.codigoSala;
        let sala = salas[mensaje.codigoSala];
        for (let socketJugador in sala.Jugadores) {
            let socketDelUsuario = io.sockets.sockets[socketJugador];
            // Asegúrate de que el socket del usuario existe antes de forzar la desconexión
            if (socketDelUsuario) {
                socketDelUsuario.leave(canal);
            }
            delete exports.sockets[socketJugador];
        }
        // Ahora sacamos al administrador
        let admin = user_1.admins[sala.creador];
        let socketDelAdmin = io.sockets.sockets[admin.socketID];
        // Asegúrate de que el socket del usuario existe antes de forzar la desconexión
        if (socketDelAdmin) {
            socketDelAdmin.leave(canal);
        }
        console.log(`El admin saco a todos del juego ${canal}`);
    }
}
exports.terminarJuego = terminarJuego;
function salirJuego(chanel, socket) {
    if (chanel != null && socket.id in exports.sockets) {
        let sala = salas[socket.id];
        sala.eliminarJugador(socket.id);
    }
    delete exports.sockets[socket.id];
    socket.leave(chanel);
}
exports.salirJuego = salirJuego;
function desconectarse(socket) {
    // Revisamos si estaba en la lista de sockets, por lo cual era un player
    if (socket.id in exports.sockets) {
        let idSala = exports.sockets[socket.id];
        let sala = salas[idSala];
        sala.eliminarJugador(socket.id);
        delete exports.sockets[socket.id];
    }
}
exports.desconectarse = desconectarse;
function correrActividad(io, idSala) {
    return __awaiter(this, void 0, void 0, function* () {
        let time = 30500;
        if (idSala in salas) {
            let sala = salas[idSala];
            let propuesta = sala.propuesta;
            let resultadosActividad = propuesta.obtenerResultadosActividad();
            if (resultadosActividad != undefined) {
                let data = {
                    asunto: "resultadosActividad",
                    meGusta: resultadosActividad[0],
                    noMeGusta: resultadosActividad[1],
                    meDaIgual: resultadosActividad[2]
                };
                setTimeout(() => {
                    io.to(idSala).emit(idSala, data);
                }, time);
            }
        }
    });
}
//# sourceMappingURL=sockets.js.map
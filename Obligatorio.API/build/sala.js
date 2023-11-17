"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sala = void 0;
class Sala {
    constructor(id, propuesta, link, creador) {
        this.Jugadores = {};
        this.juegoIniciado = false;
        this.propuesta = propuesta;
        this.creador = creador;
        this.id = id;
    }
    agregarJugador(jugador) {
        this.Jugadores[jugador.socketID] = jugador;
    }
    eliminarJugador(socketID) {
        delete this.Jugadores[socketID];
    }
    obtenerIDUltimoJugador() {
        const idUltimoJugador = Object.keys(this.Jugadores).length;
        return idUltimoJugador;
    }
    iniciarJuego() {
        this.juegoIniciado = true;
    }
    getCantidadJugadores() {
        return Object.keys(this.Jugadores).length;
    }
    vaciarSala() {
        this.Jugadores = {};
        this.creador = "";
    }
}
exports.Sala = Sala;
//# sourceMappingURL=sala.js.map
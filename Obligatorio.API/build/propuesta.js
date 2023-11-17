"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Propuesta = void 0;
class Propuesta {
    constructor(nombre, creatorId, id, actividades, rutaImg) {
        this.proximaActividad = 0;
        this.creatorId = creatorId;
        this.id = id;
        this.actividades = actividades;
        this.nombre = nombre;
        this.imagen = rutaImg;
    }
    devolerSigueinteActividad() {
        if (this.proximaActividad < this.actividades.length) {
            let actividad = this.actividades[this.proximaActividad];
            this.proximaActividad++;
            this.actividadActual = actividad;
            return actividad;
        }
    }
    obtenerPodio() {
        // Esto es solo una manera, pero me parece que no es la mejor en realidad
        let primero;
        let calificacionPrimero = 0;
        let segundo;
        let calificacionSegundo = 0;
        let tercero;
        let calificacionTercero = 0;
        for (let actividad of this.actividades) {
            let puntaje = actividad.calificacion;
            if (puntaje.meGusta > calificacionPrimero) {
                primero = actividad;
                calificacionPrimero = puntaje.meGusta;
            }
            else if (puntaje.meGusta > calificacionSegundo) {
                segundo = actividad;
                calificacionSegundo = puntaje.meGusta;
            }
            else if (puntaje.meGusta > calificacionTercero) {
                tercero = actividad;
                calificacionTercero = puntaje.meGusta;
            }
        }
        return [primero, calificacionPrimero, segundo, calificacionSegundo, tercero, calificacionTercero,];
    }
    obtenerResultadosActividad() {
        var _a;
        return (_a = this.actividadActual) === null || _a === void 0 ? void 0 : _a.obtenerResultados();
    }
}
exports.Propuesta = Propuesta;
//# sourceMappingURL=propuesta.js.map